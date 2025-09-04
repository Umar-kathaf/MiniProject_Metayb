import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import MobileScreenShareIcon from "@mui/icons-material/MobileScreenShare";
import KeyIcon from "@mui/icons-material/Key";
import VpnKeyOffIcon from "@mui/icons-material/VpnKeyOff";
import { Button, InputAdornment, Paper, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUser } from "../../API/UserAPI";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Mobile: "",
    Password: "",
    ConfirmPassword: "",
  });
  const [error, setError] = useState({});

  //validation
  const validate = () => {
    let temp = {};
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    temp.FirstName = formData.FirstName ? "" : "First name is required";
    temp.LastName = formData.LastName ? "" : "Last name is required";
    temp.Email = regex.test(formData.Email) ? "" : "Email is not valid";
    temp.Mobile =
      formData.Mobile.length === 10 ? "" : "Mobile no must be 10 digits";
    temp.Password =
      formData.Password.length > 8 ? "" : "Password must be 8+ chars";
    temp.ConfirmPassword =
      formData.ConfirmPassword === formData.Password
        ? ""
        : "Password do not match";
    setError(temp);

    return Object.values(temp).every((val) => val === "");
  };

  const handleSumbit = async (event) => {
    event.preventDefault();
    try {
      if (validate()) {
        const response = await createUser(formData);
        toast.success("SignUp Successfully 🚀");
        console.log(formData);

        console.log("User Created", response.data)
      }
      setFormData({
        FirstName: "",
        LastName: "",
        Email: "",
        Mobile: "",
        Password: "",
        ConfirmPassword: "",
      });
    } catch (error) {
      console.error("Error response:", error);
    }
  };
  return (
    <Box
      component="form"
      onSubmit={handleSumbit}
      sx={{
        flexFlow: 1,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg,#333,#000)",
        p: 3,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 600,
          margin: "auto",
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h5"
          align="center"
          marginBottom={5}
          fontWeight="bold"
        >
          Sign Up
        </Typography>

        <Grid container spacing={6} sx={{ marginLeft: "30px" }}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="FirstName"
              label="First Name"
              placeholder="Enter first name"
              value={formData.FirstName}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              error={!!error.FirstName}
              helperText={error.FirstName}
              //   multiline
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <DriveFileRenameOutlineIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="LastName"
              label="Last Name"
              placeholder="Enter last name"
              value={formData.LastName}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              error={!!error.lastName}
              helperText={error.lastName}
              //   multiline
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <DriveFileRenameOutlineIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="Email"
              label="Email"
              placeholder="Enter Email"
              value={formData.Email}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              error={!!error.Email}
              helperText={error.Email}
              //   multiline
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <AlternateEmailIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="Mobile"
              label="Mobile No"
              placeholder="Enter mobile number"
              value={formData.Mobile}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              error={!!error.Mobile}
              helperText={error.Mobile}
              //   multiline
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <MobileScreenShareIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="password"
              name="Password"
              label="Password"
              placeholder="Enter Password"
              value={formData.Password}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              error={!!error.Password}
              helperText={error.Password}
              //   multiline
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <KeyIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="password"
              name="ConfirmPassword"
              label="Confirm Password"
              placeholder="Enter confirm password"
              value={formData.ConfirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              error={!!error.ConfirmPassword}
              helperText={error.ConfirmPassword}
              //   multiline
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <VpnKeyOffIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                py: 1.2,
                fontWeight: "bold",
                fontSize: "1rem",
                width: "500px",
                marginLeft: "15px",
                background: "linear-gradient(135deg,#333,#000)",
              }}
            >
              SignUp
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <ToastContainer autoClose={2000} />
    </Box>
  );
};

export default SignUpForm;
