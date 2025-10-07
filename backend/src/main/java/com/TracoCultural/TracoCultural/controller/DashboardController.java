package com.TracoCultural.TracoCultural.controller;

import com.TracoCultural.TracoCultural.model.Repository.*;
import com.TracoCultural.TracoCultural.model.entity.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

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
    
    @Autowired
    private CompartilhamentoRepository compartilhamentoRepository;

    @GetMapping("/admin/dashboard")
    public ResponseEntity<Object> obterDashboard(@RequestHeader(value = "Authorization", required = false) String token) {
        
        if (token == null || !token.startsWith("Bearer fake-jwt-token-")) {
            return ResponseEntity.status(401).body(Map.of("message", "Token não fornecido"));
        }
        
        String userId = token.replace("Bearer fake-jwt-token-", "");
        Optional<Usuario> usuario = usuarioRepository.findById(Long.parseLong(userId));
        
        if (usuario.isEmpty() || !usuario.get().getIsAdm()) {
            return ResponseEntity.status(403).body(Map.of("message", "Acesso negado"));
        }
        
        long totalUsuarios = usuarioRepository.count();
        long totalEventos = eventoRepository.count();
        long totalFavoritos = favoritoRepository.count();
        long totalCompartilhamentos = compartilhamentoRepository.count();
        
        return ResponseEntity.ok(Map.of(
            "stats", Map.of(
                "totalUsers", totalUsuarios,
                "totalEvents", totalEventos,
                "totalFavorites", totalFavoritos,
                "totalShares", totalCompartilhamentos
            ),
            "recentActivity", Arrays.asList(
                Map.of(
                    "id", 1,
                    "type", "user_registered",
                    "description", "Novo usuário cadastrado",
                    "timestamp", "2024-01-01T10:00:00Z"
                ),
                Map.of(
                    "id", 2,
                    "type", "event_created",
                    "description", "Novo evento criado",
                    "timestamp", "2024-01-01T09:30:00Z"
                )
            )
        ));
    }

    @GetMapping("/admin/users")
    public ResponseEntity<Object> listarUsuarios(@RequestHeader(value = "Authorization", required = false) String token) {
        
        if (token == null || !token.startsWith("Bearer fake-jwt-token-")) {
            return ResponseEntity.status(401).body(Map.of("message", "Token não fornecido"));
        }
        
        String userId = token.replace("Bearer fake-jwt-token-", "");
        Optional<Usuario> usuario = usuarioRepository.findById(Long.parseLong(userId));
        
        if (usuario.isEmpty() || !usuario.get().getIsAdm()) {
            return ResponseEntity.status(403).body(Map.of("message", "Acesso negado"));
        }
        
        List<Usuario> usuarios = usuarioRepository.findAll();
        List<Map<String, Object>> usuariosFormatados = new ArrayList<>();
        
        for (Usuario u : usuarios) {
            usuariosFormatados.add(Map.of(
                "id", u.getId(),
                "name", u.getNome(),
                "email", u.getEmail(),
                "isAdmin", u.getIsAdm(),
                "createdAt", "2024-01-01T10:00:00Z"
            ));
        }
        
        return ResponseEntity.ok(usuariosFormatados);
    }

    @DeleteMapping("/admin/users/{id}")
    public ResponseEntity<Object> deletarUsuario(@PathVariable Long id,
                                               @RequestHeader(value = "Authorization", required = false) String token) {
        
        if (token == null || !token.startsWith("Bearer fake-jwt-token-")) {
            return ResponseEntity.status(401).body(Map.of("message", "Token não fornecido"));
        }
        
        String userId = token.replace("Bearer fake-jwt-token-", "");
        Optional<Usuario> usuario = usuarioRepository.findById(Long.parseLong(userId));
        
        if (usuario.isEmpty() || !usuario.get().getIsAdm()) {
            return ResponseEntity.status(403).body(Map.of("message", "Acesso negado"));
        }
        
        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
            return ResponseEntity.ok(Map.of("message", "Usuário deletado com sucesso"));
        }
        
        return ResponseEntity.status(404).body(Map.of("message", "Usuário não encontrado"));
    }
}