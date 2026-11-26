export class Leitor {
    constructor(nome,cpf,email,telefone) {
        console.log("gremio2");
        if(!nome || !cpf || !email || !telefone) {
            const erro = new Error("Todos os campos são obrigatórios");
            erro.status = 400;
            throw erro;
        }
        if(typeof nome !== "string" || typeof cpf !== "string" || typeof email !== "string" || typeof telefone !== "string") {
           const erro = new Error("Tipo de dado inválido");
           erro.status = 400;
            throw erro;
        }
        if(nome.trim().length > 100 || nome.trim().length < 2) {
            const erro = new Error("O nome deve ter entre 2 e 100 caracteres");
            erro.status = 400;
            throw erro;
        }
        if(cpf.trim().length !== 11) {
            const erro = new Error("O CPF deve ter 11 caracteres");
            erro.status = 400;
            throw erro;
        }
        if(!email.includes("@") || !email.includes(".") || email.trim().length > 120) {
            const erro = new Error("O email é inválido");
            erro.status = 400;
            throw erro;
        }
        if(telefone.trim().length < 20 || telefone.trim().length > 15) {
            const erro = new Error("O ano é inválido");
            erro.status = 400;
            throw erro;
        }
        


        this.nome = nome.trim();
        this.cpf = cpf.trim();
        this.email = email.trim();
        this.telefone = telefone.trim();
        this.ativo = true;
    }
}