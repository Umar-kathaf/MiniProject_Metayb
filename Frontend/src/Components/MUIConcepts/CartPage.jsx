import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  CardMedia,
} from "@mui/material";
import { useCart } from "../Context/CreateContext";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import bikeImages from "../BikeImages.js";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { getUser } from "../../API/UserAPI.js";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [amount, setAmount] = useState(null)
  const subTotal = cartItems.reduce(
    (sum, item) => sum + item.BikeData.Price * (item.quantity || 1),
    0
  );
  const shipping = 837;
  const grandTotal = subTotal + shipping;

  const handleUpdateQuantity = async (cartId, newQuantity) => {
    if (newQuantity < 1) return;
    console.log("Quantity update", newQuantity);

    try {
      await updateQuantity(cartId, newQuantity);
      toast.success("Quantity updated");
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity");
    }
  };

  const handleRemove = async (cartId) => {
    try {
      await removeFromCart(cartId);
      toast.error("Remove form cart");
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decode = jwtDecode(token)
      const id = decode.id
      getUser(id).then((res)=> {
        const {balance} = res.data
        setAmount(balance)
      })
    }
  })

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{display:"flex", justifyContent:"space-between"}}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Cart Items
      </Typography>
        <Typography sx={{mt:2}}>Account Balance:{amount}</Typography>
      </Box>
      {cartItems.length === 0 ? (
        <Typography>Your Cart is Empty</Typography>
      ) : (
        <>
          {/* Cart Table */}
          <TableContainer component={Paper}>
            <Table>
              {/* Header */}
              <TableHead sx={{ bgcolor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell align="center">
                    <b>Image</b>
                  </TableCell>
                  <TableCell>
                    <b>Bike Data</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Price</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Quantity</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Total</b>
                  </TableCell>
                </TableRow>
              </TableHead>

              {/* Body */}
              <TableBody>
                {cartItems.map((bike) => (
                  <TableRow key={bike.cartId}>
                    {/* Image */}
                    <TableCell>
                      <CardMedia
                        component="img"
                        image={bikeImages[bike.BikeData.BikeId]}
                        alt={bike.BikeData.BikeName}
                        style={{
                          maxWidth: "150px",
                          margin: "0 auto",
                          objectFit: "cover",
                        }}
                      />
                    </TableCell>

                    {/* Bike Info */}
                    <TableCell>
                      <Typography fontWeight="bold">
                        {bike.BikeData?.BikeName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Model: {bike.BikeData.Model}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Release Year: {bike.BikeData.ReleaseYear}
                      </Typography>
                      <Button
                        color="error"
                        size="small"
                        sx={{ mt: 1, textTransform: "none" }}
                        onClick={() => handleRemove(bike.cartId)}
                      >
                        Remove
                      </Button>
                    </TableCell>

                    {/* Price */}
                    <TableCell align="center">
                      ₹{bike.BikeData.Price.toLocaleString("en-IN")}
                    </TableCell>

                    {/* Quantity */}
                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleUpdateQuantity(
                              bike.cartId,
                              Math.max((bike.quantity || 1) - 1, 1)
                            )
                          }
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography fontWeight="bold">
                          {bike.quantity || 1}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleUpdateQuantity(
                              bike.cartId,
                              (bike.quantity || 1) + 1
                            )
                          }
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                    </TableCell>

                    {/* Total */}
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      ₹
                      {(bike.BikeData.Price * (bike.quantity || 1)).toLocaleString("en-IN")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Coupon + Summary Section */}
          <Grid
            container
            spacing={2}
            sx={{ mt: 3}}
          >
            {/* Coupon */}
            {/* <Grid item xs={12} md={6}>
              <TextField
                label="Coupon Code"
                variant="outlined"
                fullWidth
                size="small"
              />
              <Button variant="contained" sx={{ mt: 2 }}>
                Apply Promo Code
              </Button>
            </Grid> */}

            {/* Summary */}
            <Grid sx={{ width: "50%", ml:"auto" }}>
              <Box sx={{ border: "1px solid #ddd", p: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography>Subtotal:</Typography>
                  <Typography>₹{subTotal.toLocaleString("en-IN")}</Typography>
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography>Shipping:</Typography>
                  <Typography>₹{shipping.toLocaleString("en-IN")}</Typography>
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  <Typography fontWeight="bold">Grand Total:</Typography>
                  <Typography fontWeight="bold">
                    ₹{grandTotal.toLocaleString("en-IN")}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    bgcolor: "#000",
                    color: "#fff",
                    textTransform: "none",
                    mt: 2,
                    "&:hover": { bgcolor: "#333" },
                  }}
                >
                  Buy now
                </Button>
              </Box>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default CartPage;
