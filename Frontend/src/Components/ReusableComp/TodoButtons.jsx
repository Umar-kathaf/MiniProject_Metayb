import { Button } from '@mui/material'
import React from 'react'

const TodoButtons = ({children, props, onClick, color="primary", variant="contained", sx={}, ...rest}) => {
  return (
    <Button
    onClick={onClick}
    variant={variant}
    {...props}
    sx={{
        borderRadius:"8px",
        textTransform:"capitalize",
        fontWeight: "bold",
        padding:"6px 16px",
        backgroundColor:"red",
        ...sx
    }}
    {...rest}   
    color={color}>
        {children}
    </Button>
  )
}

export default TodoButtons