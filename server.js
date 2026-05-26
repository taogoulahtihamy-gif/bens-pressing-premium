import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({
    message: "Ben's Pressing API running",
  });
});

app.post("/api/orders", async (req, res) => {
  try {
    const {
      fullName,
      phone,
      address,
      service,
      clothes,
      instructions,
      pickupDate,
      pickupTime,
      totalPrice,
    } = req.body;

    const trackingCode =
      "BEN-" + Math.floor(100000 + Math.random() * 900000);

    const order = await prisma.order.create({
      data: {
        fullName,
        phone,
        address,
        service,
        clothes,
        instructions,
        pickupDate,
        pickupTime,
        totalPrice,
        trackingCode,
      },
    });

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur serveur",
    });
  }
});

app.get("/api/orders", async (req, res) => {
  console.log("GET /api/orders called");
  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(orders);
  } catch (error) {
    console.error("GET /api/orders error:", error);
    res.status(500).json({
      error: "Erreur serveur",
    });
  }
});

app.get("/api/orders/:trackingCode", async (req, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: {
        trackingCode: req.params.trackingCode,
      },
    });

    if (!order) {
      return res.status(404).json({
        error: "Commande introuvable",
      });
    }

    res.json(order);
  } catch (error) {
    console.error("GET /api/orders/:trackingCode error:", error);
    res.status(500).json({
      error: "Erreur serveur",
    });
  }
});

app.patch("/api/orders/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const updatedOrder = await prisma.order.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        status,
      },
    });

    res.json(updatedOrder);
  } catch (error) {
    console.error("PATCH /api/orders/:id/status error:", error);
    res.status(500).json({
      error: "Erreur serveur",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});