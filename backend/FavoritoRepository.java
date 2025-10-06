package com.TracoCultural.TracoCultural.model.Repository;

import com.TracoCultural.TracoCultural.model.entity.Favorito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoritoRepository extends JpaRepository<Favorito, Long> {
    
    // Buscar favoritos por usuário
    List<Favorito> findByIdUsuarioFk(Long idUsuarioFk);
    
    // Buscar favorito específico por usuário e evento
    Optional<Favorito> findByIdUsuarioFkAndIdEventoFk(Long idUsuarioFk, Long idEventoFk);
    
    // Verificar se existe favorito
    boolean existsByIdUsuarioFkAndIdEventoFk(Long idUsuarioFk, Long idEventoFk);
}