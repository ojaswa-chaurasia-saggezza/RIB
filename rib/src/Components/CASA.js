import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import { CssBaseline } from '@material-ui/core'

import Wrap from '../HOC/Wrap';
import Tables from '../Elements/Tables';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
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
});


export default function CASA() {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <CssBaseline>
            <Card className={classes.root} variant="outlined">
                <CardHeader
                    title="Account Summary"
                />
                <CardContent>
                    {'jflkdsjalk'}
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
            <Card className={classes.root} variant="outlined">
                <CardHeader
                    title="Account Summary"
                />
                <CardContent>
                    <Tables />
                </CardContent>

            </Card>
        </CssBaseline>
    );
}
