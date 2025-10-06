package com.TracoCultural.TracoCultural.controller;

import com.TracoCultural.TracoCultural.model.Repository.UsuarioRepository;
import com.TracoCultural.TracoCultural.model.entity.Usuario;
import com.TracoCultural.TracoCultural.model.services.UsuarioServices;
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
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private UsuarioServices usuarioServices;

    // ========== ENDPOINTS DE AUTENTICAÇÃO ==========
    
    // LOGIN - POST /api/auth/login
    @PostMapping("/auth/login")
    public ResponseEntity<Object> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");
        
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(email);
        
        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            
            // Verificar senha
            if (usuario.getSenha().equals(password)) {
                
                // Determinar role baseado no isAdm
                String role = usuario.getIsAdm() ? "admin" : "user";
                
                return ResponseEntity.ok(Map.of(
                    "token", "fake-jwt-token-" + usuario.getId(),
                    "user", Map.of(
                        "id", usuario.getId(),
                        "name", usuario.getNome(),
                        "email", usuario.getEmail(),
                        "role", role
                    )
                ));
            }
        }
        
        return ResponseEntity.status(401).body(Map.of(
            "message", "Credenciais inválidas"
        ));
    }
    
    // REGISTER - POST /api/auth/register
    @PostMapping("/auth/register")
    public ResponseEntity<Object> register(@RequestBody Map<String, String> registerData) {
        String nome = registerData.get("name");
        String email = registerData.get("email");
        String password = registerData.get("password");
        
        // Verificar se email já existe
        if (usuarioRepository.findByEmail(email).isPresent()) {
            return ResponseEntity.status(400).body(Map.of(
                "message", "Email já cadastrado"
            ));
        }
        
        // Criar novo usuário
        Usuario novoUsuario = new Usuario();
        novoUsuario.setNome(nome);
        novoUsuario.setEmail(email);
        novoUsuario.setSenha(password);
        novoUsuario.setIsAdm(false);
        
        Usuario usuarioSalvo = usuarioRepository.save(novoUsuario);
        
        return ResponseEntity.status(201).body(Map.of(
            "token", "fake-jwt-token-" + usuarioSalvo.getId(),
            "user", Map.of(
                "id", usuarioSalvo.getId(),
                "name", usuarioSalvo.getNome(),
                "email", usuarioSalvo.getEmail(),
                "role", "user"
            )
        ));
    }
    
    // LOGOUT - POST /api/auth/logout
    @PostMapping("/auth/logout")
    public ResponseEntity<Object> logout() {
        return ResponseEntity.ok(Map.of(
            "message", "Logout realizado com sucesso"
        ));
    }
    
    // PROFILE - GET /api/users/profile
    @GetMapping("/users/profile")
    public ResponseEntity<Object> getProfile(@RequestHeader(value = "Authorization", required = false) String token) {
        if (token != null && token.startsWith("Bearer fake-jwt-token-")) {
            String userId = token.replace("Bearer fake-jwt-token-", "");
            try {
                Usuario usuario = usuarioServices.findById(Long.parseLong(userId));
                String role = usuario.getIsAdm() ? "admin" : "user";
                
                return ResponseEntity.ok(Map.of(
                    "id", usuario.getId(),
                    "name", usuario.getNome(),
                    "email", usuario.getEmail(),
                    "role", role
                ));
            } catch (Exception e) {
                return ResponseEntity.status(401).body(Map.of("message", "Token inválido"));
            }
        }
        
        return ResponseEntity.status(401).body(Map.of("message", "Token não fornecido"));
    }
    
    // UPDATE PROFILE - PUT /api/users/profile
    @PutMapping("/users/profile")
    public ResponseEntity<Object> updateProfile(@RequestHeader("Authorization") String token, @RequestBody Usuario dadosAtualizacao) {
        if (token != null && token.startsWith("Bearer fake-jwt-token-")) {
            String userId = token.replace("Bearer fake-jwt-token-", "");
            try {
                Usuario usuarioAtualizado = usuarioServices.update(Long.parseLong(userId), dadosAtualizacao);
                String role = usuarioAtualizado.getIsAdm() ? "admin" : "user";
                
                return ResponseEntity.ok(Map.of(
                    "id", usuarioAtualizado.getId(),
                    "name", usuarioAtualizado.getNome(),
                    "email", usuarioAtualizado.getEmail(),
                    "role", role
                ));
            } catch (Exception e) {
                return ResponseEntity.status(404).body(Map.of("message", "Usuário não encontrado"));
            }
        }
        
        return ResponseEntity.status(401).body(Map.of("message", "Token inválido"));
    }

    // ========== ENDPOINTS ADMIN ==========
    
    // GET /api/users (Lista todos - Admin only)
    @GetMapping("/users")
    public ResponseEntity<List<Usuario>> ListarTodos() {
        return ResponseEntity.ok(usuarioRepository.findAll());
    }

    // GET BY ID
    @GetMapping("/usuarios/{id}")
    public ResponseEntity<Object> listarProdutoPorId(@PathVariable String id) {
        try {
            return ResponseEntity.ok(usuarioServices.findById(Long.parseLong((id))));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(
                    Map.of(
                            "status", 400,
                            "retorno", "Bad Request",
                            "message", "O id informado não é valido: " + id
                    )
            );
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(
                    Map.of(
                            "status", 404,
                            "retorno", "Not Found",
                            "message", "Usuario não encontrado com o ID: " + id
                    )
            );
        }
    }

    // POST
    @PostMapping("/usuarios")
    public ResponseEntity<Usuario> SalvarUsuario(@RequestBody Usuario usuario) {
        Usuario novo = usuarioRepository.save(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(novo);
    }

    // DELETE /api/users/:id (Admin only)
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Object> DeletarUsuario(@PathVariable String id) {
        return usuarioServices.deleteById(id);
    }

    // ATUALIZAR
    @PutMapping("/usuarios/{id}")
    public ResponseEntity<Object> AtualizarUsuario(@PathVariable String id, @RequestBody Usuario usuario) {
        try{
            return ResponseEntity.ok(usuarioServices.update(Long.parseLong(id), usuario));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(
                    Map.of(
                            "status", 400,
                            "retorno", "Bad Request",
                            "message", "Caminho informado inválido"
                    ));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(
                    Map.of(
                            "status", 404,
                            "retorno", "Not Found",
                            "message", "Usuario não encontrado com o ID: " + id
                    ));
        }
    }
}