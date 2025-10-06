package com.TracoCultural.TracoCultural.model.Repository;

import com.TracoCultural.TracoCultural.model.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    // MÉTODO PARA BUSCAR POR EMAIL (NECESSÁRIO PARA LOGIN)
    Optional<Usuario> findByEmail(String email);
}