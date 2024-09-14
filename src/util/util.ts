export const scrollTop = (): void => {
    window.scrollTo({
        top: 0,
        behavior:"smooth"});
}

export const insertMaskInCpf = (cpf:string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
}