package com.TracoCultural.TracoCultural.controller;

import com.TracoCultural.TracoCultural.model.Repository.*;
import com.TracoCultural.TracoCultural.model.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class EventoController {

    @Autowired
    private EventoRepository eventoRepository;
    
    @Autowired
    private FavoritoRepository favoritoRepository;
    
    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping("/events")
    public ResponseEntity<List<Map<String, Object>>> listarEventos(@RequestHeader(value = "Authorization", required = false) String token) {
        List<Evento> eventos = eventoRepository.findAll();
        List<Map<String, Object>> eventosFormatados = new ArrayList<>();
        
        Long userId = null;
        if (token != null && token.startsWith("Bearer fake-jwt-token-")) {
            userId = Long.parseLong(token.replace("Bearer fake-jwt-token-", ""));
        }
        
        for (Evento evento : eventos) {
            boolean isFavorite = false;
            if (userId != null) {
                Favorito favorito = favoritoRepository.findByIdUsuarioFkAndIdEventoFk(userId, evento.getId());
                isFavorite = favorito != null;
            }
            
            eventosFormatados.add(Map.of(
                "id", evento.getId(),
                "title", evento.getTitulo(),
                "description", evento.getDescricao(),
                "date", evento.getDataEvento().toString(),
                "location", evento.getLocalizacao(),
                "image", evento.getImagem() != null ? evento.getImagem() : "/api/placeholder/400/300",
                "category", "Cultura",
                "isFavorite", isFavorite
            ));
        }
        
        return ResponseEntity.ok(eventosFormatados);
    }

    @GetMapping("/events/{id}")
    public ResponseEntity<Object> obterEvento(@PathVariable Long id) {
        Optional<Evento> evento = eventoRepository.findById(id);
        
        if (evento.isPresent()) {
            Evento e = evento.get();
            return ResponseEntity.ok(Map.of(
                "id", e.getId(),
                "title", e.getTitulo(),
                "description", e.getDescricao(),
                "date", e.getDataEvento().toString(),
                "location", e.getLocalizacao(),
                "image", e.getImagem() != null ? e.getImagem() : "/api/placeholder/400/300",
                "category", "Cultura"
            ));
        }
        
        return ResponseEntity.status(404).body(Map.of("message", "Evento não encontrado"));
    }

    @PostMapping("/events")
    public ResponseEntity<Object> criarEvento(@RequestBody Map<String, Object> dados,
                                            @RequestHeader(value = "Authorization", required = false) String token) {
        
        if (token == null || !token.startsWith("Bearer fake-jwt-token-")) {
            return ResponseEntity.status(401).body(Map.of("message", "Token não fornecido"));
        }
        
        String userId = token.replace("Bearer fake-jwt-token-", "");
        Optional<Usuario> usuario = usuarioRepository.findById(Long.parseLong(userId));
        
        if (usuario.isEmpty() || !usuario.get().getIsAdm()) {
            return ResponseEntity.status(403).body(Map.of("message", "Acesso negado"));
        }
        
        Evento novoEvento = new Evento();
        novoEvento.setTitulo((String) dados.get("title"));
        novoEvento.setDescricao((String) dados.get("description"));
        novoEvento.setDataEvento(LocalDateTime.parse((String) dados.get("date")));
        novoEvento.setLocalizacao((String) dados.get("location"));
        novoEvento.setImagem((String) dados.get("image"));
        
        Evento salvo = eventoRepository.save(novoEvento);
        
        return ResponseEntity.ok(Map.of(
            "id", salvo.getId(),
            "title", salvo.getTitulo(),
            "description", salvo.getDescricao(),
            "date", salvo.getDataEvento().toString(),
            "location", salvo.getLocalizacao(),
            "image", salvo.getImagem(),
            "category", "Cultura"
        ));
    }

    @PutMapping("/events/{id}")
    public ResponseEntity<Object> atualizarEvento(@PathVariable Long id,
                                                @RequestBody Map<String, Object> dados,
                                                @RequestHeader(value = "Authorization", required = false) String token) {
        
        if (token == null || !token.startsWith("Bearer fake-jwt-token-")) {
            return ResponseEntity.status(401).body(Map.of("message", "Token não fornecido"));
        }
        
        String userId = token.replace("Bearer fake-jwt-token-", "");
        Optional<Usuario> usuario = usuarioRepository.findById(Long.parseLong(userId));
        
        if (usuario.isEmpty() || !usuario.get().getIsAdm()) {
            return ResponseEntity.status(403).body(Map.of("message", "Acesso negado"));
        }
        
        Optional<Evento> eventoOpt = eventoRepository.findById(id);
        
        if (eventoOpt.isPresent()) {
            Evento evento = eventoOpt.get();
            evento.setTitulo((String) dados.get("title"));
            evento.setDescricao((String) dados.get("description"));
            evento.setDataEvento(LocalDateTime.parse((String) dados.get("date")));
            evento.setLocalizacao((String) dados.get("location"));
            evento.setImagem((String) dados.get("image"));
            
            Evento salvo = eventoRepository.save(evento);
            
            return ResponseEntity.ok(Map.of(
                "id", salvo.getId(),
                "title", salvo.getTitulo(),
                "description", salvo.getDescricao(),
                "date", salvo.getDataEvento().toString(),
                "location", salvo.getLocalizacao(),
                "image", salvo.getImagem(),
                "category", "Cultura"
            ));
        }
        
        return ResponseEntity.status(404).body(Map.of("message", "Evento não encontrado"));
    }

    @DeleteMapping("/events/{id}")
    public ResponseEntity<Object> deletarEvento(@PathVariable Long id,
                                              @RequestHeader(value = "Authorization", required = false) String token) {
        
        if (token == null || !token.startsWith("Bearer fake-jwt-token-")) {
            return ResponseEntity.status(401).body(Map.of("message", "Token não fornecido"));
        }
        
        String userId = token.replace("Bearer fake-jwt-token-", "");
        Optional<Usuario> usuario = usuarioRepository.findById(Long.parseLong(userId));
        
        if (usuario.isEmpty() || !usuario.get().getIsAdm()) {
            return ResponseEntity.status(403).body(Map.of("message", "Acesso negado"));
        }
        
        if (eventoRepository.existsById(id)) {
            eventoRepository.deleteById(id);
            return ResponseEntity.ok(Map.of("message", "Evento deletado com sucesso"));
        }
        
        return ResponseEntity.status(404).body(Map.of("message", "Evento não encontrado"));
    }
}