package com.proyecto.integrador.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "resultados_evaluacion")
public class ResultadoEvaluacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "evaluacion_id", nullable = false)
    private Evaluacion evaluacion;

    @Column(name = "estudiante_email", nullable = false)
    private String estudianteEmail;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String respuestas;

    @Column(nullable = false)
    private int correctas;

    @Column(nullable = false)
    private int total;

    @Column(nullable = false)
    private double calificacion;

    @Column(name = "fecha")
    private LocalDateTime fecha;

    public ResultadoEvaluacion() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Evaluacion getEvaluacion() { return evaluacion; }
    public void setEvaluacion(Evaluacion evaluacion) { this.evaluacion = evaluacion; }

    public String getEstudianteEmail() { return estudianteEmail; }
    public void setEstudianteEmail(String email) { this.estudianteEmail = email; }

    public String getRespuestas() { return respuestas; }
    public void setRespuestas(String respuestas) { this.respuestas = respuestas; }

    public int getCorrectas() { return correctas; }
    public void setCorrectas(int correctas) { this.correctas = correctas; }

    public int getTotal() { return total; }
    public void setTotal(int total) { this.total = total; }

    public double getCalificacion() { return calificacion; }
    public void setCalificacion(double calificacion) { this.calificacion = calificacion; }

    public LocalDateTime getFecha() { return fecha; }
    public void setFecha(LocalDateTime fecha) { this.fecha = fecha; }
}