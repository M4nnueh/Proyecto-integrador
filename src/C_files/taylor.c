#include <stdio.h>
#include <math.h>

// Método de Taylor para e^x
double taylor_exp(double x, double tol, int max_iter) {
    double suma = 1.0;   // primer término (n=0)
    double termino = 1.0;
    int n = 1;

    while (n <= max_iter) {
        termino = termino * x / n;  // genera siguiente término
        suma += termino;

        printf("Iteracion %d: termino = %.10lf, suma = %.10lf\n", n, termino, suma);

        // criterio de parada por tolerancia
        if (fabs(termino) < tol) {
            break;
        }

        n++;
    }

    return suma;
}

int main() {
    double x, tol;
    int max_iter;

    printf("Aproximacion de e^x usando Taylor\n");

    printf("Ingrese valor de x: ");
    scanf("%lf", &x);

    printf("Ingrese tolerancia: ");
    scanf("%lf", &tol);

    printf("Ingrese maximo de iteraciones: ");
    scanf("%d", &max_iter);

    double resultado = taylor_exp(x, tol, max_iter);

    printf("\nResultado aproximado: %.10lf\n", resultado);
    printf("Valor real (exp): %.10lf\n", exp(x));

    return 0;
}