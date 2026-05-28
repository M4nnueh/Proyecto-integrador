package com.proyecto.integrador.repository;

import com.proyecto.integrador.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);

    @Query("SELECT u.rol, COUNT(u) FROM Usuario u GROUP BY u.rol")
    List<Object[]> countByRol();

    List<Usuario> findTop5ByOrderByFechaCreacionDesc();
}
