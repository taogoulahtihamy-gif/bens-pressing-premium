import * as orderService from "../services/orderService.js"

export async function createOrder(req, res, next) {
  try {
    const { fullName, phone, address, service, clothes, instructions, pickupDate, pickupTime, totalPrice } = req.body
    if (!fullName || !phone || !address || !service || !clothes || !pickupDate || !pickupTime || totalPrice == null) {
      return res.status(400).json({ error: "Tous les champs obligatoires doivent être remplis." })
    }
    const order = await orderService.createOrder({
      fullName, phone, address, service, clothes, instructions, pickupDate, pickupTime, totalPrice: parseInt(totalPrice),
    })
    res.status(201).json(order)
  } catch (err) {
    next(err)
  }
}

export async function getAllOrders(req, res, next) {
  try {
    const orders = await orderService.getAllOrders()
    res.json(orders)
  } catch (err) {
    next(err)
  }
}

export async function getOrderByTrackingCode(req, res, next) {
  try {
    const { trackingCode } = req.params
    const order = await orderService.getOrderByTrackingCode(trackingCode)
    if (!order) return res.status(404).json({ error: "Commande introuvable." })
    res.json(order)
  } catch (err) {
    next(err)
  }
}

export async function updateOrderStatus(req, res, next) {
  try {
    const { id } = req.params
    const { status } = req.body
    const validStatuses = ["pending", "collected", "cleaning", "ironing", "delivery", "completed"]
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Statut invalide." })
    }
    const order = await orderService.updateOrderStatus(parseInt(id), status)
    if (!order) return res.status(404).json({ error: "Commande introuvable." })
    res.json(order)
  } catch (err) {
    next(err)
  }
}
