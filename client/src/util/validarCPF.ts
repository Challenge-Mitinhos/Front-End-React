// Função para validar o primeiro dígito do CPF
const validarPrimeiroDigito = (cpf: number[]): boolean => {
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += cpf[i] * (10 - i);
    }
    const resto = (sum * 10) % 11;
    return resto < 10 ? cpf[9] === resto : cpf[9] === 0;
};
  
const validarSegundoDigito = (cpf: number[]): boolean => {
    let sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += cpf[i] * (11 - i);
    }
    const resto = (sum * 10) % 11;
    return resto < 10 ? cpf[10] === resto : cpf[10] === 0;
};
  
const validarRepetido = (cpf: number[]): boolean => {
    const primeiro = cpf[0];
    return cpf.some((digito) => digito !== primeiro);
};
  

export const validarCpf = (cpfStr: string): boolean => {
    const cpf = cpfStr.replace(/\D/g, '').split('').map(Number);

    if (cpf.length !== 11) {
        return false;
    }

    if (!validarRepetido(cpf)) {
        return false;
    }

    return validarPrimeiroDigito(cpf) && validarSegundoDigito(cpf);
};