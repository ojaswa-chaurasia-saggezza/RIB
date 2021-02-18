import React from 'react';
import { FormHelperText, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import { CssBaseline, Grid, FormControl } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import Wrap from '../HOC/Wrap';
import Tables from '../Elements/Tables';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 75,
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
        padding: theme.spacing(4),
        textAlign: 'left',
        boxShadow: 'none',
        display: 'flex',
        justifyContent: 'space-around',
    },
    accountNumber: {
        minWidth: 200,
        maxHeight: 30,
        padding: 5,
        border:'1px solid',
        ' :hover':{
            borderBottom: '0px',
        }
    }

}));


export default function CASA() {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <CssBaseline>
            <Card className={classes.root} variant="outlined">
                <CardHeader
                    title="Account Details"
                />
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid container item xs={12} spacing={3}>
                            <Grid item xs={6}>
                                <Paper className={classes.paper}><strong>Account Number : {''}</strong>
                                    <FormControl variant="">
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={age}
                                            displayEmpty={true}
                                            className={classes.accountNumber}
                                            onChange={handleChange}
                                            label="Age"
                                        >
                                            <MenuItem value={897653443526}>897653443526</MenuItem>
                                            <MenuItem value={987653426578}>987653426578</MenuItem>
                                            <MenuItem value={123457687689}>123457687689</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper className={classes.paper}>item</Paper>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} spacing={3}>
                            <Grid item xs={6}>
                                <Paper className={classes.paper}>item</Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper className={classes.paper}>item</Paper>
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
                    <Tables />
                </CardContent>

            </Card>
        </CssBaseline>
    );
}
