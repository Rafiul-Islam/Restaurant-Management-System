import React, {Component} from 'react';
import {Link} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";

class Routers extends Component {
    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" >
                        Hotel Management
                    </Typography>
                    <Button variant='contained' color="secondary" className='ml-auto'>
                        <Link style={{textDecoration: 'none', color: 'white'}} to="/">Product</Link>
                    </Button>
                    <Button variant='contained' color="secondary" className='mx-4'>
                        <Link style={{textDecoration: 'none', color: 'white'}} to="/sell">Sell Info</Link>
                    </Button>
                </Toolbar>
            </AppBar>
        );
    }
}

export default Routers;
