import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

function generateTrackingCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let code = "BP-"
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

export async function createOrder(data) {
  const trackingCode = generateTrackingCode()
  const order = await prisma.order.create({
    data: { ...data, trackingCode },
  })
  return order
}

export async function getAllOrders() {
  return await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  })
}

export async function getOrderByTrackingCode(trackingCode) {
  return await prisma.order.findUnique({
    where: { trackingCode },
  })
}

export async function updateOrderStatus(id, status) {
  return await prisma.order.update({
    where: { id },
    data: { status },
  })
}
