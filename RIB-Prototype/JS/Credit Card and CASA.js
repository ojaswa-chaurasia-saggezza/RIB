// To initialise the Table
var table = $('#Credit_Card_and_CASA_Table').DataTable({
    lengthMenu: [5, 10, 15, 25, 30],
    stateSave: true,
    "dom": "lrtip",
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

$(document).ready(function () {
    $('input.global_filter').on('keyup click', function () {
        filterGlobal();
    });

    $('input.column_filter').on('keyup click', function () {
        filterColumn($(this).parents('tr').attr('data-column'));
    });
});

// To Initialise the date  Range picker
$(function () {

    var start = moment().subtract(29, 'days');
    var end = moment();

    function cb(start, end) {
        $('#reportrange span').html('<i class="fa fa-calendar me-1"></i>&nbsp;' + start.format('DD/MM/YYYY') + ' - ' + '<i class="fa fa-calendar me-1"></i>&nbsp;' + end.format('DD/MM/YYYY'));
        console.log(start.day(), end);
    }

    $('#reportrange').daterangepicker({
        startDate: start,
        endDate: end,
        showDropdowns: true,
        opens: 'left',
        locale: {
            separator: ' to ',
            format: 'DD-MM-YYYY'
        }

    }, cb);

    cb(start, end);

});


console.log($('#reportrange').val());

// This is for Pie chart creation
var chart;
google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
    var dataFormTable = table.rows().data();

    var temp = [];

    for (let row of dataFormTable.toArray()) {
        temp.push([row[3], Number(row[4].slice(1))]);
    }

    var dict = { 'Food': 0, 'Bill': 0, 'Travel': 0, '-': 0 };
    for (let row of temp) {
        dict[row[0]] += row[1];
    }
    temp = [['Tasks', 'Expense']];

    for (let a in dict) {
        temp.push([a, dict[a]]);
    }


    var data = google.visualization.arrayToDataTable(temp);

    var options = {
        title: 'PFM',
        is3D: true,
        fontSize: 8,
        height: 200,
        legend: { textStyle: { fontSize: 10 } },
        titleTextStyle: { fontSize: 16 },
    };
    chart = new google.visualization.PieChart(document.getElementById('Credit_Card_Pie'));
    chart.draw(data, options);
}



/*--------- The Below code would have helped in dynamically changing the Pie chart based on the table ---------------*/

// table.on('draw', ()=>{
//     var dataFormTable = table.rows({search:'applied'}).data();
//     console.log(this.value);
//     var temp = [];

//     for (let row of dataFormTable.toArray()) {
//         temp.push([row[3], Number(row[4].slice(1))]);
//     }

//     var dict = { 'Food': 0, 'Bill': 0, 'Travel': 0, '-': 0 };
//     for (let row of temp) {
//         dict[row[0]] += row[1];
//     }
//     temp = [['Tasks', 'Expense']];

//     for (let a in dict) {
//         temp.push([a, dict[a]]);
//     }


//     var data = google.visualization.arrayToDataTable(temp);

//     var options = {
//         title: 'PFM',
//         is3D: true,
//         fontSize: 8,
//         height: 200,
//         legend: { textStyle: { fontSize: 10 } },
//         titleTextStyle: { fontSize: 18 },
//     };
//     chart.draw(data, options);  
// });



