import { Router } from "express"
import * as orderController from "../controllers/orderController.js"

const router = Router()

router.post("/", orderController.createOrder)
router.get("/", orderController.getAllOrders)
router.get("/:trackingCode", orderController.getOrderByTrackingCode)
router.patch("/:id/status", orderController.updateOrderStatus)
router.delete("/:id", orderController.deleteOrder)

export default router
