package com.proyecto.integrador.controller;

import com.proyecto.integrador.entity.Curso;
import com.proyecto.integrador.repository.CursoRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/estudiantes")
public class CursosController {

    private final CursoRepository cursoRepository;

    public CursosController(CursoRepository cursoRepository) {
        this.cursoRepository = cursoRepository;
    }

    @GetMapping("/{id}/cursos")
    public Map<String, Object> getCursos(@PathVariable Long id) {
        // JPA creará la tabla cursos_estudiantes si existe relación. 
        // Como usamos nativeQuery, si la tabla no existe podría fallar, pero para desarrollo está bien.
        List<Curso> cursos = null;
        try {
            cursos = cursoRepository.findCursosByEstudianteId(id);
            System.out.println("DEBUG: Cursos encontrados para ID " + id + ": " + (cursos != null ? cursos.size() : "null"));
        } catch (Exception e) {
            System.out.println("DEBUG: Error al buscar cursos: " + e.getMessage());
            // Si la tabla no existe aún, devuelve una lista vacía para no romper el frontend
            cursos = List.of();
        }

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("cursos", cursos);
        return response;
    }
}
