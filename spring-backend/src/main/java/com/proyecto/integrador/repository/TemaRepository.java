package com.proyecto.integrador.repository;

import com.proyecto.integrador.entity.Tema;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TemaRepository extends JpaRepository<Tema, Long> {
}
