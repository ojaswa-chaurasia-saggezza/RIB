import React from 'react';


//Bootstrap and jQuery libraries
import 'jquery/dist/jquery.min.js';



//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import 'bootstrap/dist/css/bootstrap.css';
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $, { data } from 'jquery';

import DateRangeSelector from './DateRangeSelector';
import Slider from "@material-ui/core/Slider";
import { withStyles } from '@material-ui/core';
import { convertTZ, formatter } from "../Helpers/HelperFunctions";


const CustomSlider = withStyles({
    root: {
        color: "#3880ff",
        height: 2,
        padding: '15px 0',
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 0px)',
        top: -32,
        '& *': {
            background: '#3880ff',
            padding: '10px',

            color: '#fff',
        },
    },
    track: {
        height: 2,
    },
    rail: {
        height: 2,
        opacity: 0.8,
        backgroundColor: '#bfbfbf',
    },

})(Slider);



class Tables extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            rangeValue: [null, null],
            startDate: null,
            endDate: null,
            whatIsSelected: '-1',
            table: null,
        };

        this.changeStartDate = this.changeStartDate.bind(this);
        this.changeEndDate = this.changeEndDate.bind(this);
        this.handleSliderChange = this.handleSliderChange.bind(this);
        this.changeDate = this.changeDate.bind(this);
        this.formatter = formatter;


    }

    changeStartDate = (date) => {
        this.setState({ startDate: convertTZ(date) });
    }
    changeEndDate = (date) => {
        this.setState({ endDate: convertTZ(date) });
    }

    changeDate = (startDate, endDate) => {
        this.changeStartDate(startDate);
        this.changeEndDate(endDate);

    }
    handleSliderChange = (event, value) => {
        this.setState({ rangeValue: value });
        this.state.table.draw();
    }
    valuetext = (value) => {
        return this.formatter.format(value);
    }


    componentDidMount() {
        //initialize datatable
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'INR',

        });
        this.setState({ data: this.props.data });

        var DATA = this.props.data.map((val) => {
            var data = [];
            data.push(val.transactionId);
            data.push(convertTZ(val.date, 'Asia/Kolkata'));
            data.push(val.narration);
            data.push(val.category);
            data.push(formatter.format(val.withdraw));
            data.push(formatter.format(val.deposit));
            data.push(formatter.format(val.closingBalance));
            return data;
        });

        console.log(DATA);

        $(() => {

            $('#filter_global .DataRangePicker').hide();

            var table = $('#Credit_Card_and_CASA_Table' + this.props.accountNumber).DataTable({
                lengthMenu: [5, 10, 15, 25, 30],
                stateSave: false,
                dom: "ltip",
                responsive: true,
                data: DATA,
                columns: [
                    { title: "Transaction ID" },
                    { title: "Date" },
                    { title: "Narration" },
                    { title: "Category." },
                    { title: "Withdrawal" },
                    { title: "Deposit" },
                    { title: "Balance" }
                ]

            });

            this.setState({ table: table });


            $.fn.dataTable.ext.search.push(
                (settings, data, dataIndex) => {
                    var min = this.state.startDate;
                    var max = this.state.endDate;
                    var date = convertTZ(data[1]); // use data for the Date column
                    var withdrawal = Number(data[4].substring(1).split(',').join(''));  // to omit '₹' (substing(1)) and then to convert to number
                    var deposit = Number(data[5].substring(1).split(',').join('')); // to omit '₹'



                    var minSlider = this.state.rangeValue[0];
                    var maxSlider = this.state.rangeValue[1];

                    if (this.state.whatIsSelected == '1' && ((!min && !max) ||
                        (!min && date <= max) ||
                        (min <= date && !max) ||
                        (min <= date && date <= max))) {
                        return true;
                    }

                    if (this.state.whatIsSelected == '4' && ((!minSlider && !maxSlider) ||
                        (!minSlider && withdrawal <= maxSlider) ||
                        (minSlider <= withdrawal && !maxSlider) ||
                        (minSlider <= withdrawal && withdrawal <= maxSlider))) {
                        return true;
                    }

                    if (this.state.whatIsSelected == '5' && ((!minSlider && !maxSlider) ||
                        (!minSlider && deposit <= maxSlider) ||
                        (minSlider <= deposit && !maxSlider) ||
                        (minSlider <= deposit && deposit <= maxSlider))) {
                        return true;
                    }

                    if (['-1', '0', '2', '3'].includes(this.state.whatIsSelected))
                        return true;

                    return false;
                }
            );
            function filterGlobal() {
                if ($("#filter_global select").val() == "-1")
                    table.search(
                        $('#global_filter').val(),
                        false,  //This is for Regex search
                        true,   // This is for smart search
                    ).draw();
                else
                    filterColumn($("#filter_global select").val());


            }
            function filterColumn(i) {
                table.column(Number(i)).search(
                    $('#global_filter').val(),
                    false,  //This is for Regex search
                    true,   // This is for smart search
                ).draw();
            }
            $('#global_filter').on('keyup click', function () {
                filterGlobal();
            });

            $('#filter_global select').on('change', () => {
                this.setState({ whatIsSelected: $('#filter_global select').val(), rangeValue: [null, null] });

                if ($('#filter_global select').val() != 1) {
                    $('#filter_global .DataRangePicker').hide();
                }
                else {
                    $('#filter_global .DataRangePicker').show();
                }


                this.setState({ startDate: null, endDate: null });
                $('#global_filter').val('');
                table.search('').columns().search('').draw();
            });

            $('#filter_global .DataRangePicker').on('apply.daterangepicker', () => {
                table.draw();
            });
            $('#filter_global .DataRangePicker').on('cancel.daterangepicker', () => {
                $('#filter_global .DataRangePicker').val('');
                table.draw();
            });




        });
    }
    render() {
        //Datatable HTML
        return (
            <div id={"table_div"} style={{ padding: ' 10px' }}>



                {/* <!-- Table to be used for searching --> */}
                <div>
                    <table className="summary_text" style={{ margin: '0 1em -1em auto', zIndex: 200, }}>
                        <tbody>
                            <tr id="filter_global">
                                <td >Search: </td>
                                <td >
                                    <div className="input-group input-group-sm ms-2">
                                        <select className="form-select col-5" aria-label="Default select example">
                                            <option value="-1" defaultValue>Global Search</option>
                                            <option value="0">Transaction ID</option>
                                            <option value="1">Date</option>
                                            <option value="2">Narration</option>
                                            <option value="3">Category</option>
                                            <option value="4">Withdrawal</option>
                                            <option value="5">Deposit</option>
                                        </select>
                                        <input type="search" placeholder="Search here" className="form-control ds-input global_filter" id="global_filter" style={{ display: ['1', '4', '5'].includes(this.state.whatIsSelected) ? 'none' : 'block' }} />

                                        <DateRangeSelector changeDate={this.changeDate} />
                                        {this.state.whatIsSelected >= '4' ?
                                            <div style={{ display: 'flex', width: '200px', paddingLeft: '10px' }}>

                                                <CustomSlider
                                                    value={this.state.rangeValue}
                                                    onChange={this.handleSliderChange}
                                                    max={this.state.whatIsSelected == '4' ? Math.max(...this.props.data.map((val) => val.withdraw)) : Math.max(...(this.props.data.map((val) => val.deposit)))}
                                                    valueLabelDisplay="auto"
                                                    aria-labelledby="range-slider"
                                                    getAriaValueText={this.valuetext}
                                                    valueLabelFormat={(val) => this.formatter.format(val)}
                                                />
                                            </div>

                                            : null
                                        }


                                    </div>

                                </td>
                                <td>

                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* </div>The Main Table to Be displayed */}
                <table id={"Credit_Card_and_CASA_Table" + this.props.accountNumber} className="table table-striped table-responsive table-bordered " style={{ width: '100%' }}>

                </table>
            </div>
        );
    }
}
export default Tables;