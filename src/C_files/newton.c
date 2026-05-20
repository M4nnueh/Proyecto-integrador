#include <stdio.h>
#include <math.h>

// Función f(x)
double f(double x, int opcion) {
    switch(opcion) {
        case 1: return x*x - 4;
        case 2: return x*x*x - x - 2;
        case 3: return cos(x) - x;
        default: return 0;
    }
}

// Derivada f'(x)
double df(double x, int opcion) {
    switch(opcion) {
        case 1: return 2*x;
        case 2: return 3*x*x - 1;
        case 3: return -sin(x) - 1;
        default: return 0;
    }
}

// Método Newton-Raphson
double newton(double x0, double tol, int max_iter, int opcion) {
    double x1;

    for (int i = 0; i < max_iter; i++) {

        if (df(x0, opcion) == 0) {
            printf("Error: derivada cero.\n");
            return x0;
        }

        x1 = x0 - f(x0, opcion)/df(x0, opcion);

        printf("Iteracion %d: x = %.6lf\n", i+1, x1);

        if (fabs(x1 - x0) < tol) {
            return x1;
        }

        x0 = x1;
    }

    return x1;
}

int main() {
    int opcion, max_iter;
    double x0, tol;

    printf("Seleccione la funcion:\n");
    printf("1. x^2 - 4\n");
    printf("2. x^3 - x - 2\n");
    printf("3. cos(x) - x\n");
    scanf("%d", &opcion);

    printf("Ingrese valor inicial: ");
    scanf("%lf", &x0);

    printf("Ingrese tolerancia: ");
    scanf("%lf", &tol);

    printf("Ingrese maximo de iteraciones: ");
    scanf("%d", &max_iter);

    double raiz = newton(x0, tol, max_iter, opcion);

    printf("\nRaiz aproximada: %.6lf\n", raiz);

    return 0;
}