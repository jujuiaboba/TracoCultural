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

    @GetMapping("/events/{eventId}/comments")
    public ResponseEntity<Object> listarComentarios(@PathVariable Long eventId) {
        
        try {
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

    @PostMapping("/events/{eventId}/comments")
    public ResponseEntity<Object> adicionarComentario(@PathVariable Long eventId,
                                                    @RequestBody Map<String, Object> dados,
                                                    @RequestHeader(value = "Authorization", required = false) String token) {
        
        if (token == null || !token.startsWith("Bearer fake-jwt-token-")) {
            return ResponseEntity.status(401).body(Map.of("message", "Token não fornecido"));
        }
        
        String userId = token.replace("Bearer fake-jwt-token-", "");
        
        try {
            Compartilhamento novoComentario = new Compartilhamento();
            novoComentario.setIdUsuarioFk(Long.parseLong(userId));
            novoComentario.setIdEventoFk(eventId);
            
            Compartilhamento salvo = compartilhamentoRepository.save(novoComentario);
            
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
}