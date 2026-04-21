#include <stdio.h>
#include <math.h>

// Función f(x) con opciones
double f(double x, int opcion) {
    switch(opcion) {
        case 1: return x*x - 4;
        case 2: return x*x*x - x - 2;
        case 3: return cos(x) - x;
        default: return 0;
    }
}

// Método de bisección
double biseccion(double a, double b, double tol, int max_iter, int opcion) {
    double xr, xr_ant = 0;
    double error = 1;
    int i = 0;

    if (f(a, opcion) * f(b, opcion) >= 0) {
        printf("Error: el intervalo no encierra una raiz.\n");
        return 0;
    }

    while (i < max_iter && error > tol) {
        xr = (a + b) / 2.0;

        if (i > 0) {
            error = fabs((xr - xr_ant) / xr); // error relativo
        }

        printf("Iteracion %d: xr = %.10lf, error = %.10lf\n", i+1, xr, error);

        if (f(a, opcion) * f(xr, opcion) < 0) {
            b = xr;
        } else {
            a = xr;
        }

        xr_ant = xr;
        i++;
    }

    return xr;
}

int main() {
    int opcion, max_iter;
    double a, b, tol;

    printf("Metodo de Biseccion\n");

    printf("Seleccione la funcion:\n");
    printf("1. x^2 - 4\n");
    printf("2. x^3 - x - 2\n");
    printf("3. cos(x) - x\n");
    scanf("%d", &opcion);

    printf("Ingrese limite inferior (a): ");
    scanf("%lf", &a);

    printf("Ingrese limite superior (b): ");
    scanf("%lf", &b);

    printf("Ingrese tolerancia: ");
    scanf("%lf", &tol);

    printf("Ingrese maximo de iteraciones: ");
    scanf("%d", &max_iter);

    double raiz = biseccion(a, b, tol, max_iter, opcion);

    printf("\nRaiz aproximada: %.10lf\n", raiz);

    return 0;
}