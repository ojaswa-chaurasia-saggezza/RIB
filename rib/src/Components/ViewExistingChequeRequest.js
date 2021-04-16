import React from 'react';
import '../CSS/style.css';
import '../CSS/ErrorStyling.css';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from "@material-ui/core/CardHeader";
import { makeStyles, withStyles } from '@material-ui/core/styles';


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
    

    return (

        <Card className={classes.root} variant="outlined">
                <CardHeader
                    title="View Existing"
                />
                <CardContent>
                <table id="example" class="table table-striped table-bordered" style={{width:"100%"}}>
                <thead>
                    <tr>
                        <th>Request Id</th>
                        <th>Account Number</th>
                        <th>Leaf</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1092</td>
                        <td>345768980975</td>
                        <td>34</td>

                    </tr>
                    <tr>
                        <td>7342</td>
                        <td>764538234163</td>
                        <td>12</td>

                    </tr>
                    <tr>
                        <td>1092</td>
                        <td>345768980975</td>
                        <td>34</td>

                    </tr>
                    <tr>
                        <td>7342</td>
                        <td>764538234163</td>
                        <td>12</td>

                    </tr>
                    <tr>
                        <td>1092</td>
                        <td>345768980975</td>
                        <td>34</td>

                    </tr>
                    <tr>
                        <td>7342</td>
                        <td>764538234163</td>
                        <td>12</td>

                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th>Request Id</th>
                        <th>Account Number</th>
                        <th>Leaf</th>

                    </tr>
                </tfoot>
            </table>


                </CardContent>

            </Card>


        // <div class="content" style={{textAlign: "left", paddingLeft: "50px"}}>
        //     <div class="header" style={{paddingBottom:"50px"}}>
        //         View Existing
        //     </div>
        //     <table id="example" class="table table-striped table-bordered" style={{width:"100%"}}>
        //         <thead>
        //             <tr>
        //                 <th>Request Id</th>
        //                 <th>Account Number</th>
        //                 <th>Leaf</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             <tr>
        //                 <td>1092</td>
        //                 <td>345768980975</td>
        //                 <td>34</td>

        //             </tr>
        //             <tr>
        //                 <td>7342</td>
        //                 <td>764538234163</td>
        //                 <td>12</td>

        //             </tr>
        //         </tbody>
        //         <tfoot>
        //             <tr>
        //                 <th>Request Id</th>
        //                 <th>Account Number</th>
        //                 <th>Leaf</th>

        //             </tr>
        //         </tfoot>
        //     </table>
        // </div>

    );
}
