import React from 'react';
import '../CSS/style.css';
import '../CSS/ErrorStyling.css';

export default function ViewExistingChequeRequest() {

    return (
        <div class="content" style={{textAlign: "left", paddingLeft: "50px"}}>
            <div class="header" style="padding-bottom: 50px;">
                View Existing
        </div>
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
                        <td>7635</td>
                        <td>876543567654</td>
                        <td>10</td>

                    </tr>
                    <tr>
                        <td>1282</td>
                        <td>465987435668</td>
                        <td>11</td>

                    </tr>

                    <tr>
                        <td>4562</td>
                        <td>324768765098</td>
                        <td>19</td>

                    </tr>
                    <tr>
                        <td>2354</td>
                        <td>876798765467</td>
                        <td>26</td>

                    </tr>
                    <tr>
                        <td>9872</td>
                        <td>984387877658</td>
                        <td>15</td>

                    </tr>
                    <tr>
                        <td>1324</td>
                        <td>456776456798</td>
                        <td>11</td>

                    </tr>

                    <tr>
                        <td>8342</td>
                        <td>234567345213</td>
                        <td>24</td>

                    </tr>
                    <tr>
                        <td>2987</td>
                        <td>764532845632</td>
                        <td>34</td>

                    </tr>
                    <tr>
                        <td>2346</td>
                        <td>736523487208</td>
                        <td>12</td>

                    </tr>
                    <tr>
                        <td>9876</td>
                        <td>236452817438</td>
                        <td>24</td>

                    </tr>
                    <tr>
                        <td>1290</td>
                        <td>876354362534</td>
                        <td>12</td>

                    </tr>
                    <tr>
                        <td>2313</td>
                        <td>746353728613</td>
                        <td>23</td>

                    </tr>
                    <tr>
                        <td>1092</td>
                        <td>324565342152</td>
                        <td>15</td>

                    </tr>
                    <tr>
                        <td>2423</td>
                        <td>763524218245</td>
                        <td>18</td>

                    </tr>
                    <tr>
                        <td>1092</td>
                        <td>873263546363</td>
                        <td>23</td>

                    </tr>
                    <tr>
                        <td>2341</td>
                        <td>243526153532</td>
                        <td>32</td>

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


        </div>

    );
}
