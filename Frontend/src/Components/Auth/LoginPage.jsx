import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import bgImage from "../../assets/Login Bike Image.png";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../API/UserAPI";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({ Email: "", Password: "" });
  const navigate = useNavigate();

  const hangleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(loginData);

      toast.success("Login successful ✅");
      console.log("Login response:", response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user.UserId);

      navigate("/greet");
    } catch (error) {
      toast.error(error.response?.data?.Error);
      console.error(error);
    }
  };
  const handleNavigate = () => {
    navigate("/signup");
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", alignItems: "center" }}>
      <Container maxWidth="md">
        <Paper
          elevation={6}
          sx={{
            display: "flex",
            // overflow: "hidden",
            height: { xs: "auto", md: "80vh" },
          }}
        >
          <Grid
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f4f4f4",
            }}
          >
            <img
              src={bgImage}
              alt="office"
              style={{ width: "100%", height: "100%", objectFit: "fill" }}
            />
          </Grid>
          <Grid
            xs={12}
            md={6}
            sx={{
              // width: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "25px",
              p: 4,
            }}
          >
            <Box sx={{ width: "100%", maxWidth: 500 }}>
              <Typography variant="h5" align="center" gutterBottom>
                Login
              </Typography>
              <Box
                component="form"
                onSubmit={hangleLogin}
                sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
              >
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={loginData.Email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, Email: e.target.value })
                  }
                />

                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  value={loginData.Password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, Password: e.target.value })
                  }
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />

                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{
                    mt: 1,
                    background: "linear-gradient(45deg, #333 30%, #000 90%)",
                  }}
                >
                  Login
                </Button>
                <Grid container justifyContent={"center"}>
                  <Grid sx={{ cursor: "pointer" }}>
                    <Link onClick={() => handleNavigate()}>
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Paper>
      </Container>
      <ToastContainer autoClose={2000} />
    </Box>
  );
};

export default LoginPage;
