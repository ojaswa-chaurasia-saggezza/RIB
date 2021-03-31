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
import CreditCard from "../../Components/CreditCard";
import AddBiller from '../../Components/AddBiller';
import EditBiller from '../../Components/EditBiller';
import Pay from '../../Components/Pay';
import FTWithinBankAccount from '../../Components/FTWithinBankAccount';
import FTWithinBankBeneficiary from '../../Components/FTWithinBankBeneficiary';
import ChequeRequest from '../../Components/ChequeRequest';
import ViewExistingChequeRequest from '../../Components/ViewExistingChequeRequest';
import CreditLimitIncrease from '../../Components/CreditLimitIncrease';
import ResetPassword from '../../Components/ResetPassword';
import EditBeneficiary from '../../Components/EditBeneficiary';
import AddBeneficiary from '../../Components/AddBeneficiary';
import CardType from '../../Components/CardType';
import CasaType from '../../Components/CasaType';


import AuthService from "../../Services/Auth.service";
import CustomerService from "../../Services/Customer.service";


import { Grid } from '@material-ui/core';

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
    lastLogin: {
        fontSize: 10,
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
    },
    activeAccordion: {
        backgroundColor: theme.palette.action.selected,
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

    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };


    const [Customer, setCustomer] = useState({});
    const [ErrorMessage, setErrorMessage] = useState("Please Login first");

    function convertTZ(date, tzString) {
        return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", { timeZone: tzString }));
    }

    useEffect(() => {
        const currentCustomer = AuthService.getCurrentUser();

        if (currentCustomer)
            CustomerService.getCustomerDetails().then(
                (response) => {
                    if (response.data)
                        setCustomer(response.data);
                    console.log(response.data);
                },
                (error) => {
                    const _content =
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString();
                    setCustomer({});
                    setErrorMessage("Your session has expired please login again");
                    console.log(_content);
                }
            );
        else
            setCustomer({});

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
                    <ListItem selected={selectedIndex === index} button component={Link} to={`/Dashboard/${text}`} key={text} onClick={(e) => handleListItemClick(e, index)}>

                        <ListItemText primary={text} />
                    </ListItem>
                ))}
                <ListItem button key={'FUND TRANSFER'} style={{ padding: 0, }}>
                    <AccordionStyle >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className={[2, 3, 4, 5].includes(selectedIndex) ? classes.activeAccordion : null}
                        >
                            <Typography >FUND TRANSFER</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List>
                                <ListItem selected={selectedIndex === 2} button component={Link} to='/Dashboard/AddBeneficiary' onClick={(e) => handleListItemClick(e, 2)}>
                                    <ListItemText primary={'Add Beneficiary'} />
                                </ListItem>

                                <ListItem selected={selectedIndex === 3} button component={Link} to='/Dashboard/EditBeneficiary' onClick={(e) => handleListItemClick(e, 3)}>
                                    <ListItemText primary={'Edit Beneficiary'} />
                                </ListItem>
                                <ListItem selected={selectedIndex === 4} button component={Link} to='/Dashboard/FTWithinBankAccount' onClick={(e) => handleListItemClick(e, 4)}>
                                    <ListItemText primary={'Transfer within your accounts'} />
                                </ListItem>
                                <ListItem selected={selectedIndex === 5} button component={Link} to='/Dashboard/FTWithinBankBeneficiary' onClick={(e) => handleListItemClick(e, 5)}>
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
                            className={[6, 7, 8].includes(selectedIndex) ? classes.activeAccordion : null}
                        >
                            <Typography >BILL PAYMENT</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List>
                                <ListItem selected={selectedIndex === 6} button component={Link} to='/Dashboard/AddBiller' onClick={(e) => handleListItemClick(e, 6)}>
                                    <ListItemText primary={'Add Biller'} />
                                </ListItem>
                                <ListItem selected={selectedIndex === 7} button component={Link} to='/Dashboard/EditBiller' onClick={(e) => handleListItemClick(e, 7)}>
                                    <ListItemText primary={'Edit Biller'} />
                                </ListItem>
                                <ListItem selected={selectedIndex === 8} button component={Link} to='/Dashboard/Pay' onClick={(e) => handleListItemClick(e, 8)}>
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
                            className={[9, 10, 11, 12].includes(selectedIndex) ? classes.activeAccordion : null}
                        >
                            <Typography >SERVICE REQUEST</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List>
                                <ListItem selected={selectedIndex === 9} button component={Link} to='/Dashboard/ChequeRequest' onClick={(e) => handleListItemClick(e, 9)}>
                                    <ListItemText primary={'Check(Cheque) Order'} />
                                </ListItem>
                                <ListItem selected={selectedIndex === 10} button component={Link} to='/Dashboard/ViewExistingChequeRequest' onClick={(e) => handleListItemClick(e, 10)}>
                                    <ListItemText primary={'View Existing'} />
                                </ListItem>
                                <ListItem selected={selectedIndex === 11} button component={Link} to='/Dashboard/CreditLimitIncrease' onClick={(e) => handleListItemClick(e, 11)}>
                                    <ListItemText primary={'Credit Limit Increase'} />
                                </ListItem>
                                <ListItem selected={selectedIndex === 12} button component={Link} to='/Dashboard/ResetPassword' onClick={(e) => handleListItemClick(e, 12)}>
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
                            className={[13, 14].includes(selectedIndex) ? classes.activeAccordion : null}
                        >
                            <Typography >PRODUCT OPENING</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List>
                                <ListItem selected={selectedIndex === 13} button component={Link} to='/DashBoard/CasaType' onClick={(e) => handleListItemClick(e, 13)}>
                                    <ListItemText primary={'Open New Casa Account'} />
                                </ListItem>
                                <ListItem selected={selectedIndex === 14} button component={Link} to='/Dashboard/CardType' onClick={(e) => handleListItemClick(e, 14)}>
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
                        <Grid container item xs={2}>
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" disableElevation onClick={handleMenu}>
                                    Welcome {Customer.name ? Customer.name.split(" ")[0] : ""}
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="caption" noWrap className={classes.lastLogin}>
                                    Last Login : {Customer.previousLogin ? convertTZ(Customer.previousLogin, 'Asia/Kolkata').toLocaleString() : null}
                                </Typography>
                            </Grid>
                        </Grid>

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
                                </ListItemIcon>{Customer.name}
                            </MenuItem>
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
                        Customer.username ?
                            (<Switch>
                                <Route path={['/Dashboard', '/Dashboard/CASA']} exact component={CASA}></Route>
                                <Route path='/Dashboard/CREDIT CARD' component={CreditCard}></Route>
                                <Route path='/Dashboard/AddBiller' component={AddBiller}></Route>
                                <Route path='/Dashboard/EditBiller' component={EditBiller}></Route>
                                <Route path='/Dashboard/Pay' component={Pay}></Route>
                                <Route path='/Dashboard/FTWithinBankAccount' component={FTWithinBankAccount}></Route>
                                <Route path='/Dashboard/FTWithinBankBeneficiary' component={FTWithinBankBeneficiary}></Route>
                                <Route path='/Dashboard/ChequeRequest' component={ChequeRequest}></Route>
                                <Route path='/Dashboard/ViewExistingChequeRequest' component={ViewExistingChequeRequest}></Route>
                                <Route path='/Dashboard/CreditLimitIncrease' component={CreditLimitIncrease}></Route>
                                <Route path='/Dashboard/ResetPassword' component={ResetPassword}></Route>
                                <Route path='/Dashboard/EditBeneficiary' component={EditBeneficiary}></Route>
                                <Route path='/Dashboard/AddBeneficiary' component={AddBeneficiary}></Route>
                                <Route path='/Dashboard/CardType' component={CardType}></Route>
                                <Route path='/Dashboard/CasaType' component={CasaType}></Route>
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
