package com.proyecto.integrador.controller;

import com.proyecto.integrador.entity.PreguntaTeorica;
import com.proyecto.integrador.entity.PruebaGeneral;
import com.proyecto.integrador.repository.PreguntaTeoricaRepository;
import com.proyecto.integrador.repository.PruebaGeneralRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/preguntas")
@CrossOrigin(origins = "*") // Permite que tu Angular local se conecte sin problemas de CORS
public class PreguntasController {

    private final PruebaGeneralRepository pruebaRepository;
    private final PreguntaTeoricaRepository preguntaRepository;

    public PreguntasController(PruebaGeneralRepository pruebaRepository, PreguntaTeoricaRepository preguntaRepository) {
        this.pruebaRepository = pruebaRepository;
        this.preguntaRepository = preguntaRepository;
    }

    @GetMapping
    public ResponseEntity<List<PruebaGeneral>> obtenerTodas() {
        return ResponseEntity.ok(pruebaRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<PruebaGeneral> crearPrueba(@RequestBody Map<String, String> body) {
        String titulo = body.get("titulo");
        if (titulo == null || titulo.trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        PruebaGeneral nueva = new PruebaGeneral();
        nueva.setTitulo(titulo.trim());
        return ResponseEntity.ok(pruebaRepository.save(nueva));
    }

    @PostMapping("/{pruebaId}/agregar")
    public ResponseEntity<PreguntaTeorica> agregarPregunta(@PathVariable Long pruebaId, @RequestBody Map<String, String> body) {
        return pruebaRepository.findById(pruebaId).map(prueba -> {
            String texto = body.get("texto");
            String respuesta = body.get("respuestaCorrecta");

            if (texto == null || respuesta == null) return ResponseEntity.badRequest().<PreguntaTeorica>build();

            PreguntaTeorica nuevaPregunta = new PreguntaTeorica();
            nuevaPregunta.setTexto(texto.trim());
            nuevaPregunta.setRespuestaCorrecta(respuesta.trim());
            nuevaPregunta.setPrueba(prueba);

            return ResponseEntity.ok(preguntaRepository.save(nuevaPregunta));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> eliminarPrueba(@PathVariable Long id) {
        if (pruebaRepository.existsById(id)) {
            pruebaRepository.deleteById(id);
            return ResponseEntity.ok(Map.of("success", true, "message", "Prueba eliminada"));
        }
        return ResponseEntity.notFound().build();
    }
}