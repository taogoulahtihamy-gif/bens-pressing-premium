export default function errorHandler(err, _req, res, _next) {
  console.error("Erreur serveur:", err.message)
  res.status(500).json({ error: "Erreur interne du serveur." })
}
