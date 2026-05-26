import express from "express"
import cors from "cors"
import orderRoutes from "./routes/orderRoutes.js"
import errorHandler from "./middleware/errorHandler.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/orders", orderRoutes)

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "Ben's Pressing API opérationnelle" })
})

app.use(errorHandler)

export default app
