package com.TracoCultural.TracoCultural.controller;

import com.TracoCultural.TracoCultural.model.Repository.CompartilhamentoRepository;
import com.TracoCultural.TracoCultural.model.Repository.UsuarioRepository;
import com.TracoCultural.TracoCultural.model.entity.Compartilhamento;
import com.TracoCultural.TracoCultural.model.entity.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.ArrayList;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class ComentarioController {

    @Autowired
    private CompartilhamentoRepository compartilhamentoRepository;
    
    @Autowired
    private UsuarioRepository usuarioRepository;

    // GET /api/events/:id/comments - Listar comentários do evento
    @GetMapping("/events/{eventId}/comments")
    public ResponseEntity<Object> listarComentarios(@PathVariable Long eventId) {
        
        try {
            // Por enquanto, vamos usar Compartilhamento como comentários
            List<Compartilhamento> compartilhamentos = compartilhamentoRepository.findAll().stream()
                .filter(c -> c.getIdEventoFk().equals(eventId))
                .toList();
            
            List<Map<String, Object>> comentarios = new ArrayList<>();
            
            for (Compartilhamento comp : compartilhamentos) {
                Optional<Usuario> usuario = usuarioRepository.findById(comp.getIdUsuarioFk());
                
                if (usuario.isPresent()) {
                    Usuario u = usuario.get();
                    comentarios.add(Map.of(
                        "id", comp.getId(),
                        "userId", comp.getIdUsuarioFk(),
                        "user", Map.of(
                            "name", u.getNome()
                        ),
                        "comment", "Comentário do usuário " + u.getNome(),
                        "rating", 5,
                        "date", "2024-01-01T10:00:00Z"
                    ));
                }
            }
            
            return ResponseEntity.ok(comentarios);
            
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "message", "Erro ao buscar comentários: " + e.getMessage()
            ));
        }
    }

    // POST /api/events/:id/comments - Adicionar comentário
    @PostMapping("/events/{eventId}/comments")
    public ResponseEntity<Object> adicionarComentario(@PathVariable Long eventId,
                                                    @RequestBody Map<String, Object> dados,
                                                    @RequestHeader(value = "Authorization", required = false) String token) {
        
        if (token == null || !token.startsWith("Bearer fake-jwt-token-")) {
            return ResponseEntity.status(401).body(Map.of("message", "Token não fornecido"));
        }
        
        String userId = token.replace("Bearer fake-jwt-token-", "");
        
        try {
            // Criar novo compartilhamento (usando como comentário)
            Compartilhamento novoComentario = new Compartilhamento();
            novoComentario.setIdUsuarioFk(Long.parseLong(userId));
            novoComentario.setIdEventoFk(eventId);
            
            Compartilhamento salvo = compartilhamentoRepository.save(novoComentario);
            
            // Buscar dados do usuário
            Optional<Usuario> usuario = usuarioRepository.findById(Long.parseLong(userId));
            
            if (usuario.isPresent()) {
                Usuario u = usuario.get();
                return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                    "id", salvo.getId(),
                    "userId", salvo.getIdUsuarioFk(),
                    "user", Map.of(
                        "name", u.getNome()
                    ),
                    "comment", dados.get("comment"),
                    "rating", dados.get("rating"),
                    "date", "2024-01-01T10:00:00Z"
                ));
            }
            
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "message", "Comentário adicionado com sucesso"
            ));
            
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "message", "Erro ao adicionar comentário: " + e.getMessage()
            ));
        }
    }

    // GET /api/feedbacks - Listar todos os feedbacks (Admin only)
    @GetMapping("/feedbacks")
    public ResponseEntity<Object> listarTodosFeedbacks(@RequestHeader(value = "Authorization", required = false) String token) {
        
        if (token == null || !token.startsWith("Bearer fake-jwt-token-")) {
            return ResponseEntity.status(401).body(Map.of("message", "Token não fornecido"));
        }
        
        try {
            List<Compartilhamento> todos = compartilhamentoRepository.findAll();
            
            List<Map<String, Object>> feedbacks = new ArrayList<>();
            
            for (Compartilhamento comp : todos) {
                Optional<Usuario> usuario = usuarioRepository.findById(comp.getIdUsuarioFk());
                
                if (usuario.isPresent()) {
                    Usuario u = usuario.get();
                    feedbacks.add(Map.of(
                        "id", comp.getId(),
                        "userId", comp.getIdUsuarioFk(),
                        "eventId", comp.getIdEventoFk(),
                        "user", Map.of(
                            "name", u.getNome()
                        ),
                        "comment", "Feedback do usuário " + u.getNome(),
                        "rating", 5,
                        "date", "2024-01-01T10:00:00Z"
                    ));
                }
            }
            
            return ResponseEntity.ok(feedbacks);
            
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "message", "Erro ao buscar feedbacks: " + e.getMessage()
            ));
        }
    }

    // DELETE /api/feedbacks/:id - Deletar feedback (Admin only)
    @DeleteMapping("/feedbacks/{id}")
    public ResponseEntity<Object> deletarFeedback(@PathVariable Long id,
                                                @RequestHeader(value = "Authorization", required = false) String token) {
        
        if (token == null || !token.startsWith("Bearer fake-jwt-token-")) {
            return ResponseEntity.status(401).body(Map.of("message", "Token não fornecido"));
        }
        
        try {
            if (compartilhamentoRepository.existsById(id)) {
                compartilhamentoRepository.deleteById(id);
                return ResponseEntity.ok(Map.of(
                    "message", "Feedback deletado com sucesso"
                ));
            }
            
            return ResponseEntity.status(404).body(Map.of(
                "message", "Feedback não encontrado"
            ));
            
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "message", "Erro ao deletar feedback: " + e.getMessage()
            ));
        }
    }
}