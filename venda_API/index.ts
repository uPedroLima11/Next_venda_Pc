import express from 'express'
import marcasRoutes from './routes/marcas'
import produtosRoutes from './routes/produtos'
import cors from 'cors'
const app = express()
const port = 3004

app.use(express.json())
app.use(cors())
app.use("/marcas", marcasRoutes)
app.use("/produtos", produtosRoutes)

app.get('/', (req, res) => {
  res.send('API: Sistema de vendas de produtos para computadores')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})