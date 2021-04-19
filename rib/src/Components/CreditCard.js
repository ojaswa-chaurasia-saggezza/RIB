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

import { formatter } from "../Helpers/HelperFunctions";

import PieChart from "../Elements/PieChart";
import DateRangeSelector from "../Elements/DateRangeSelector";

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
        padding: theme.spacing(1),
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


export default function CreditCard() {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const [creditCard, setCreditCard] = React.useState('');

    const [Customer, setCustomer] = useState({});
    const [ErrorMessage, setErrorMessage] = useState("");

    const [CreditCards, setCreditCards] = useState([]);
    const [selectedCreditCard, setSelectedCreditCard] = useState('');
    const [listOfTransactions, setListOfTransactions] = useState([]);

    const [chartData , setChartData] = useState([['category','Amount'],]);

    const changeChartData= (startDate, endDate, CREDITCARD) =>{
        CustomerService.getCreditCardPFAData(CREDITCARD ?? creditCard,startDate,endDate).then((response)=>{
            console.log(response.data);
            if(response.data)
                setChartData(response.data);
        },(error)=>{
            const _content =
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString();
                    setCustomer({});
                    setErrorMessage(_content);
                    console.log(_content);
        });
    }
    

    useEffect(() => {
        const currentCustomer = AuthService.getCurrentUser();

        if (currentCustomer)
            CustomerService.getCustomerDetails().then(
                (response) => {
                    setCustomer(response.data);
                    var creditCardList = response.data.creditCard.map((val) => val.cardNumber);

                    setCreditCards(creditCardList);
                    handleAccountChange(creditCardList[0]);
                    setCreditCard(creditCardList[0]);
                    changeChartData(new Date(1900,0), new Date(), creditCardList[0]);



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
        else {
            setCustomer({});
            setErrorMessage("Please Login First");
        }

    }, []);


    const handleChange = (event) => {
        setCreditCard(event.target.value);
        changeChartData(new Date(1900,0), new Date(), event.target.value);
    };

    const handleAccountChange = (creditCardNumber) => {
        CustomerService.getCreditCardDetails(creditCardNumber).then(response => {
            console.log(response.data);
            // First chanhge the list of transactions and than the account  beacause otherwise wrong data reached to the tables
            setListOfTransactions(response.data.transactions);
            setSelectedCreditCard(response.data);
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
                    title="Credit Card Details"
                />
                <CardContent>
                    <Grid container spacing={0}>
                        <Grid container item xs={12} sm={9} spacing={1}>

                            <Grid container item xs={12} spacing={1}>
                                <Grid item sm={6} xs={12}>
                                    <Paper className={classes.paper}><strong>Credit Card Number : &emsp;&emsp;</strong>
                                        <FormControl variant="">

                                            <Select
                                                labelId="demo-customized-select-label"
                                                id="demo-customized-select"
                                                value={creditCard}
                                                onChange={handleChange}
                                                label="Credit Card Number"
                                                input={<BootstrapInput />}
                                            >
                                                {CreditCards.map((creditCardNumber) => <MenuItem key={creditCardNumber} value={creditCardNumber} onClick={() => handleAccountChange(creditCardNumber)}>{creditCardNumber}</MenuItem>)}

                                            </Select>
                                        </FormControl>
                                    </Paper>
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <Paper className={classes.paper}>
                                        <Typography variant="body2" gutterBottom>
                                            <strong>Out-Standing Balance : &emsp;</strong> {formatter.format(selectedCreditCard.outStandingBalance)}
                                        </Typography>
                                    </Paper>

                                </Grid>
                            </Grid>
                            <Grid container item xs={12} spacing={1}>
                                <Grid item sm={6} xs={12}>
                                    <Paper className={classes.paper}>
                                        <Typography variant="body2" gutterBottom>
                                            <strong>Card Type : &emsp;&emsp;</strong>{selectedCreditCard.type}
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <Paper className={classes.paper}>
                                        <Typography variant="body2" gutterBottom>
                                            <strong>Credit Limit : &emsp;&emsp;</strong>{formatter.format(selectedCreditCard.creditLimit)}
                                        </Typography>
                                    </Paper>
                                </Grid>
                            </Grid>

                        </Grid>

                        <Grid container item xs={12} sm={3} spacing={1}>
                            <div style={{ justifyContent: "center", display: 'flex-box', width: '200px', height: '200px' }}>
                                <div style={{ textAlign: 'center' }}><strong>PFA</strong></div>
                                <PieChart data={chartData}></PieChart>
                                <div className="input-group-sm ms-2" style={{ display: 'flex', }}>Select Range :<DateRangeSelector key={selectedCreditCard} changeDate={(start,end)=> {changeChartData(start,end)}} width='90%' />
                                </div>
                            </div>
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


                    {listOfTransactions.length > 0 ? <Tables key={selectedCreditCard.cardNumber} data={listOfTransactions} accountNumber={selectedCreditCard.cardNumber} /> : <div>Please select an Account Number</div>}
                </CardContent>

            </Card>
        </CssBaseline>

    );
}
