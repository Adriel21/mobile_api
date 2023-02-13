import conexao from "./banco.js";

// / Função que lê a tabela de alunos do BD
function lerRedes(res) {
    // Criando o CRUD
    const sql = "SELECT * FROM rede";
    
    
    // conectando ao BD
    conexao.query(sql, (erro, resultados) => {
        if(resultados.length === 0) {
            res.status(204).end(); //204 = Sem conteúdo. O método .end() para qualquer comunicação.
            return; // equivalente ao die()
        } 
        if(erro) {
            res.status(400).json(erro.code); // 400 BAD Request - comunicação não entendida pelo servidor / requisição inválida.
        } else {
            res.status(200).json(resultados); //deu certo, exibir os resultados
        }
    }) //query equivale ao  execute do php
    }


        // Inserindo alunos

function inserirUmaRede(rede, res) {
    // Estamos iniciando o comando de inserção de dados no banco utilizando um caracter curinga do MySQL2 "SET ?" que recebe os dados e atribui na ordem sem a necessidade de especificar as colunas. Proteção contra injection e tratamento de strings 
    const sql = "INSERT INTO rede SET ?";

    conexao.query(sql, rede, (erro) => {
        if(erro){
            res.status(400).json(erro.code); //400 - requisição inválida e informa o código de erro.
        } else {
            res.status(201).json({"status": "evento inserido"}); // 201- criado e apresenta a mensagem do Aluno inserido!. 
            //res.status(201).end();
        }
    });
}


    function lerUmaRede(perfilId, res) {
        const sql = "SELECT * FROM rede WHERE perfilId = ?";
    
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

    function atualizarRede(perfilId, rede, res) {
        const sql = "UPDATE rede SET ? WHERE perfilId = ?";
    
        // Aqui a ordem é importante, para passar mais de um parâmetro usamos o array. Dentro dele a ordem importa, pois precisa corresponder ao SQL acima.
        conexao.query(sql, [rede, perfilId], (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro.code);
            } else {
                // res.status(200).json({"status" : "Atualizado com sucesso!"});
    
                // spread operator (operador de "espalhamento" de objetos) pega todos os itens e adiciona dentro do mesmo objeto
                res.status(200).json({...rede, perfilId});
            }
        });
    }

    export { lerRedes,  inserirUmaRede, lerUmaRede, atualizarRede}
