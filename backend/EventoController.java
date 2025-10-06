package com.TracoCultural.TracoCultural.controller;

import com.TracoCultural.TracoCultural.model.Repository.EventoRepository;
import com.TracoCultural.TracoCultural.model.entity.Evento;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class EventoController {

    @Autowired
    private EventoRepository eventoRepository;

    // GET /api/events - Listar todos os eventos (público)
    @GetMapping("/events")
    public ResponseEntity<List<Evento>> listarEventos() {
        return ResponseEntity.ok(eventoRepository.findAll());
    }

    // GET /api/events/:id - Detalhes do evento (público)
    @GetMapping("/events/{id}")
    public ResponseEntity<Object> obterEvento(@PathVariable Long id) {
        Optional<Evento> evento = eventoRepository.findById(id);
        
        if (evento.isPresent()) {
            return ResponseEntity.ok(evento.get());
        }
        
        return ResponseEntity.status(404).body(Map.of(
            "message", "Evento não encontrado"
        ));
    }

    // POST /api/events - Criar evento (Admin only)
    @PostMapping("/events")
    public ResponseEntity<Object> criarEvento(@RequestBody Evento evento, 
                                            @RequestHeader(value = "Authorization", required = false) String token) {
        
        // Verificar se é admin (simplificado por enquanto)
        if (token == null || !token.startsWith("Bearer fake-jwt-token-")) {
            return ResponseEntity.status(401).body(Map.of("message", "Token não fornecido"));
        }
        
        try {
            Evento novoEvento = eventoRepository.save(evento);
            return ResponseEntity.status(HttpStatus.CREATED).body(novoEvento);
        } catch (Exception e) {
            return ResponseEntity.status(400).body(Map.of(
                "message", "Erro ao criar evento: " + e.getMessage()
            ));
        }
    }

    // PUT /api/events/:id - Atualizar evento (Admin only)
    @PutMapping("/events/{id}")
    public ResponseEntity<Object> atualizarEvento(@PathVariable Long id, 
                                                @RequestBody Evento eventoAtualizado,
                                                @RequestHeader(value = "Authorization", required = false) String token) {
        
        if (token == null || !token.startsWith("Bearer fake-jwt-token-")) {
            return ResponseEntity.status(401).body(Map.of("message", "Token não fornecido"));
        }
        
        Optional<Evento> eventoExistente = eventoRepository.findById(id);
        
        if (eventoExistente.isPresent()) {
            Evento evento = eventoExistente.get();
            evento.setNome(eventoAtualizado.getNome());
            evento.setDescricao(eventoAtualizado.getDescricao());
            evento.setDataInicio(eventoAtualizado.getDataInicio());
            evento.setDataFim(eventoAtualizado.getDataFim());
            evento.setCidade(eventoAtualizado.getCidade());
            eventoRepository.save(evento);
            return ResponseEntity.ok(evento);
        }
        
        return ResponseEntity.status(404).body(Map.of(
            "message", "Evento não encontrado"
        ));
    }

    // DELETE /api/events/:id - Deletar evento (Admin only)
    @DeleteMapping("/events/{id}")
    public ResponseEntity<Object> deletarEvento(@PathVariable Long id,
                                              @RequestHeader(value = "Authorization", required = false) String token) {
        
        if (token == null || !token.startsWith("Bearer fake-jwt-token-")) {
            return ResponseEntity.status(401).body(Map.of("message", "Token não fornecido"));
        }
        
        if (eventoRepository.existsById(id)) {
            eventoRepository.deleteById(id);
            return ResponseEntity.ok(Map.of(
                "message", "Evento deletado com sucesso"
            ));
        }
        
        return ResponseEntity.status(404).body(Map.of(
            "message", "Evento não encontrado"
        ));
    }
}