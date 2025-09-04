import express from 'express'
import verifyToken from '../Middleware/authMiddleware.js'
import { addToCart, getCartItems, removeFromCart, updateQuantity } from '../controller/CartCOntroller.js'

const router = express.Router()

router.post("/addcart",verifyToken,addToCart);
router.get("/getcart",verifyToken,getCartItems);
router.put("/updatequant",verifyToken, updateQuantity)
router.delete("/deletecart/:cartId", verifyToken, removeFromCart)

export default router;