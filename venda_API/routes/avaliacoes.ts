import { PrismaClient } from "@prisma/client"
import { Router } from "express"

// const prisma = new PrismaClient()
const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
})

prisma.$on('query', (e) => {
  console.log('Query: ' + e.query)
  console.log('Params: ' + e.params)
  console.log('Duration: ' + e.duration + 'ms')
})

const router = Router()

router.get("/", async (req, res) => {
  try {
    const avaliacoes = await prisma.avaliacoes.findMany()
    res.status(200).json(avaliacoes)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post("/", async (req, res) => {
  const { nota, descricao, produtoId, clienteid } = req.body

  if (!nota || !descricao || !produtoId || !clienteid) {
    res.status(400).json({ "erro": "Informe o nome" })
    return
  }

  try {
    const avaliacoes = await prisma.avaliacoes.create({
      data: { nota, descricao, produtoId, clienteid }
    })
    res.status(201).json(avaliacoes)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const avaliacoes = await prisma.avaliacoes.delete({
      where: { id: Number(id) }
    })
    res.status(200).json(avaliacoes)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { nota, descricao, produtoId, clienteid } = req.body

  if (!nota || !descricao || !produtoId || !clienteid) {
    res.status(400).json({ "erro": "Informe nome, endereco, telefone e datanasc" })
    return
  }

  try {
    const avaliacoes = await prisma.avaliacoes.update({
      where: { id: Number(id) },
      data: { nota, descricao, produtoId, clienteid }
    })
    res.status(200).json(avaliacoes)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get("/:clienteid", async (req, res) => {
  const { clienteid } = req.params
  try {
    const avaliacoes = await prisma.avaliacoes.findMany({
      where: { clienteid },
      include: {
        produto: true
      }
    })
    res.status(200).json(avaliacoes)
  } catch (error) {
    res.status(400).json(error)
  }
})
export default router