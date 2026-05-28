package com.proyecto.integrador.repository;

import com.proyecto.integrador.entity.Curso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CursoRepository extends JpaRepository<Curso, Long> {
    
    @Query(value = "SELECT c.* FROM cursos c JOIN cursos_estudiantes ce ON c.id = ce.curso_id WHERE ce.estudiante_id = :estudianteId", nativeQuery = true)
    List<Curso> findCursosByEstudianteId(Long estudianteId);
}
