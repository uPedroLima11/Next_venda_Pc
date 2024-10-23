import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();
const router = Router();

router.get("/", async (req, res) => {
  try {
    const clientes = await prisma.cliente.findMany();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(400).json(error);
  }
});

function validaSenha(senha: string) {
  const mensa: string[] = [];

  if (senha.length < 8) {
    mensa.push("Erro... senha deve possuir, no mínimo, 8 caracteres");
  }

  let pequenas = 0;
  let grandes = 0;
  let numeros = 0;
  let simbolos = 0;

  for (const letra of senha) {
    if (/[a-z]/.test(letra)) {
      pequenas++;
    } else if (/[A-Z]/.test(letra)) {
      grandes++;
    } else if (/[0-9]/.test(letra)) {
      numeros++;
    } else {
      simbolos++;
    }
  }

  if (pequenas == 0 || grandes == 0 || numeros == 0 || simbolos == 0) {
    mensa.push(
      "Erro... senha deve possuir letras minúsculas, maiúsculas, números e símbolos"
    );
  }

  return mensa;
}

router.post("/", async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    res.status(400).json({ erro: "Informe nome, email e senha" });
    return;
  }

  const erros = validaSenha(senha);
  if (erros.length > 0) {
    res.status(400).json({ erro: erros.join("; ") });
    return;
  }

  const salt = bcrypt.genSaltSync(12);
  const hash = bcrypt.hashSync(senha, salt);

  try {
    const cliente = await prisma.cliente.create({
      data: { nome, email, senha: hash },
    });
    res.status(201).json(cliente);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  const mensaPadrao = "Login ou senha incorretos";

  if (!email || !senha) {
    res.status(400).json({ erro: mensaPadrao });
    return;
  }

  try {
    const cliente = await prisma.cliente.findUnique({
      where: { email },
    });

    if (cliente == null) {
      res.status(400).json({ erro: mensaPadrao });
      return;
    }

    if (bcrypt.compareSync(senha, cliente.senha)) {
      res.status(200).json({
        id: cliente.id,
        nome: cliente.nome,
        email: cliente.email,
      });
    } else {
      res.status(400).json({ erro: mensaPadrao });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const cliente = await prisma.cliente.findUnique({
      where: { id },
    });

    if (cliente == null) {
      res.status(400).json({ erro: "Cliente não encontrado" });
      return;
    } else {
      res.status(200).json({
        id: cliente.id,
        nome: cliente.nome,
        email: cliente.email,
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

async function emailRecuperacaoSenha(email: string, token: string) {
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.BREVO_USER,
      pass: process.env.BREVO_SENHA,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: 'pedrohenriquedoamaralsiqueira@gmail.com', // sender address
      to: email, // list of receivers
      subject: "Formulário", // Subject line
      text: "Recuperação de Senha", // plain text body
      html: `<h2>Sistema de Recuperação de Senha Nexus Gaming</h2>
            <p>Seu código de recuperação é : ${token}</p>
            <h3>Atenção: Não compartilhe este código com ninguém</h3>
            </br>
            <a href="http://localhost:3000/alterar">Página de Recuperação de senha</a>
            `, // html body
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log(error);
  }
}

router.put("/esqueceu/:email", async (req, res) => {
  const { email } = req.params;
  const { recuperacao } = req.body;

  try {
    const cliente = await prisma.cliente.findUnique({
      where: { email },
    });

    if (cliente == null) {
      res.status(400).json({ erro: "Cliente não encontrado" });
      return;
    }

    await prisma.cliente.update({
      where: { email },
      data: { recuperacao: recuperacao },
    });

    emailRecuperacaoSenha(email, recuperacao);

    res.status(200).json({ sucesso: "Token Ativado" });
  } catch (error) {
    res.status(400).json(error);
  }
})

router.put("/alterar", async (req, res) => {
  const { email, senha, recuperacao } = req.body;

  if (!email || !senha || !recuperacao) {
    res.status(400).json({ erro: "Informe email, senha e token" });
    return;
  }

  const erros = validaSenha(senha);
  if (erros.length > 0) {
    res.status(400).json({ erro: erros.join("; ") });
    return;
  }

  const salt = bcrypt.genSaltSync(12);
  const hash = bcrypt.hashSync(senha, salt);

  try {
    const cliente = await prisma.cliente.findUnique({
      where: { email },
    });

    if (cliente == null) {
      res.status(400).json({ erro: "Cliente não encontrado" });
      return;
    }

    if (cliente.recuperacao == recuperacao) {
      await prisma.cliente.update({
        where: { email },
        data: { senha: hash, recuperacao: null },
      });

      res.status(200).json({ sucesso: "Senha Alterada" });
    } else {
      res.status(400).json({ erro: "Token inválido" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
})

export default router;
