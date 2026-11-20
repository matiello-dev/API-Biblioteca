import db from "../database/conexao.js";

export async function listarLivros() {
  const livros = await db.query("SELECT * FROM livros");
  return livros.rows;
}