#include <stdio.h>

// Función factorial
double factorial(int n) {
    double fact = 1;
    for(int i = 1; i <= n; i++) {
        fact *= i;
    }
    return fact;
}

// Función potencia
double potencia(double x, int n) {
    double res = 1;
    for(int i = 0; i < n; i++) {
        res *= x;
    }
    return res;
}

// Serie de Taylor para e^x
double taylor_exp(double x, int terminos) {
    double suma = 0;
    for(int i = 0; i < terminos; i++) {
        suma += potencia(x, i) / factorial(i);
    }
    return suma;
}

int main() {
    double x;
    int n;

    printf("Ingrese el valor de x: ");
    scanf("%lf", &x);

    printf("Ingrese numero de terminos: ");
    scanf("%d", &n);

    double resultado = taylor_exp(x, n);

    printf("Aproximacion de e^%.2lf = %.10lf\n", x, resultado);

    return 0;
}