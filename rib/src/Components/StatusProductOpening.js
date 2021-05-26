import React,{useEffect, useState} from "react";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from "@material-ui/core/CardHeader";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CustomerService from '../Services/Customer.service';
import { convertTZ } from "../Helpers/HelperFunctions";

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

export default function StatusProductOpening(props) {

    const classes = useStyles();

    const [data, setData] = useState([]);

    useEffect(() => {
        CustomerService.getProductOpeningRequests().then((response) => {

            if (response.data)
                setData(response.data);

        }, (error) => {

        });
    }, []);



    return (
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
                            <th>Type of Request</th>
                            <th>Type of Card/Account</th>
                            <th>Fees to be deducted from account</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {console.log(data)}

                        {data.map((value) =>
                            <tr>
                                <td>{value.requestId}</td>
                                <td>{convertTZ(value.date).toString()}</td>
                                <td>{value.productType}</td>
                                <td>{value.type}</td>
                                <td>{value.fromAccount ?? '-'}</td>
                                <td>{value.status}</td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </CardContent>
        </Card>
    );
    
} 