import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';

let Header = ()=>{
  const navigate = useNavigate();
  const logout=()=>{
    localStorage.removeItem('token')
    navigate("/login");
  }
  return (
    <>
    <AppBar position="static">
        <Toolbar>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Wovvtech</Typography>
          <Button variant='contained' color='warning' onClick={logout}>logout</Button>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header