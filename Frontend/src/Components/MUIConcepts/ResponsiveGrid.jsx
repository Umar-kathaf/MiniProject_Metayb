import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import React from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const ResponsiveGrid = () => {
  return (
    <Grid container spacing={2} sx={{p:3}}>
        <Grid xs={12} sm={4}>
            <Paper sx={{p:3, textAlign:"center"}} elevation={10}>
                <HomeIcon sx={{fontSize:50, color: "#068e26"}}/>
                <Typography variant='h6' mt={1}>
                    Home
                </Typography>
                <Typography variant='body2' color='text.secondary' mb={2}>
                    Go to home page
                </Typography>
                <Button variant='contained' size='small' sx={{backgroundColor:'#068e26'}}>
                    Visit
                </Button>
            </Paper>
        </Grid>
        <Grid xs={12} sm={4}>
            <Paper sx={{p:3, textAlign:"center"}} elevation={10}>
                <InfoIcon sx={{fontSize:50, color: "#df5055"}}/>
                <Typography variant='h6' mt={1}>
                    About
                </Typography>
                <Typography variant='body2' color='text.secondary' mb={2}>
                    Learn more about us
                </Typography>
                <Button variant='contained' size='small' sx={{backgroundColor:'#df5055'}}>
                    Read More
                </Button>
            </Paper>
        </Grid>
        <Grid xs={12} sm={4}>
            <Paper sx={{p:3, textAlign:"center"}} elevation={10}>
                <ContactMailIcon sx={{fontSize:50, color: "black"}}/>
                <Typography variant='h6' mt={1}>
                    Contact
                </Typography>
                <Typography variant='body2' color='text.secondary' mb={2}>
                    Get in touch with us
                </Typography>
                <Button variant='contained' size='small' sx={{backgroundColor: "black"}}>
                    Contact
                </Button>
            </Paper>
        </Grid>
    </Grid>
    )
}

export default ResponsiveGrid