import { PrismaClient, TipoProduto } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient();
const router = Router();

router.get("/", async (req, res) => {
  try {
    const { tipo } = req.query;

    if (tipo && !Object.values(TipoProduto).includes(tipo as TipoProduto)) {
      return res.status(400).json({ error: "Tipo inválido" });
    }

    const produtos = await prisma.produto.findMany({
      where: tipo ? { tipo: tipo as TipoProduto } : {},
      include: { marca: true },
    });

    const produtosCorrigidos = produtos.map((produto) => ({
      ...produto,
      preco: Number(produto.preco),
    }));

    res.status(200).json(produtosCorrigidos);
  } catch (error) {
    res.status(400).json(error);
  }
});


router.post("/", async (req, res) => {
  const { modelo, preco, foto, configuracao, tipo, cor, adicional, marcaId } = req.body;

  if (!modelo || !preco || !foto || !configuracao || !tipo || !marcaId) {
    res.status(400).json({
      erro: "Informe modelo, preco, foto, configuracao, tipo, cor, adicional e marcaId",
    });
    return;
  }

  try {
    const produto = await prisma.produto.create({
      data: {
        modelo,
        preco,
        foto,
        configuracao,
        tipo,
        cor,
        adicional,
        marcaId,
      },
    });
    res.status(201).json(produto);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const produto = await prisma.produto.delete({
      where: { id: Number(id) },
    });
    res.status(200).json(produto);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { modelo, preco, foto, configuracao, tipo, marcaId } = req.body;

  if (!modelo || !preco || !foto || !configuracao || !tipo || !marcaId) {
    res.status(400).json({
      erro: "Informe modelo, preco, foto, configuracao, tipo e marcaId",
    });
    return;
  }

  try {
    const produto = await prisma.produto.update({
      where: { id: Number(id) },
      data: { modelo, preco, foto, configuracao, tipo, marcaId },
    });
    res.status(200).json(produto);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/avaliacoes", async (req, res) => {
  try {
    const avaliacoes = await prisma.produto.findMany({
      include: {
        avaliacao: true,
      },
    });
    res.status(200).json(avaliacoes);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/pesquisa/:termo", async (req, res) => {
  const { termo } = req.params;

  const termoNumero = Number(termo);

  if (isNaN(termoNumero)) {
    try {
      const produtos = await prisma.produto.findMany({
        include: {
          marca: true,
        },
        where: {
          OR: [{ modelo: { contains: termo } }, { marca: { nome: termo } }],
        },
      });
      res.status(200).json(produtos);
    } catch (error) {
      res.status(400).json(error);
    }
  } else {
    try {
      const produtos = await prisma.produto.findMany({
        include: {
          marca: true,
        },
        where: {
          OR: [{ preco: termoNumero }],
        },
      });
      res.status(200).json(produtos);
    } catch (error) {
      res.status(400).json(error);
    }
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const produto = await prisma.produto.findUnique({
      where: { id: Number(id) },
      include: {
        marca: true,
      },
    });
    res.status(200).json(produto);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
