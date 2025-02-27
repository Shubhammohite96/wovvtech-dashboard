import { AppBar, Button, Toolbar, Typography } from '@mui/material'

let Header = ()=>{
  return (
    <>
    <AppBar position="static">
        <Toolbar>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Wovvtech</Typography>
          <Button variant='contained' color='warning'>logout</Button>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header