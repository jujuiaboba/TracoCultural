package com.TracoCultural.TracoCultural.controller;

import com.TracoCultural.TracoCultural.model.Repository.UsuarioRepository;
import com.TracoCultural.TracoCultural.model.entity.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody Map<String, String> dados) {
        String email = dados.get("email");
        String senha = dados.get("password");
        
        Usuario usuario = usuarioRepository.findByEmail(email);
        
        if (usuario != null && usuario.getSenha().equals(senha)) {
            return ResponseEntity.ok(Map.of(
                "token", "fake-jwt-token-" + usuario.getId(),
                "user", Map.of(
                    "id", usuario.getId(),
                    "name", usuario.getNome(),
                    "email", usuario.getEmail(),
                    "isAdmin", usuario.getIsAdm()
                )
            ));
        }
        
        return ResponseEntity.status(401).body(Map.of("message", "Credenciais inválidas"));
    }

    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody Map<String, String> dados) {
        String nome = dados.get("name");
        String email = dados.get("email");
        String senha = dados.get("password");
        
        if (usuarioRepository.findByEmail(email) != null) {
            return ResponseEntity.status(400).body(Map.of("message", "Email já cadastrado"));
        }
        
        Usuario novoUsuario = new Usuario();
        novoUsuario.setNome(nome);
        novoUsuario.setEmail(email);
        novoUsuario.setSenha(senha);
        novoUsuario.setIsAdm(false);
        
        Usuario salvo = usuarioRepository.save(novoUsuario);
        
        return ResponseEntity.ok(Map.of(
            "token", "fake-jwt-token-" + salvo.getId(),
            "user", Map.of(
                "id", salvo.getId(),
                "name", salvo.getNome(),
                "email", salvo.getEmail(),
                "isAdmin", salvo.getIsAdm()
            )
        ));
    }
}