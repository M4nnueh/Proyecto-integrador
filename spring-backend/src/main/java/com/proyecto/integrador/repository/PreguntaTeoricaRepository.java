package com.proyecto.integrador.repository;

import com.proyecto.integrador.entity.PreguntaTeorica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PreguntaTeoricaRepository extends JpaRepository<PreguntaTeorica, Long> {
}