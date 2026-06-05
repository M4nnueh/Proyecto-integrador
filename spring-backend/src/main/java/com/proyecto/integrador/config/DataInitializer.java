package com.proyecto.integrador.config;

import com.proyecto.integrador.entity.Tema;
import com.proyecto.integrador.repository.TemaRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initTemas(TemaRepository temaRepository) {
        return args -> {
            // Siempre borramos e insertamos para tener la última versión detallada (útil durante el desarrollo)
            temaRepository.deleteAll();
            
            String biseccion = "<h4>Concepto Principal</h4>" +
                               "<p>El <strong>método de bisección</strong> es un algoritmo de búsqueda de raíces que trabaja dividiendo repetidamente un intervalo a la mitad y seleccionando el subintervalo que tiene la raíz.</p>" +
                               "<h4>¿Cómo funciona?</h4>" +
                               "<ul>" +
                               "<li>Se necesitan dos valores iniciales <em>a</em> y <em>b</em> tales que la función cambia de signo en el intervalo [a, b] (es decir, f(a) * f(b) < 0).</li>" +
                               "<li>Se calcula el punto medio <em>c = (a + b) / 2</em>.</li>" +
                               "<li>Si f(c) == 0, se encontró la raíz. Si no, se verifica si el cambio de signo está entre [a, c] o [c, b].</li>" +
                               "<li>Se repite el proceso hasta alcanzar la tolerancia deseada.</li>" +
                               "</ul>" +
                               "<h4>Ejemplo Práctico</h4>" +
                               "<p>Dada la función <code>f(x) = x^3 - x - 2</code>, sabiendo que f(1) = -2 y f(2) = 4.</p>" +
                               "<p>Paso 1: Punto medio c = 1.5. Evaluamos f(1.5) = -0.125.<br>" +
                               "Como f(1.5) es negativo, la raíz debe estar entre 1.5 y 2. El nuevo intervalo es [1.5, 2].</p>";

            String newton = "<h4>Concepto Principal</h4>" +
                            "<p>El <strong>método de Newton-Raphson</strong> es un algoritmo abierto que encuentra aproximaciones de las raíces de una función real. Es muy rápido pero requiere conocer la derivada de la función.</p>" +
                            "<h4>¿Cómo funciona?</h4>" +
                            "<ul>" +
                            "<li>Se parte de una estimación inicial <em>x0</em> cercana a la raíz.</li>" +
                            "<li>Se utiliza la recta tangente en <em>(x0, f(x0))</em> para encontrar una mejor aproximación.</li>" +
                            "<li>La fórmula de iteración es: <strong>x1 = x0 - f(x0) / f'(x0)</strong>.</li>" +
                            "</ul>" +
                            "<h4>Ejemplo Práctico</h4>" +
                            "<p>Encontrar la raíz de <code>f(x) = x^2 - 4</code> con x0 = 3. La derivada es <code>f'(x) = 2x</code>.</p>" +
                            "<p>Iteración 1: x1 = 3 - (3^2 - 4) / (2*3) = 3 - 5 / 6 = 2.166...<br>" +
                            "Vemos que en un solo paso nos acercamos enormemente a la raíz real que es 2.</p>";

            String taylor = "<h4>Concepto Principal</h4>" +
                            "<p>El <strong>Polinomio de Taylor</strong> es una aproximación de funciones mediante sumas de términos calculados a partir de las derivadas de la función en un punto específico.</p>" +
                            "<h4>¿Cómo funciona?</h4>" +
                            "<ul>" +
                            "<li>Permite transformar funciones complejas (como senos, exponenciales) en polinomios simples que las computadoras pueden evaluar fácilmente.</li>" +
                            "<li>La fórmula general suma términos de la forma: <strong>f^(n)(a) / n! * (x - a)^n</strong>.</li>" +
                            "<li>Cuantos más términos agregues, mayor será la precisión de la aproximación cerca del punto 'a'.</li>" +
                            "</ul>" +
                            "<h4>Ejemplo Práctico</h4>" +
                            "<p>La aproximación de <code>e^x</code> alrededor de a=0 (Serie de Maclaurin) usando 3 términos es:</p>" +
                            "<p><code>e^x ≈ 1 + x + x^2 / 2</code></p>" +
                            "<p>Si queremos evaluar e^0.5, usando la fórmula obtenemos: 1 + 0.5 + 0.125 = 1.625 (El valor real es 1.6487).</p>";

            temaRepository.saveAll(List.of(
                new Tema("Método de Bisección", biseccion, "biseccion.c"),
                new Tema("Método de Newton-Raphson", newton, "newton.c"),
                new Tema("Polinomio de Taylor", taylor, "taylor.c")
            ));
            System.out.println("Temas iniciales actualizados con contenido extenso.");
        };
    }
}
