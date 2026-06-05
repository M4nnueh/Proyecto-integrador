package com.proyecto.integrador.controller;

import com.proyecto.integrador.entity.Tema;
import com.proyecto.integrador.repository.TemaRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/temas")
public class TemaController {

    private final TemaRepository temaRepository;

    public TemaController(TemaRepository temaRepository) {
        this.temaRepository = temaRepository;
    }

    @GetMapping
    public List<Tema> getAllTemas() {
        return temaRepository.findAll();
    }

    @GetMapping("/{id}")
    public org.springframework.http.ResponseEntity<Tema> getTemaById(@org.springframework.web.bind.annotation.PathVariable Long id) {
        return temaRepository.findById(id)
                .map(org.springframework.http.ResponseEntity::ok)
                .orElse(org.springframework.http.ResponseEntity.notFound().build());
    }
}
