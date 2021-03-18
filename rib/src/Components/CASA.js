import React, { useEffect, useState } from 'react';
import { FormHelperText, Paper } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import { CssBaseline, Grid, FormControl, Input, InputLabel } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import InputBase from "@material-ui/core/InputBase";

import Wrap from '../HOC/Wrap';
import Tables from '../Elements/Tables';

import AuthService from "../Services/Auth.service";
import CustomerService from "../Services/Customer.service";

const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(0),
      },
    },
    input: {
      borderRadius: 4,
      marginTop: '-3px ',
      width: '150px',
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 14,
      padding: '7px 26px 7px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);
  


const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 75,
        marginBottom: theme.spacing(3),
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    paper: {
        padding: theme.spacing(3),
        textAlign: 'left',
        boxShadow: 'none',
        display: 'flex',
        // justifyContent: 'space-between',
    },
    accountNumber: {
        minWidth: 200,
        maxHeight: 30,
        padding: 5,
        border: '1px solid',
        ' :hover': {
            borderBottom: '0px',
        }
    }

}));


export default function CASA() {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const [account, setAccount] = React.useState('');

    const [Customer, setCustomer] = useState({});
    const [ErrorMessage, setErrorMessage] = useState("Please Login first");

    const [Accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState('');
    const [listOfTransactions, setListOfTransactions] = useState([]);

    useEffect(() => {
        const currentCustomer = AuthService.getCurrentUser();

        if (currentCustomer)
            CustomerService.getCustomerDetails().then(
                (response) => {
                    setCustomer(response.data);
                    var accountList = response.data.accounts.map((val) => val.accountNumber);

                    setAccounts(accountList);
                    handleAccountChange(accountList[0]);
                    setAccount(accountList[0]);



                },
                (error) => {
                    const _content =
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString();
                    setCustomer({});
                    setErrorMessage(_content);
                    console.log(_content);
                }
            );
        else
            setCustomer({});

    }, []);


    const handleChange = (event) => {
        setAccount(event.target.value);
    };

    const handleAccountChange = (accountNumber) => {
        CustomerService.getAccountDetails(accountNumber).then(response => {
            console.log(response.data);
            // First chanhge the list of transactions and than the account  beacause otherwise wrong data reached to the tables
            setListOfTransactions(response.data.transactions);      
            setSelectedAccount(response.data);
        }, error => {

            const _content =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            setCustomer({});
            setErrorMessage(_content);
            console.log(_content);
        })
    }

    return (
        <CssBaseline>
            {/* This Card is for account summary.*/}
            <Card className={classes.root} variant="outlined">
                <CardHeader
                    title="Account Details"
                />
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid container item xs={12} spacing={1}>
                            <Grid item sm={6} xs={12}>
                                <Paper className={classes.paper}><strong>Account Number : &emsp;&emsp;&emsp;</strong>
                                    <FormControl variant="">
                                        <Select
                                            labelId="demo-customized-select-label"
                                            id="demo-customized-select"
                                            value={account}
                                            onChange={handleChange}
                                            label="Account Number"
                                            input={<BootstrapInput />}
                                        >
                                            {Accounts.map((accountNumber) => <MenuItem key={accountNumber} value={accountNumber} onClick={() => handleAccountChange(accountNumber)}>{accountNumber}</MenuItem>)}

                                        </Select>
                                    </FormControl>
                                </Paper>
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <Paper className={classes.paper}><strong>Balance : &emsp;&emsp;&emsp;</strong>
                                    <Typography variant="body2" gutterBottom>
                                        {selectedAccount.balance}
                                    </Typography>
                                </Paper>

                            </Grid>
                        </Grid>
                        <Grid container item xs={12} spacing={1}>
                            <Grid item sm={6} xs={12}>
                                <Paper className={classes.paper}><strong>Account Type : &emsp;&emsp;&emsp;</strong>
                                    <Typography variant="body2" gutterBottom>
                                        {selectedAccount.type}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <Paper className={classes.paper}><big><strong>Segment : &emsp;&emsp;&emsp;</strong></big>
                                    <Typography variant="body2" gutterBottom>
                                        {selectedAccount.segment}
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>

                    </Grid>

                </CardContent>

            </Card>

            {/* {THIS IS FOR TABLE} */}
            <Card className={classes.root} variant="outlined">
                <CardHeader
                    title="Transaction Details"
                />
                <CardContent>


                    {listOfTransactions.length > 0 ? <Tables key={selectedAccount.accountNumber} data={listOfTransactions} accountNumber={selectedAccount.accountNumber} /> : <div>Please select an Account Number</div>}
                </CardContent>

            </Card>
        </CssBaseline>

    );
}
