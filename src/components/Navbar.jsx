import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Context } from "./CreateContext";



function Navbar() {
  const navigate=useNavigate();
  const location = useLocation();
  const {isLoggedIn,setIsLoggedIn}=useContext(Context)
  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    setIsLoggedIn(false); // Update state
    navigate('/login'); // Redirect to login page
  };
  return (
    <div>
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <Box>
          <AppBar className='pt-2' sx={{ position: "fixed" }}>
            <Toolbar sx={{ gap: 80 }}>
              <Button
                component={Link}
                to="/"
                variant="contained"
                color="warning"
              >
                Home
              </Button>
              <Typography variant="h6">Expense Tracker</Typography>
              {!isLoggedIn?
              (<Button component={Link} to="/login" variant="contained">
                Login
                </Button>):(<Button component={Link} to="/Dashboard" variant="contained" onClick={handleLogout}>
                Logout
                </Button>)}
            </Toolbar>
          </AppBar>
        </Box>
      )}
    </div>
  );
}

export default Navbar;
