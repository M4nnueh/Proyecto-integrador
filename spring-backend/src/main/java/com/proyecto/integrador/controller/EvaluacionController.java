package com.proyecto.integrador.controller;

import com.proyecto.integrador.entity.Evaluacion;
import com.proyecto.integrador.entity.ResultadoEvaluacion;
import com.proyecto.integrador.repository.EvaluacionRepository;
import com.proyecto.integrador.repository.ResultadoEvaluacionRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/evaluaciones")
@CrossOrigin(origins = "http://localhost:4200")
public class EvaluacionController {

    private final EvaluacionRepository evaluacionRepository;
    private final ResultadoEvaluacionRepository resultadoRepository;

    public EvaluacionController(EvaluacionRepository evaluacionRepository,
                                 ResultadoEvaluacionRepository resultadoRepository) {
        this.evaluacionRepository = evaluacionRepository;
        this.resultadoRepository = resultadoRepository;
    }

    // GET /api/evaluaciones/1 — obtener evaluación con preguntas
    @GetMapping("/{id}")
    public ResponseEntity<Evaluacion> getEvaluacion(@PathVariable Long id) {
        return evaluacionRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /api/evaluaciones/1/resultado — guardar resultado del estudiante
    @PostMapping("/{id}/resultado")
    public ResponseEntity<Map<String, Object>> guardarResultado(
            @PathVariable Long id,
            @RequestBody Map<String, Object> body) {

        Optional<Evaluacion> evalOpt = evaluacionRepository.findById(id);
        if (evalOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        String email = (String) body.get("estudianteEmail");
        String respuestas = body.get("respuestas").toString();
        int correctas = (int) body.get("correctas");
        int total = (int) body.get("total");
        double calificacion = ((Number) body.get("calificacion")).doubleValue();

        ResultadoEvaluacion resultado = new ResultadoEvaluacion();
        resultado.setEvaluacion(evalOpt.get());
        resultado.setEstudianteEmail(email);
        resultado.setRespuestas(respuestas);
        resultado.setCorrectas(correctas);
        resultado.setTotal(total);
        resultado.setCalificacion(calificacion);
        resultado.setFecha(LocalDateTime.now());

        resultadoRepository.save(resultado);

        return ResponseEntity.ok(Map.of(
            "success", true,
            "message", "Resultado guardado correctamente",
            "calificacion", calificacion,
            "correctas", correctas,
            "total", total
        ));
    }

    // GET /api/evaluaciones/resultados/{email} — historial del estudiante
    @GetMapping("/resultados/{email}")
    public ResponseEntity<List<ResultadoEvaluacion>> getResultadosPorEstudiante(
            @PathVariable String email) {
        return ResponseEntity.ok(resultadoRepository.findByEstudianteEmail(email));
    }
}