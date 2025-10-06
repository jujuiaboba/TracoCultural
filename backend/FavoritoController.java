package com.TracoCultural.TracoCultural.controller;

import com.TracoCultural.TracoCultural.model.Repository.FavoritoRepository;
import com.TracoCultural.TracoCultural.model.Repository.EventoRepository;
import com.TracoCultural.TracoCultural.model.entity.Favorito;
import com.TracoCultural.TracoCultural.model.entity.Evento;
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
public class FavoritoController {

    @Autowired
    private FavoritoRepository favoritoRepository;
    
    @Autowired
    private EventoRepository eventoRepository;

    // GET /api/favorites - Listar favoritos do usuário
    @GetMapping("/favorites")
    public ResponseEntity<Object> listarFavoritos(@RequestHeader(value = "Authorization", required = false) String token) {
        
        if (token == null || !token.startsWith("Bearer fake-jwt-token-")) {
            return ResponseEntity.status(401).body(Map.of("message", "Token não fornecido"));
        }
        
        // Extrair userId do token
        String userId = token.replace("Bearer fake-jwt-token-", "");
        
        try {
            // Buscar favoritos do usuário
            List<Favorito> favoritos = favoritoRepository.findByIdUsuarioFk(Long.parseLong(userId));
            
            // Montar resposta com dados dos eventos
            List<Map<String, Object>> favoritosComEventos = new ArrayList<>();
            
            for (Favorito favorito : favoritos) {
                Optional<Evento> evento = eventoRepository.findById(favorito.getIdEventoFk());
                
                if (evento.isPresent()) {
                    Evento e = evento.get();
                    favoritosComEventos.add(Map.of(
                        "id", favorito.getId(),
                        "eventId", favorito.getIdEventoFk(),
                        "event", Map.of(
                            "id", e.getId(),
                            "title", e.getNome(),
                            "description", e.getDescricao(),
                            "date", e.getDataInicio(),
                            "location", e.getCidade() != null ? e.getCidade() : ""
                        )
                    ));
                }
            }
            
            return ResponseEntity.ok(favoritosComEventos);
            
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "message", "Erro ao buscar favoritos: " + e.getMessage()
            ));
        }
    }

    // POST /api/favorites - Adicionar aos favoritos
    @PostMapping("/favorites")
    public ResponseEntity<Object> adicionarFavorito(@RequestBody Map<String, Object> dados,
                                                  @RequestHeader(value = "Authorization", required = false) String token) {
        
        if (token == null || !token.startsWith("Bearer fake-jwt-token-")) {
            return ResponseEntity.status(401).body(Map.of("message", "Token não fornecido"));
        }
        
        String userId = token.replace("Bearer fake-jwt-token-", "");
        Long eventId = Long.valueOf(dados.get("eventId").toString());
        
        try {
            // Verificar se já existe
            boolean jaExiste = favoritoRepository.existsByIdUsuarioFkAndIdEventoFk(
                Long.parseLong(userId), eventId);
            
            if (jaExiste) {
                return ResponseEntity.status(400).body(Map.of(
                    "message", "Evento já está nos favoritos"
                ));
            }
            
            // Criar novo favorito
            Favorito novoFavorito = new Favorito();
            novoFavorito.setIdUsuarioFk(Long.parseLong(userId));
            novoFavorito.setIdEventoFk(eventId);
            
            favoritoRepository.save(novoFavorito);
            
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "message", "Evento adicionado aos favoritos"
            ));
            
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "message", "Erro ao adicionar favorito: " + e.getMessage()
            ));
        }
    }

    // DELETE /api/favorites/:eventId - Remover dos favoritos
    @DeleteMapping("/favorites/{eventId}")
    public ResponseEntity<Object> removerFavorito(@PathVariable Long eventId,
                                                @RequestHeader(value = "Authorization", required = false) String token) {
        
        if (token == null || !token.startsWith("Bearer fake-jwt-token-")) {
            return ResponseEntity.status(401).body(Map.of("message", "Token não fornecido"));
        }
        
        String userId = token.replace("Bearer fake-jwt-token-", "");
        
        try {
            // Buscar favorito
            Optional<Favorito> favorito = favoritoRepository.findByIdUsuarioFkAndIdEventoFk(
                Long.parseLong(userId), eventId);
            
            if (favorito.isPresent()) {
                favoritoRepository.delete(favorito.get());
                return ResponseEntity.ok(Map.of(
                    "message", "Evento removido dos favoritos"
                ));
            }
            
            return ResponseEntity.status(404).body(Map.of(
                "message", "Favorito não encontrado"
            ));
            
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "message", "Erro ao remover favorito: " + e.getMessage()
            ));
        }
    }
}