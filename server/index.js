const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt');
const saltRounds = 10;

const dbConfig = {
    user: process.env.FIAP_ORACLE_USER,
    password: process.env.FIAP_ORACLE_PASSWORD,
    connectString: 'oracle.fiap.com.br:1521/orcl'
};

async function createPool() {
    try {
        await oracledb.createPool({
            user: dbConfig.user,
            password: dbConfig.password,
            connectString: dbConfig.connectString,
            poolMin: 1,
            poolMax: 10,
            poolTimeout: 60
        });
        console.log('Pool de conexões criado com sucesso.');
    } catch (err) {
        console.error('Erro ao criar o pool de conexões: ', err);
        process.exit(1);
    }
}

async function getConnection() {
    let connection;
    try {
        connection = await oracledb.getConnection();
        return connection;
    } catch (err) {
        console.error('Erro ao obter conexão do pool: ', err);
        throw err;
    }
}

async function closePool() {
    try {
        await oracledb.getPool().close(10);
        console.log('Pool de conexões fechado com sucesso.');
    } catch (err) {
        console.error('Erro ao fechar o pool: ', err);
    }
}

async function inserirCadastro(user, res) {
    let connection;
    try {
        connection = await getConnection();

        const sqlCheckEmail = `SELECT COUNT(*) AS count FROM USUARIOS WHERE EMAIL_USU = :email`;
        const result = await connection.execute(sqlCheckEmail, { email: user.email });

        const emailExists = result.rows[0][0] > 0;

        if (emailExists) {
            res.status(400).send("Email já cadastrado");
            return;
        }

        const sqlCheckCPF = `SELECT COUNT(*) AS count FROM USUARIOS WHERE CPF_USU = :cpf`
        const resultCPF = await connection.execute(sqlCheckCPF, { cpf: user.cpf })

        const cpfExists = resultCPF.rows[0][0] > 0;

        if (cpfExists) {
            res.status(400).send("CPF já cadastrado");
            return
        }
        
        const sqlInsert = () => {
            if (user.telefone === '') {
                return `INSERT INTO USUARIOS (EMAIL_USU, SENHA_USU, NOME_USU, SOBRENOME_USU, CPF_USU) VALUES (:email, :senha, :nome, :sobrenome, :cpf)`
            } else {
                return `INSERT INTO USUARIOS (EMAIL_USU, SENHA_USU, NOME_USU, SOBRENOME_USU, TEL_USU, CPF_USU) VALUES (:email, :senha, :nome, :sobrenome, :telefone, :cpf)`
            }
        }
        
        const hashedPass = await bcrypt.hash(user.senha, saltRounds);
        
        const bindsFilter = () => {
            if (user.telefone === '') {
                let binds = {
                    email: user.email,
                    senha: hashedPass,
                    nome: user.nome,
                    sobrenome: user.sobrenome,
                    cpf: user.cpf
                }
                
                return binds
            } else {
                let binds = {
                    email: user.email,
                    senha: hashedPass,
                    nome: user.nome,
                    sobrenome: user.sobrenome,
                    telefone: user.telefone,
                    cpf: user.cpf
                };

                return binds
            }
        
        }

        const options = {
            autoCommit: true,
            outFormat: oracledb.OUT_FORMAT_OBJECT
        };

        await connection.execute(sqlInsert(), bindsFilter(), options);
        res.status(200).send("Usuário cadastrado com sucesso");

    } catch (err) {
        console.error("Erro ao executar a consulta: ", err);
        res.status(500).send("Erro ao conectar ao banco de dados");
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error("Erro ao fechar a conexão", err);
            }
        }
    }
}

async function verificarCredencial(user, res) {
    let connection;

    try {
        connection = await getConnection();

        const verifyCredential = `SELECT SENHA_USU FROM USUARIOS WHERE EMAIL_USU = :email`;
        const resultCredential = await connection.execute(verifyCredential, [user.email]);
        
        if (!(resultCredential.rows.length > 0)) {
            res.status(401).send({ msg: "Email não encontrado." });
            return;
        }

        const hashedPassword = resultCredential.rows[0][0];

        const match = await bcrypt.compare(user.senha, hashedPassword);

        if (match) {
            res.status(200).send({ msg: "Usuário logado com sucesso." });
        } else {
            res.status(401).send({ msg: "Usuário ou Senha incorretos." });
        }

    } catch (err) {
        console.error("Erro ao executar a consulta: ", err);
        res.status(500).send("Erro ao conectar ao banco de dados");
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error("Erro ao fechar a conexão", err);
            }
        }
    }
}

app.use(express.json());
app.use(cors());

app.post('/register', (req, res) => {
    const { email, senha, nome, sobrenome, telefone, cpf } = req.body;

    const user = {
        email,
        senha,
        nome,
        sobrenome,
        telefone,
        cpf
    };

    inserirCadastro(user, res);
});

app.post('/login', (req, res) => {
    const { email, senha, nome, sobrenome, telefone, cpf } = req.body;

    const user = { email, senha, nome, sobrenome, telefone, cpf };

    verificarCredencial(user, res);
});

app.listen(3001, async () => {
    await createPool();
    console.log("Rodando na porta 3001");
});

process.on('SIGINT', async () => {
    console.log('Encerrando o servidor...');
    await closePool();
    process.exit(0);
});