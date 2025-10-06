package com.TracoCultural.TracoCultural.controller;

import com.TracoCultural.TracoCultural.model.Repository.UsuarioRepository;
import com.TracoCultural.TracoCultural.model.Repository.EventoRepository;
import com.TracoCultural.TracoCultural.model.Repository.FavoritoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.List;
import java.util.ArrayList;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {

    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private EventoRepository eventoRepository;
    
    @Autowired
    private FavoritoRepository favoritoRepository;

    // GET /api/dashboard/stats - Estatísticas do dashboard (Admin only)
    @GetMapping("/dashboard/stats")
    public ResponseEntity<Object> obterEstatisticas(@RequestHeader(value = "Authorization", required = false) String token) {
        
        // Verificar se é admin (simplificado)
        if (token == null || !token.startsWith("Bearer fake-jwt-token-")) {
            return ResponseEntity.status(401).body(Map.of("message", "Token não fornecido"));
        }
        
        try {
            // Contar totais
            long totalUsers = usuarioRepository.count();
            long totalEvents = eventoRepository.count();
            long totalFeedbacks = favoritoRepository.count(); // Por enquanto usando favoritos
            
            // Atividade recente (simplificada)
            List<Map<String, Object>> recentActivity = new ArrayList<>();
            recentActivity.add(Map.of(
                "type", "user_registered",
                "message", "Novo usuário cadastrado",
                "date", "2024-01-01T10:00:00Z"
            ));
            recentActivity.add(Map.of(
                "type", "event_created",
                "message", "Novo evento criado",
                "date", "2024-01-01T09:00:00Z"
            ));
            
            return ResponseEntity.ok(Map.of(
                "totalUsers", totalUsers,
                "totalEvents", totalEvents,
                "totalFeedbacks", totalFeedbacks,
                "recentActivity", recentActivity
            ));
            
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "message", "Erro ao obter estatísticas: " + e.getMessage()
            ));
        }
    }
}