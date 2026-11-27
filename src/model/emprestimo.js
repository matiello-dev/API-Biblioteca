export class Emprestimo {
    constructor(exemplarId, leitorId, dataEmprestimo, dataDevolucao, multa) {

    const dataEmprestimo = new Date();
    const dataDevolucao = new Date(dataEmprestimo);
    dataDevolucao.setDate(dataDevolucao.getDate() + 14); // Prazo de devolução de 14 dias

       if(!exemplarId) {
        const erro = new Error("ID do exemplar é obrigatório");
        erro.status = 400;
        throw erro;
    }
       if(!leitorId) {
        const erro = new Error("ID do leitor é obrigatório");
        erro.status = 400;
        throw erro;
    }
       if(!dataEmprestimo) {
        const erro = new Error("Data de empréstimo é obrigatória");
        erro.status = 400;
        throw erro;
    }
       if(!dataDevolucao) {
        const erro = new Error("Data de devolução é obrigatória");
        erro.status = 400;
        throw erro;
    }
    
        this.exemplarId = exemplarId;
        this.leitorId = leitorId;
        this.dataEmprestimo = dataEmprestimo;
        this.dataDevolucao = dataDevolucao;
        this.multa = multa; 
    }
}