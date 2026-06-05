package com.proyecto.integrador.repository;

import com.proyecto.integrador.entity.ResultadoEvaluacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ResultadoEvaluacionRepository extends JpaRepository<ResultadoEvaluacion, Long> {
    List<ResultadoEvaluacion> findByEstudianteEmail(String email);
    List<ResultadoEvaluacion> findByEvaluacionId(Long evaluacionId);
}