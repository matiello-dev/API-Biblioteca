export class Livro {
    cosntructor(titulo, isbn, ano, editoraId) {
        if(!titulo || !isbn || !ano || !editoraId) {
            const erro = new Error("Todos os campos são obrigatórios");
            erro.status = 400;
            throw erro;
        }
        if(typeof titulo !== "string" || typeof isbn !== "string" || typeof ano !== "number" || typeof editoraId !== "number") {
           const erro = new Error("Tipo de dado inválido");
           erro.status = 400;
            throw erro;
        }
        if(titulo.trim().length > 150 || titulo.trim().length < 10) {
            const erro = new Error("O título deve ter entre 10 e 150 caracteres");
            erro.status = 400;
            throw erro;
        }
        if(isbn.trim().length !== 13) {
            const erro = new Error("O ISBN deve ter 13 caracteres");
            erro.status = 400;
            throw erro;
        }
        if(ano < 1450 || ano > 2100) {
            const erro = new Error("O ano é inválido");
            erro.status = 400;
            throw erro;
        }


        this.titulo = titulo.trim();
        this.isbn = isbn.trim();
        this.ano = ano;
        this.editoraId = editoraId;
    }
}