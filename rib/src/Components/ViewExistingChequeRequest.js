import React, { useEffect, useState } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from "@material-ui/core/CardHeader";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CustomerService from '../Services/Customer.service';
import { convertTZ } from "../Helpers/HelperFunctions";

import PlainDialog from "../Elements/PlainDialog";


const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 75,
        marginBottom: theme.spacing(3),
    },
    title: {
        fontSize: 14,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'left',
        boxShadow: 'none',
        display: 'flex',
        // justifyContent: 'space-between',
    },

}));


export default function ViewExistingChequeRequest() {
    const classes = useStyles();

    const [data, setData] = useState([]);
    const [open , setOpen] =useState(false);
    const [dialogData, setdialogData] = useState(null);

    useEffect(() => {
        CustomerService.getServiceRequests().then((response) => {

            if (response.data)
                setData(response.data);

        }, (error) => {

        }).then(() => {

        });
    }, []);

    const handleRowClick = (value) => {
        var string=``;
        for (let key in value){
            string = `${string}  \n${key}: ${value[key]}\n`;
        }
        
        setdialogData(string);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }


    return (

        <React.Fragment>
            <Card className={classes.root} variant="outlined">
                <CardHeader
                    title="View Existing"
                />
                <CardContent>
                    <table id="example" class="table table-striped table-bordered" style={{ width: "100%" }}>
                        <thead>
                            <tr>
                                <th>Request Id</th>
                                <th>Date</th>
                                <th>Request For</th>
                                {/* <th>Account Number</th> */}
                                {/* <th>Leaf</th> */}
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>

                            {data.map((value) =>
                                <tr key={value.requestId} onClick={() => handleRowClick(value)}>
                                    <td>{value.requestId}</td>
                                    <td>{convertTZ(value.date).toString()}</td>
                                    {console.log(data)}
                                    {/* <td>{value.accountNumber}</td>
                                <td>{value.leaf}</td> */}
                                    <td>{value.leaf ? "Cheque Order" : "Credit Limit Increase"}</td>
                                    <td>{value.status}</td>
                                </tr>
                            )}

                        </tbody>
                    </table>


                </CardContent>


            </Card>


            <PlainDialog open={open} title={"Summary"} handleClose={handleClose} data={dialogData} />

        </React.Fragment>
    );
}
