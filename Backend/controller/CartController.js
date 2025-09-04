import Cart from "../models/CartModels.js";
import BikeDatas from "../models/BikesModel.js";
import UserDatas from "../models/UserModel.js";

// addToCart Function
export const addToCart = async (req, res) => {
  try {
    const { bikeId, quantity } = req.body;
    // console.log(req.body);

    const userId = req.user.id;
    // console.log("UserId from token", userId);

    let user = await UserDatas.findOne({ where: { UserId: userId } });
    // console.log("From UserDatas==>", user);
    if (!user) {
      return res.status(404).json({ Error: "User not found" });
    }

    // console.log("CartItems == ", { userId: user.UserId, bikeId: bikeId.BikeId});

    let cartItems = await Cart.findOne({
      where: { userId: user.UserId, bikeId: bikeId },
    });

    if (cartItems) {
      cartItems.quantity += quantity || 1;
      await cartItems.save();
    } else {
      cartItems = await Cart.create({
        userId: user.UserId,
        bikeId: bikeId,
        quantity: quantity || 1,
      });
    }

    const cartWithBike = await Cart.findOne({
      where: { cartId: cartItems.cartId },
      include: [
        {
          model: BikeDatas,
          attributes: ["BikeId", "BikeName", "Model", "Price", "ReleaseYear"],
        },
      ],
    });

    return res.json({ message: "Added to cart", cartItems: cartWithBike });
  } catch (error) {
    console.error("Add to cart Error: ", error);
    res.status(500).json({
      success: false,
      message: "Error adding to cart",
      Error: error.message,
    });
  }
};

// get cart items
export const getCartItems = async (req, res) => {
  try {
    const userId = req.query;

    const numUserId = userId.userId;

    const cartItems = await Cart.findAll({
      where: { userId: numUserId },
      include: [
        {
          model: BikeDatas,
          attributes: ["BikeId", "BikeName", "Model", "Price", "ReleaseYear"],
        },
      ],
    });

    return res.json({ cartItems });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching cart",
      Error: error.message,
    });
  }
};

// update Cart quantity
export const updateQuantity = async (req, res) => {
  try {
    const { cartId, quantity } = req.body;

    const cartItem = await Cart.findByPk(cartId);
    if (!cartItem) {
      return res
        .status(404)
        .json({ success: false, Error: "Cart item not found" });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    return res.json({ message: "Quantity updated", cartItem });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error updating quantity", error });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    await Cart.destroy({ where: { cartId: cartId } });
    return res.json({ message: "Item removed from cart" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error removing item", Error: error.message });
  }
};
