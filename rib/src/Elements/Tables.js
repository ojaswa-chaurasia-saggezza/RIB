import React from 'react';


// //Bootstrap and jQuery libraries
// import 'jquery/dist/jquery.min.js';

// //Datatable Modules
// import "datatables.net-dt/js/dataTables.dataTables"
// import "datatables.net-dt/css/"
// import $ from 'jquery';


class Tables extends React.Component {
    // componentDidMount() {
    //     //initialize datatable
    //     $(function () {
    //         var table = $('#Credit_Card_and_CASA_Table').DataTable({
    //             lengthMenu: [5, 10, 15, 25, 30],
    //             stateSave: true,
    //             dom: "lrtip",
    //         });
    //     });
    // }
    render() {
        //Datatable HTML
        return (
            <div id={"table_div"} style={{ overflow: 'auto', padding: '0px 10px' }}>
                {/* <!-- Table to be used for searching --> */}
                <div>
                    <table className="summary_text" style={{ margin: '0 1em -2em auto', zIndex: 200 }}>
                        <tbody>
                            <tr id="filter_global">
                                <td >Search: </td>
                                <td >
                                    <div className="input-group input-group-sm ms-2">
                                        <select className="form-select col-5" aria-label="Default select example">
                                            <option value="-1" selected>Global Search</option>
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
                <table id={"Credit_Card_and_CASA_Table"} className="table table-striped table-bordered " style={{ width: '100%' }}>
                    <thead>
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
                    <tbody>
                        <tr>
                            <td>123</td>
                            <td>01/01/2021</td>
                            <td>Transaction to 2839850- UPI 3209/3/323928839</td>
                            <td>Food</td>
                            <td>₹500</td>
                            <td>-</td>
                            <td>₹23000</td>
                        </tr>
                        <tr>
                            <td>223</td>
                            <td>10/12/2020</td>
                            <td>Transaction to 2843549850- UPI 32093245/324928839 sdf dsak 32094</td>
                            <td>Bill</td>
                            <td>₹1500</td>
                            <td>-</td>
                            <td>₹2000</td>
                        </tr>
                        <tr>
                            <td>563</td>
                            <td>21/10/2001</td>
                            <td>Transaction to 2839fds850- Bank Transfer 3sda/daf3s/3asdf839</td>
                            <td>Bill</td>
                            <td>₹5342</td>
                            <td>-</td>
                            <td>₹12000</td>
                        </tr>
                        <tr>
                            <td>023</td>
                            <td>23/02/2004</td>
                            <td>Transaction to 2832419850- UPI 32432059/43/3243928839</td>
                            <td>Food</td>
                            <td>₹500</td>
                            <td>-</td>
                            <td>₹23000</td>
                        </tr>
                        <tr>
                            <td>123</td>
                            <td>01/01/2021</td>
                            <td>Transaction to 2839850- UPI 3209/3/323928839</td>
                            <td>Food</td>
                            <td>₹500</td>
                            <td>-</td>
                            <td>₹23000</td>
                        </tr>
                        <tr>
                            <td>1233</td>
                            <td>04/07/2043</td>
                            <td>Transaction to 28dsf3ds9850- Bank Transfer 32ds0f9/3/sdaf323928839</td>
                            <td>Travel</td>
                            <td>₹21500</td>
                            <td>-</td>
                            <td>₹2332000</td>
                        </tr>
                        <tr>
                            <td>1233</td>
                            <td>04/07/2043</td>
                            <td>Transaction to 28dsf3ds9850- Bank Transfer 32ds0f9/3/sdaf323928839</td>
                            <td>Travel</td>
                            <td>₹21500</td>
                            <td>-</td>
                            <td>₹2332000</td>
                        </tr>
                        <tr>
                            <td>133</td>
                            <td>03/03/2003</td>
                            <td>Transaction to 28dsf3sdds9850- Bank Transfer 32ds0df9/3/sdaf323928839</td>
                            <td>Travel</td>
                            <td>₹215</td>
                            <td>-</td>
                            <td>₹2332</td>
                        </tr>
                        <tr>
                            <td>1243</td>
                            <td>04/02/2008</td>
                            <td>Interest Credit</td>
                            <td>-</td>
                            <td>-</td>
                            <td>₹342</td>
                            <td>₹22000</td>
                        </tr>
                        <tr>
                            <td>1243</td>
                            <td>04/02/2008</td>
                            <td>Interest Credit</td>
                            <td>-</td>
                            <td>-</td>
                            <td>₹2332</td>
                            <td>₹254000</td>
                        </tr>
                        <tr>
                            <td>1243</td>
                            <td>04/02/2008</td>
                            <td>Interest Credit</td>
                            <td>-</td>
                            <td>-</td>
                            <td>₹342</td>
                            <td>₹22000</td>
                        </tr>
                        <tr>
                            <td>1323</td>
                            <td>14/12/2002</td>
                            <td>Interest Credit</td>
                            <td>-</td>
                            <td>-</td>
                            <td>₹34322</td>
                            <td>₹220032</td>
                        </tr>
                        <tr>
                            <td>1243</td>
                            <td>04/02/2008</td>
                            <td>Transfer From 3289479232894 - UPI 09438539/32//2343/4324324j dksjf dlfadjfldf</td>
                            <td>-</td>
                            <td>-</td>
                            <td>₹342</td>
                            <td>₹22003240</td>
                        </tr>
                        <tr>
                            <td>503</td>
                            <td>03/02/2028</td>
                            <td>Transfer From 78453244 - UPI 0942//4/35/42343/4324324j frhtngrynfbgfdf</td>
                            <td>-</td>
                            <td>-</td>
                            <td>₹300000</td>
                            <td>₹2200342</td>
                        </tr>
                        <tr>
                            <td>043</td>
                            <td>03/03/2018</td>
                            <td>Transfer From 6190000291092094 - UPI 987968798989868894popipopipipoklkfadjfldf</td>
                            <td>-</td>
                            <td>-</td>
                            <td>₹3243242</td>
                            <td>₹92200240</td>
                        </tr>
                        <tr>
                            <td>1243</td>
                            <td>04/02/2008</td>
                            <td>Transfer From 3289479232894 - UPI 09438539/32//2343/4324324j dksjf dlfadjfldf</td>
                            <td>-</td>
                            <td>-</td>
                            <td>₹43225324</td>
                            <td>₹435354325</td>
                        </tr>

                    </tbody>

                </table>
            </div>
        );
    }
}
export default Tables;