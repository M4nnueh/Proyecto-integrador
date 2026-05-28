package com.proyecto.integrador.controller;

import com.proyecto.integrador.entity.Usuario;
import com.proyecto.integrador.repository.UsuarioRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UsuarioRepository usuarioRepository;

    public AdminController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @GetMapping("/stats")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public Map<String, Object> getStats() {
        long totalUsuarios = usuarioRepository.count();
        List<Object[]> roleCounts = usuarioRepository.countByRol();
        
        int totalEstudiantes = 0;
        int totalProfesores = 0;
        int totalAdmins = 0;

        for (Object[] row : roleCounts) {
            String rol = String.valueOf(row[0]).toLowerCase().replaceFirst("^role_", "");
            long count = (long) row[1];
            if ("estudiante".equals(rol)) totalEstudiantes += count;
            else if ("profesor".equals(rol)) totalProfesores += count;
            else if ("administrador".equals(rol) || "admin".equals(rol)) totalAdmins += count;
        }

        List<Usuario> ultimosUsuarios = usuarioRepository.findTop5ByOrderByFechaCreacionDesc();

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsuarios", totalUsuarios);
        stats.put("totalEstudiantes", totalEstudiantes);
        stats.put("totalProfesores", totalProfesores);
        stats.put("totalAdmins", totalAdmins);
        stats.put("ultimosUsuarios", ultimosUsuarios);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("stats", stats);

        return response;
    }
}
