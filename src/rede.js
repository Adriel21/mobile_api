import conexao from "./banco.js";

function lerUmaRede(perfilId, res) {
    const sql = "SELECT * FROM perfil WHERE perfilId = ?";

  conexao.query(sql, perfilId, (erro, resultados) => {
    if(resultados.length === 0){
        res.status(204).end();
        return;
    }
    // if erro ou resultado
    if(erro){
        res.status(400).json(erro.code);
    } else {
        res.status(200).json(resultados[0]);
    }
  })
}

function inserirRede(rede, res) {
    // Estamos iniciando o comando de inserção de dados no banco utilizando um caracter curinga do MySQL2 "SET ?" que recebe os dados e atribui na ordem sem a necessidade de especificar as colunas. Proteção contra injection e tratamento de strings 
    const sql = "INSERT INTO rede SET ?";

    conexao.query(sql, rede, (erro) => {
        if(erro){
            res.status(400).json(erro.code); //400 - requisição inválida e informa o código de erro.
        } else {
            res.status(201).json({"status": "rede inserido"}); // 201- criado e apresenta a mensagem do Aluno inserido!. 
            //res.status(201).end();
        }
    });
}

export {lerUmaRede, inserirRede}