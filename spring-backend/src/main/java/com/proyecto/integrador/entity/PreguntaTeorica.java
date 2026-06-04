package com.proyecto.integrador.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "preguntas_teoricas")
public class PreguntaTeorica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String texto;

    @Column(name = "respuesta_correcta", nullable = false, columnDefinition = "TEXT")
    private String respuestaCorrecta;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prueba_id", nullable = false)
    @JsonIgnore 
    private PruebaGeneral prueba;

    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTexto() { return texto; }
    public void setTexto(String texto) { this.texto = texto; }
    public String getRespuestaCorrecta() { return respuestaCorrecta; }
    public void setRespuestaCorrecta(String respuestaCorrecta) { this.respuestaCorrecta = respuestaCorrecta; }
    public PruebaGeneral getPrueba() { return prueba; }
    public void setPrueba(PruebaGeneral prueba) { this.prueba = prueba; }
}