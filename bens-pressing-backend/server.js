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
  res.json({ message: "Ben's Pressing API running" });
});

// CREER UNE RESERVATION
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
      "BP-" + Math.floor(100000 + Math.random() * 900000);

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
        totalPrice: Number(totalPrice),
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

// RECUPERER LES RESERVATIONS
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      error: "Erreur serveur",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});