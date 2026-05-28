package com.proyecto.integrador.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/profesor")
public class ProfesorController {

    @GetMapping("/stats")
    @PreAuthorize("hasRole('PROFESOR') or hasRole('ADMINISTRADOR')")
    public Map<String, Object> getStats() {
        // Datos simulados (mock) para el dashboard del profesor de Análisis Numérico
        Map<String, Object> stats = new HashMap<>();
        stats.put("cursosImpartidos", 4);
        stats.put("alumnosActivos", 125);
        stats.put("evaluacionesPendientes", 15);
        stats.put("promedioGeneral", 8.4);

        // Simulamos rendimiento por unidad para la gráfica
        List<Map<String, Object>> rendimientoPorUnidad = List.of(
            Map.of("unidad", "Unidad 1: Errores", "promedio", 9.1),
            Map.of("unidad", "Unidad 2: Raíces", "promedio", 8.5),
            Map.of("unidad", "Unidad 3: Ecuaciones", "promedio", 7.8),
            Map.of("unidad", "Unidad 4: Interpolación", "promedio", 8.2)
        );
        stats.put("rendimientoPorUnidad", rendimientoPorUnidad);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("stats", stats);

        return response;
    }
}
