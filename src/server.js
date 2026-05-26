import "dotenv/config"
import app from "./app.js"

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`🚀 Ben's Pressing API démarrée sur le port ${PORT}`)
})
