import Container from "@mui/material/Container";
import UserDatas from "../../UserDatas";
import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

// const empDatas = UserDatas;
// console.log(empDatas[0]);
//  empDatas[0]
const EmpDatas = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {UserDatas.map((item, index) => (
          <Grid
            xs={12}
            sm={6}
            md={3}
            sx={{ boxShadow: 5, borderRadius: 3 }}
            key={item.id}
          >
            <Card>
              <Box
                component="img"
                src={item.image}
                alt={item.name}
                sx={{
                  width: "100%",
                  height: 200,
                  objectFit: "cover",
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                }}
              />
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.email}
                </Typography>
                <Typography variant="h5" color="success">
                  {item.role}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default EmpDatas;
