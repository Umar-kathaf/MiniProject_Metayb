import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useEffect, useState } from "react";
import { useCart } from "../Context/CreateContext";
import { getBikes } from "../../API/BikesApi";
import bikeImages from "../BikeImages";
import useDebounce from "../Hooks/useDebounce";

const GreetingProps = ({}) => {
  const { addToCart,cartItems } = useCart();
  const [searchQuery, setSearchQuery] = useState();
  const [addedItems, setAddeditems] = useState([]);
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceFilter, setPriceFilter] = useState("");
  const debouncedSearchTerm = useDebounce(searchQuery, 1000);

  // API Call for serach Bikes and prices
  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await getBikes(debouncedSearchTerm, priceFilter);
        setBikes(response.data.bikeLists);
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBikes();
  }, [debouncedSearchTerm, priceFilter]);

  //Add to cart handler
  const handleAddedToCart = (bike) => {
    addToCart(bike.BikeId);
    setAddeditems((prev) => [...prev, bike.BikeId]);
  };

  return (
    <>
      <Backdrop
        open={loading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          // justifyContent: "space-between",
          mb: 3,
          mx: 3,
          flexDirection: { xs: "column", sm: "column", md: "row" },
          gap: 5,
        }}
      >
        {/* <Typography variant="h4" fontWeight="bold">
          Bike Collections
        </Typography> */}

        {/* SearchFunction */}
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search bikes..."
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            width: 250,
            backgroundColor: "#fff",
            borderRadius: 2,
            border: "2px solid #333",
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                border: "none",
              },
          }}
        />

        {/* Price Filter */}
        <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Price</InputLabel>
          <Select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            label="Price"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="low">Below ₹1,00,000</MenuItem>
            <MenuItem value="mid">₹1,00,000 - ₹2,00,000</MenuItem>
            <MenuItem value="high">Above ₹2,00,000</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={2} sx={{ alignItems: "center", gap: 4 }}>
        {bikes.length > 0 ? (
          bikes.map((bike, index) => (
            <Grid xs={12} sm={6} md={4} key={bike.BikeId}>
              <Card
                sx={{
                  maxWidth: 345,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: 5,
                }}
              >
                <CardMedia
                  component="img"
                  alt={bike.BikeName}
                  // height="100"
                  image={bikeImages[bike.BikeId]}
                  sx={{ objectFit: "cover", width: "250px" }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {bike.BikeName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Model: {bike.Model}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: ₹ {bike.Price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Release Year: {bike.ReleaseYear}
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    p: 2,
                    gap: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    startIcon={<AddShoppingCartIcon />}
                    sx={{
                      backgroundColor: "#fff",
                      color: "#000",
                      flex: 1,
                      minWidth: "140px",
                      fontSize: "13px",
                      textTransform: "none",
                    }}
                    onClick={() => handleAddedToCart(bike)}
                    disabled={addedItems.includes(bike.BikeId)}
                  >
                    {addedItems.includes(bike.BikeId)
                      ? "Added to cart"
                      : "Add to cart"}
                  </Button>
                  <Button variant="contained" sx={{ backgroundColor: "#000" }}>
                    Buy now
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" color="text.secondary" sx={{ mt: 4 }}>
            No bikes found
          </Typography>
        )}
      </Grid>
    </>
  );
};

export default GreetingProps;
