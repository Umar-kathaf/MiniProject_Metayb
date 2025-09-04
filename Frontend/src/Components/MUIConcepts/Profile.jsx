import { Card, CardContent, Avatar, Typography, Grid, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";

export default function ProfilePage() {
  // Sample user data (replace with API/userContext later)
  const user = {
    name: "Umar Kathab",
    email: "umar.kathab@example.com",
    role: "Software Developer",
    phone: "+91 9876543210",
    address: "Bangalore, India",
    avatar: "https://mui.com/static/images/avatar/1.jpg",
  };

  return (
    <Grid container justifyContent="center" sx={{ mt: 5 }}>
      <Grid item xs={12} md={6}>
        <Card sx={{ p: 3, borderRadius: "16px", boxShadow: 4 }}>
          <Grid container spacing={2} alignItems="center">
            {/* Profile Picture */}
            <Grid item xs={12} sm={4} textAlign="center">
              <Avatar
                src={user.avatar}
                alt={user.name}
                sx={{ width: 120, height: 120, margin: "0 auto" }}
              />
              <Typography variant="h6" sx={{ mt: 1 }}>
                {user.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.role}
              </Typography>
            </Grid>

            {/* Profile Info */}
            <Grid item xs={12} sm={8}>
              <CardContent>
                <Typography variant="subtitle1">
                  <strong>Email:</strong> {user.email}
                </Typography>
                <Typography variant="subtitle1">
                  <strong>Phone:</strong> {user.phone}
                </Typography>
                <Typography variant="subtitle1">
                  <strong>Address:</strong> {user.address}
                </Typography>
              </CardContent>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item>
                  <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    sx={{ textTransform: "none", borderRadius: "12px" }}
                  >
                    Edit Profile
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<LogoutIcon />}
                    sx={{ textTransform: "none", borderRadius: "12px" }}
                  >
                    Logout
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}
