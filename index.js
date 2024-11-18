const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Lista de empresas cadastradas
let empresasCadastradas = [];

// Middleware para processar dados do formulário (application/x-www-form-urlencoded)
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para o formulário de cadastro
app.get('/', (req, res) => {
 
res.send(`
    <style>
        /* Estilos Gerais */
        body {
            font-family: 'Roboto', sans-serif;
            background: linear-gradient(135deg, #6a11cb, #2575fc);
            color: #fff;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            height: 100vh;
            flex-direction: column;
            overflow-y: auto;
            scroll-behavior: smooth;
        }

        h1, h2 {
            text-align: center;
            margin: 20px 0;
        }

        h1 {
            font-size: 2.5rem;
            color: #f3f4f6;
        }

        h2 {
            font-size: 1.8rem;
            color: #e0e0e0;
        }

        /* Formulário */
        form {
            background: rgba(255, 255, 255, 0.9);
            color: #333;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            width: 400px;
            max-width: 90%;
            margin-bottom: 20px;
            overflow-y: auto;
        }

        label {
            font-size: 14px;
            margin-bottom: 5px;
            display: block;
            color: #555;
        }

        input[type="text"],
        input[type="email"],
        input[type="number"] {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 14px;
            background: #f9f9f9;
        }

        input[type="text"]:focus,
        input[type="email"]:focus,
        input[type="number"]:focus {
            outline: none;
            border-color: #6a11cb;
            box-shadow: 0 0 8px rgba(106, 17, 203, 0.2);
        }

        button {
            background: #6a11cb;
            color: #fff;
            border: none;
            padding: 12px 20px;
            font-size: 16px;
            cursor: pointer;
            border-radius: 8px;
            transition: background 0.3s;
        }

        button:hover {
            background: #2575fc;
        }

        /* Lista de Empresas */
        ul {
            list-style: none;
            padding: 0;
            margin: 20px auto;
            width: 90%;
            max-width: 600px;
        }

        li {
            background: rgba(255, 255, 255, 0.8);
            color: #333;
            padding: 10px;
            margin-bottom: 10px;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
    </style>

    <h1>Cadastro de Empresa</h1>
    <form action="/cadastro" method="POST">
        <label for="cnpj">CNPJ:</label>
        <input type="text" id="cnpj" name="cnpj">

        <label for="razao_social">Razão Social:</label>
        <input type="text" id="razao_social" name="razao_social">

        <label for="nome_fantasia">Nome Fantasia:</label>
        <input type="text" id="nome_fantasia" name="nome_fantasia">

        <label for="endereco">Endereço:</label>
        <input type="text" id="endereco" name="endereco">

        <label for="cidade">Cidade:</label>
        <input type="text" id="cidade" name="cidade">

        <label for="uf">UF:</label>
        <input type="text" id="uf" name="uf">

        <label for="cep">CEP:</label>
        <input type="text" id="cep" name="cep">

        <label for="email">Email:</label>
        <input type="email" id="email" name="email">

        <label for="telefone">Telefone:</label>
        <input type="text" id="telefone" name="telefone">

        <button type="submit">Cadastrar</button>
    </form>

    <h2>Empresas Cadastradas</h2>
    <ul>
        ${empresasCadastradas.map(emp => `
            <li>
                <strong>${emp.razao_social}</strong> (${emp.nome_fantasia})<br>
                CNPJ: ${emp.cnpj}, Endereço: ${emp.endereco}, ${emp.cidade} - ${emp.uf}, ${emp.cep}<br>
                Email: ${emp.email}, Telefone: ${emp.telefone}
            </li>
        `).join('')}
    </ul>
`);

       
});

// Rota para processar o cadastro de empresa
app.post('/cadastro', (req, res) => {
    const { cnpj, razao_social, nome_fantasia, endereco, cidade, uf, cep, email, telefone } = req.body;

    // Validação dos campos
    let erros = [];
    if (!cnpj || !razao_social || !nome_fantasia || !endereco || !cidade || !uf || !cep || !email || !telefone) {
        erros.push("Todos os campos são obrigatórios.");
    }

    if (cnpj.length !== 14 || isNaN(cnpj)) {
        erros.push("CNPJ inválido! Deve ter 14 caracteres numéricos.");
    }

    if (!email.includes('@') || !email.includes('.')) {
        erros.push("Email inválido! Verifique o formato do email.");
    }

    if (telefone.length < 10 || isNaN(telefone)) {
        erros.push("Telefone inválido! O telefone deve ter pelo menos 10 dígitos.");
    }

    if (erros.length > 0) {
        return res.send(`
       <style>
        body {
            font-family: 'Verdana', sans-serif;
            background-color: #f8f9fa;
            color: #212529;
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        h1 {
            color: #dc3545;
            font-size: 2rem;
            text-align: center;
        }

        p {
            color: #6c757d;
            font-size: 1.2rem;
            text-align: center;
            margin: 10px 0;
        }

        a {
            display: inline-block;
            margin-top: 15px;
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-size: 1rem;
        }

        a:hover {
            background-color: #0056b3;
        }
    </style>
            <h1>Cadastro de Empresa</h1>
            <p>${erros.join('<br>')}</p>
            <a href="/">Voltar</a>
        `);
    }

    // Adiciona a empresa na lista de cadastradas
    empresasCadastradas.push({ cnpj, razao_social, nome_fantasia, endereco, cidade, uf, cep, email, telefone });

    // Redireciona para a página inicial com a lista de empresas
    res.redirect('/');
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});



