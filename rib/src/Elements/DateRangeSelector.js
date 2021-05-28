import React from "react";

import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';



export default function DateRangeSelector(props) {

    const handleCallback = (start, end, label) => {
        props.changeDate(start, end);
    }

    return (
        <DateRangePicker
            className={'DataRangePicker'}
            onCallback={handleCallback}

            onCancel={(event, picker) => { handleCallback(null, null, null) }}
            initialSettings={{ startDate: 'Jan 01 2019', showDropdowns: true,opens: 'left', locale: { format: 'MMM Do YYYY', cancelLabel: "Clear" }, cancelButtonClasses: 'btn btn-danger' }}
        >
            <input type="text" className="form-control DataRangePicker" style={{ width: props.width ? props.width : 'auto' }} />
        </DateRangePicker>
    );
};