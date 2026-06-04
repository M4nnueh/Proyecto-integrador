package com.proyecto.integrador.repository;

import com.proyecto.integrador.entity.PruebaGeneral;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PruebaGeneralRepository extends JpaRepository<PruebaGeneral, Long> {
}