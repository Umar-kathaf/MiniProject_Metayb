import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import React, { useState } from 'react'

const CounterApp = () => {
    const [count, setCount] = useState(0)

    function increament() {
        setCount(count+1)
    }
    function decreament(params) {
        setCount(count-1)
    }

    function reset() {
        setCount(0)
    }
  return (
    <Box sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #e0eafc, #cfdef3)",
        gap: 3,
        textAlign: "center"

    }}>
    <Typography variant='h3' sx={{fontWeight: "bold", color:"#333"}}>
        Counter App
    </Typography>
    
    <Button variant='contained' onClick={increament}>Increament</Button>
    <Typography>
        Counter {count}
    </Typography>
    <Button variant='contained' onClick={decreament}>Decreament</Button>
    <Button variant='contained' sx={{backgroundColor: "black", "&:hover": { backgroundColor: "#333" }}} onClick={reset}>Reset</Button>
    </Box>
  )
}

export default CounterApp