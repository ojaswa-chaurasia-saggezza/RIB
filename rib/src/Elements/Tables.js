import React from 'react';


//Bootstrap and jQuery libraries
import 'jquery/dist/jquery.min.js';

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $, { data } from 'jquery';


class Tables extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: [] };

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
            data.push("Date : " + val.date.split("T").join(" Time : ").split('.')[0]);
            data.push(val.narration);
            data.push(val.category);
            data.push(formatter.format(val.withdraw));
            data.push(formatter.format(val.deposit));
            data.push(formatter.format(val.closingBalance));
            return data;
        });

        console.log(DATA);

        $(() => {
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
            $('input.global_filter').on('keyup click', function () {
                filterGlobal();
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
                                        <input type="search" placeholder="Search here" className="form-control ds-input global_filter" id="global_filter" />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* </div>The Main Table to Be displayed */}
                <table id={"Credit_Card_and_CASA_Table" + this.props.accountNumber} className="table table-striped table-responsive table-bordered " style={{ width: '100%' }}>
                    {/* <thead>
                        <tr>
                            <th>Transaction ID</th>
                            <th>Date</th>
                            <th>Narration</th>
                            <th>Category</th>
                            <th>Withdrawal</th>
                            <th>Deposit</th>
                            <th>Balance</th>
                        </tr>
                    </thead>
                    {/* <tbody>

                        {this.props.data.map((val, index) => {

                            console.log("dsafdsa");
                            return (<tr key={val.transactionId}>
                            <td>{val.transactionId}</td>
                            <td>{val.date}</td>
                            <td>{val.narration}</td>
                            <td>{val.category}</td>
                            <td>{val.withdraw}</td>
                            <td>{val.deposit}</td>
                            <td>{val.closingBalance}</td>
                        </tr>)
                        }

                        )}

                    </tbody> } */}

                </table>
            </div>
        );
    }
}
export default Tables;