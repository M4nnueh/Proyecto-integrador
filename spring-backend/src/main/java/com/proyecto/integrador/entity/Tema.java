package com.proyecto.integrador.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "temas")
public class Tema {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titulo;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String descripcion;

    @Column(nullable = false)
    private String biblioteca;

    public Tema() {
    }

    public Tema(String titulo, String descripcion, String biblioteca) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.biblioteca = biblioteca;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public String getBiblioteca() { return biblioteca; }
    public void setBiblioteca(String biblioteca) { this.biblioteca = biblioteca; }
}
