const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors')
const app = express();
const bcrypt = require('bcrypt');
const saltRounds = 10;

const dbConfig = {
    user: process.env.FIAP_ORACLE_USER,
    password: process.env.FIAP_ORACLE_PASSWORD,
    connectString: 'oracle.fiap.com.br:1521/orcl'
};

async function inserirCadastro(user, res) {
    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);

        const sqlCheckEmail = `SELECT COUNT(*) AS count FROM USUARIOS WHERE EMAIL = :email`;
        const result = await connection.execute(sqlCheckEmail, { email: user.email });

        const emailExists = result.rows[0][0] > 0;

        if (emailExists) {
            res.status(400).send("Email já cadastrado");
            return;
        }
        
        const sqlInsert = `INSERT INTO USUARIOS (EMAIL, PASSWORD) VALUES (:email, :password)`;
        const hashedPass = await bcrypt.hash(user.password, saltRounds);

        const binds = {
            email: user.email,
            password: hashedPass
        };

        const options = {
            autoCommit: true,
            outFormat: oracledb.OUT_FORMAT_OBJECT
        };

        await connection.execute(sqlInsert, binds, options);
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
        connection = await oracledb.getConnection(dbConfig);

        const verifyCredential = `SELECT PASSWORD FROM USUARIOS WHERE EMAIL = :email`;
        const resultCredential = await connection.execute(verifyCredential, [ user.email ]);
        
        if (!(resultCredential.rows.length > 0)) {
            res.status(401).send({ msg: "Email não encontrado."})
            return
        }

        const hashedPassword = resultCredential.rows[0][0]

        const match = await bcrypt.compare(user.password, hashedPassword)

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
app.use(cors())

app.post('/register', (req, res) => {
    const { email, password } = req.body;

    const user = {
        email: email,
        password: password
    };

    inserirCadastro(user, res);
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const user = {
        email: email,
        password: password
    };

    verificarCredencial(user, res)
});

app.listen(3001, () => {
    console.log("Rodando na porta 3001");
});
