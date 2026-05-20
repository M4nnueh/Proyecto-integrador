#include <stdio.h>
#include <math.h>

// Error absoluto
double error_absoluto(double real, double aprox) {
    return fabs(real - aprox);
}

// Error relativo
double error_relativo(double real, double aprox) {
    return fabs(real - aprox) / fabs(real);
}

int main() {
    double real, aprox;

    printf("Ingrese valor real: ");
    scanf("%lf", &real);

    printf("Ingrese valor aproximado: ");
    scanf("%lf", &aprox);

    double e_abs = error_absoluto(real, aprox);
    double e_rel = error_relativo(real, aprox);

    printf("Error absoluto: %.10lf\n", e_abs);
    printf("Error relativo: %.10lf\n", e_rel);

    return 0;
}