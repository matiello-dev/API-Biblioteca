import pool from "../database/db.js";

export async function criarEmprestimo(exemplar_id, leitor_id, emprestado_em, devolver_em, multa) {
  await pool.query("INSERT INTO emprestimos (exemplar_id, leitor_id, emprestado_em, devolver_em, multa) VALUES ($1, $2, $3, $4, $5)", [exemplar_id, leitor_id, emprestado_em, devolver_em, multa]);
}