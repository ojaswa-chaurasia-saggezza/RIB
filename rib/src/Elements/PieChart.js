import React from "react";
import Chart from "react-google-charts";
import CircularProgress from '@material-ui/core/CircularProgress';



export default function PieChart(props) {

    return (
        <Chart
            width='100%'
            height='80%'
            chartType="PieChart"
            loader={<div style={{
                display: "flex", alignItems: 'center', justifyContent: 'center', width:'100%'
                , height:'100%'
            }}><CircularProgress /></div>}
            data={props.data}
            options={{
                // Just add this option
                is3D: true,
                chartArea: {
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: '90%',
                },
                titleTextStyle: {
                    textAlign: 'center',
                    fontSize: 14,


                },
                legend: {
                    position: "bottom"
                }
            }}
            rootProps={{ 'data-testid': '2' }}
        />
    );

}