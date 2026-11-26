import pool from "../database/conexao.js";


export async function listarLivros() {
  const { rows } = await pool.query( `
    SELECT
      l.id,
      l.titulo,
      l.ano,
      l.isbn,
      e.nome AS editora,
      STRING_AGG(a.nome, ', ' ORDER BY a.nome) AS autores
    FROM livros l
    JOIN editoras e     ON e.id = l.editora_id
    JOIN livro_autor la ON la.livro_id = l.id
    JOIN autores a      ON a.id = la.autor_id
    GROUP BY l.id, l.titulo, l.ano, l.isbn, e.nome
    ORDER BY l.titulo`
  );
  return rows;
}

export async function obterLivroPorId(id) {
  const { rows } = await pool.query(`
    SELECT
      l.id,
      l.titulo,
      l.ano,
      l.isbn,
      e.nome AS editora,
      STRING_AGG(a.nome, ', ' ORDER BY a.nome) AS autores
    FROM livros l
    JOIN editoras e     ON e.id = l.editora_id
    JOIN livro_autor la ON la.livro_id = l.id
    JOIN autores a      ON a.id = la.autor_id
    WHERE l.id = $1   
    GROUP BY l.id, l.titulo, l.ano, l.isbn, e.nome`,
    [id]
  );
  return rows[0]; 
}

export async function criarLivroSemAutor(livro) {
  const livroCriado = await pool.query(
    `INSERT INTO livros (titulo, isbn, ano, editora_id)
     VALUES ($1, $2, $3, $4)
     RETURNING id`,
    [livro.titulo, livro.isbn, livro.ano, livro.editoraId]
  )
 
  return obterLivroPorId(livroCriado.rows[0].id);
}
async function criarLivroAutor(livroId, autorId) {
  await pool.query(
    `INSERT INTO livro_autor (livro_id, autor_id)
     VALUES ($1, $2)`,
    [livroId, autorId]
  );
}
export async function criarLivroCompleto(livro, autorIds) {
  const livroCriado = livro
  for (const autorId of autorIds) {
    await criarLivroAutor(livroCriado.id, autorId);
  }
  return livroCriado;
}

//nao vou criar um novo repository so para uma query da tabela de editoras

export async function obterEditoraPorId(id) {
  const editora = await pool.query("SELECT * FROM editoras WHERE id = $1").get(id);
  return editora;
}
export async function obterISBNExistente(isbn) {
  const { rows } = await pool.query("SELECT * FROM livros WHERE isbn = $1", [isbn]);
  return rows[0];
}
export async function obterAutorPorId(id) {
  const autor = await pool.query("SELECT * FROM autores WHERE id = $1", [id]);
  return autor.rows[0];
}

export async function alterarLivro(id, dados) {
  const { titulo, isbn, ano, editoraId } = dados;
  await pool.query(
    `UPDATE livros
     SET titulo = $1, isbn = $2, ano = $3, editora_id = $4
     WHERE id = $5`,
    [titulo, isbn, ano, editoraId, id]
  );
}

export async function deletarLivro(id) {
  await pool.query("DELETE FROM livro_autor WHERE livro_id = $1", [id]);
  await pool.query("DELETE FROM livros WHERE id = $1", [id]);
}