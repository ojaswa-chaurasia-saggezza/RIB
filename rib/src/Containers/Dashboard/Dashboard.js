import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import Toolbar from '@material-ui/core/Toolbar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// This below imports are for Routing perpose
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import CASA from '../../Components/CASA';

import AuthService from "../../Services/Auth.service";
import CustomerService from "../../Services/Customer.service";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
    },
    drawer: {
        [theme.breakpoints.up('md')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    title: {
        flexGrow: 1,
    },
    appBar: {
        [theme.breakpoints.up('md')]: {
            // width: `calc(100% - ${drawerWidth}px)`,
            zIndex: theme.zIndex.drawer + 1,
            width: `100%`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        width: '100%',
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    MenuItem: {
        fontSize: 14,
    }
}));

var AccordionStyle = withStyles({
    root: {
        margin: 0,
        boxShadow: "none",
        width: '100%',
        '& ListItemText': {
            color: '#ff0000',
            fontSize: 10,
        },
    },

})(Accordion);

function Dashboard(props) {

    const [Customer, setCustomer] = useState(undefined);
    const [ErrorMessage, setErrorMessage] = useState("Please Login first");

    useEffect(() => {
        const currentCustomer = AuthService.getCurrentUser();

        if (currentCustomer)
            CustomerService.getCustomerDetails(currentCustomer.username).then(
                (response) => {
                    setCustomer(response.data);
                    console.log(response.data);
                },
                (error) => {
                    const _content =
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString();
                    setCustomer(undefined);
                    setErrorMessage(_content);
                    console.log(_content);
                }
            );
        else
            setCustomer(undefined);

    }, []);


    const { window } = props;
    const classes = useStyles();

    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = () => { 
        AuthService.logout(); 
        handleClose(); 
        props.history.push("/")
    }

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                {['CASA', 'CREDIT CARD',].map((text, index) => (
                    <ListItem button component={Link} to={`/${text}`} key={text}>

                        <ListItemText primary={text} />
                    </ListItem>
                ))}
                <ListItem button key={'FUND TRANSFER'} style={{ padding: 0, }}>
                    <AccordionStyle>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography >FUND TRANSFER</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List>
                                <ListItem button component={Link} to='/Add Beneficiary'>
                                    <ListItemText primary={'Add Beneficiary'} />
                                </ListItem>

                                <ListItem button component={Link} to='/Edit Beneficiary'>
                                    <ListItemText primary={'Edit Beneficiary'} />
                                </ListItem>
                                <ListItem button component={Link} to='/Transfer within your accounts'>
                                    <ListItemText primary={'Transfer within your accounts'} />
                                </ListItem>
                                <ListItem button component={Link} to='/Transfer to within Bank Beneficiary'>
                                    <ListItemText primary={'Transfer to within Bank Beneficiary'} />
                                </ListItem>
                            </List>
                        </AccordionDetails>
                    </AccordionStyle>
                </ListItem>
                <ListItem button key={'BILL PAYMENT'} style={{ padding: 0, }}>
                    <AccordionStyle>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography >BILL PAYMENT</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List>
                                <ListItem button component={Link} to='/Add Biller'>
                                    <ListItemText primary={'Add Biller'} />
                                </ListItem>
                                <ListItem button component={Link} to='/Edit Biller'>
                                    <ListItemText primary={'Edit Biller'} />
                                </ListItem>
                                <ListItem button component={Link} to='/Pay'>
                                    <ListItemText primary={'Pay'} />
                                </ListItem>
                            </List>

                        </AccordionDetails>
                    </AccordionStyle>
                </ListItem>
                <ListItem button key={'SERVICE REQUEST'} style={{ padding: 0, }}>
                    <AccordionStyle>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography >SERVICE REQUEST</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List>
                                <ListItem button component={Link} to='/Check(Cheque) Order'>
                                    <ListItemText primary={'Check(Cheque) Order'} />
                                </ListItem>
                                <ListItem button component={Link} to='/Credit Limit Increase'>
                                    <ListItemText primary={'Credit Limit Increase'} />
                                </ListItem>
                                <ListItem button component={Link} to='/Reset Password'>
                                    <ListItemText primary={'Reset Password'} />
                                </ListItem>
                            </List>
                        </AccordionDetails>
                    </AccordionStyle>
                </ListItem>
                <ListItem button key={'PRODUCT OPENING'} style={{ padding: 0, }}>
                    <AccordionStyle>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography >PRODUCT OPENING</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List>
                                <ListItem button component={Link} to='/Edit Beneficiary'>
                                    <ListItemText primary={'Open New Casa Account'} />
                                </ListItem>
                                <ListItem button component={Link} to='/Edit Beneficiary'>
                                    <ListItemText primary={'Open New Credit Card'} />
                                </ListItem>

                            </List>
                        </AccordionDetails>
                    </AccordionStyle>
                </ListItem>

            </List>
            <Divider />

        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <Router>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap className={classes.title}>
                            Demo Bank
                </Typography>
                        <Button variant="contained" color="primary" disableElevation onClick={handleMenu}>
                            Welcome Thiru
                </Button>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                            TransitionComponent={Fade}
                        >
                            <MenuItem onClick={handleClose} className={classes.MenuItem}>
                                <ListItemIcon>
                                    <PersonIcon fontSize="small" />
                                </ListItemIcon>Thirumurugan Thiyagarajan</MenuItem>
                            <MenuItem onClick={handleClose} className={classes.MenuItem}>
                                <ListItemIcon>
                                    <ScheduleIcon fontSize="small" />
                                </ListItemIcon>Last Login : 12/01/2021</MenuItem>
                            <MenuItem onClick={handleLogOut} className={classes.MenuItem}>
                                <ListItemIcon>
                                    <ExitToAppIcon fontSize="small" />
                                </ListItemIcon>
                             Logout</MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer} aria-label="mailbox folders">
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden smDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>

                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {
                        Customer ?
                            (<Switch>
                                <Route path='/CASA' component={CASA}></Route>

                            </Switch>) :

                            (<div>{ErrorMessage}</div>)
                    }

                </main>
            </Router>
        </div>
    );
}

Dashboard.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Dashboard;
