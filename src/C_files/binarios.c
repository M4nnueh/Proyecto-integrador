#include <stdio.h>
#include <math.h>

// Decimal a binario
void decimal_a_binario(int n) {
    int binario[32];
    int i = 0;

    while(n > 0) {
        binario[i] = n % 2;
        n = n / 2;
        i++;
    }

    printf("Binario: ");
    for(int j = i - 1; j >= 0; j--) {
        printf("%d", binario[j]);
    }
    printf("\n");
}

// Binario a decimal
int binario_a_decimal(int binario) {
    int decimal = 0, i = 0;

    while(binario > 0) {
        int digito = binario % 10;
        decimal += digito * pow(2, i);
        binario /= 10;
        i++;
    }

    return decimal;
}

int main() {
    int opcion;

    printf("1. Decimal a Binario\n");
    printf("2. Binario a Decimal\n");
    printf("Seleccione: ");
    scanf("%d", &opcion);

    if(opcion == 1) {
        int num;
        printf("Ingrese numero decimal: ");
        scanf("%d", &num);
        decimal_a_binario(num);

    } else if(opcion == 2) {
        int bin;
        printf("Ingrese numero binario: ");
        scanf("%d", &bin);
        printf("Decimal: %d\n", binario_a_decimal(bin));
    }

    return 0;
}