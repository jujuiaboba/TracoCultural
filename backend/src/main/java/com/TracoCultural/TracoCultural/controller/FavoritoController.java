package com.TracoCultural.TracoCultural.controller;

import com.TracoCultural.TracoCultural.model.Repository.*;
import com.TracoCultural.TracoCultural.model.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class FavoritoController {

    @Autowired
    private FavoritoRepository favoritoRepository;
    
    @Autowired
    private EventoRepository eventoRepository;

    @GetMapping("/favorites")
    public ResponseEntity<List<Map<String, Object>>> listarFavoritos(@RequestHeader(value = "Authorization", required = false) String token) {
        
        if (token == null || !token.startsWith("Bearer fake-jwt-token-")) {
            return ResponseEntity.status(401).body(null);
        }
        
        String userId = token.replace("Bearer fake-jwt-token-", "");
        
        List<Favorito> favoritos = favoritoRepository.findAll().stream()
            .filter(f -> f.getIdUsuarioFk().equals(Long.parseLong(userId)))
            .toList();
        
        List<Map<String, Object>> eventosFavoritos = new ArrayList<>();
        
        for (Favorito favorito : favoritos) {
            Optional<Evento> evento = eventoRepository.findById(favorito.getIdEventoFk());
            
            if (evento.isPresent()) {
                Evento e = evento.get();
                eventosFavoritos.add(Map.of(
                    "id", e.getId(),
                    "title", e.getTitulo(),
                    "description", e.getDescricao(),
                    "date", e.getDataEvento().toString(),
                    "location", e.getLocalizacao(),
                    "image", e.getImagem() != null ? e.getImagem() : "/api/placeholder/400/300",
                    "category", "Cultura",
                    "isFavorite", true
                ));
            }
        }
        
        return ResponseEntity.ok(eventosFavoritos);
    }

    @PostMapping("/favorites/{eventId}")
    public ResponseEntity<Object> adicionarFavorito(@PathVariable Long eventId,
                                                  @RequestHeader(value = "Authorization", required = false) String token) {
        
        if (token == null || !token.startsWith("Bearer fake-jwt-token-")) {
            return ResponseEntity.status(401).body(Map.of("message", "Token não fornecido"));
        }
        
        String userId = token.replace("Bearer fake-jwt-token-", "");
        
        Favorito existente = favoritoRepository.findByIdUsuarioFkAndIdEventoFk(Long.parseLong(userId), eventId);
        
        if (existente != null) {
            return ResponseEntity.status(400).body(Map.of("message", "Evento já está nos favoritos"));
        }
        
        Favorito novoFavorito = new Favorito();
        novoFavorito.setIdUsuarioFk(Long.parseLong(userId));
        novoFavorito.setIdEventoFk(eventId);
        
        favoritoRepository.save(novoFavorito);
        
        return ResponseEntity.ok(Map.of("message", "Evento adicionado aos favoritos"));
    }

    @DeleteMapping("/favorites/{eventId}")
    public ResponseEntity<Object> removerFavorito(@PathVariable Long eventId,
                                                @RequestHeader(value = "Authorization", required = false) String token) {
        
        if (token == null || !token.startsWith("Bearer fake-jwt-token-")) {
            return ResponseEntity.status(401).body(Map.of("message", "Token não fornecido"));
        }
        
        String userId = token.replace("Bearer fake-jwt-token-", "");
        
        Favorito favorito = favoritoRepository.findByIdUsuarioFkAndIdEventoFk(Long.parseLong(userId), eventId);
        
        if (favorito != null) {
            favoritoRepository.delete(favorito);
            return ResponseEntity.ok(Map.of("message", "Evento removido dos favoritos"));
        }
        
        return ResponseEntity.status(404).body(Map.of("message", "Favorito não encontrado"));
    }
}