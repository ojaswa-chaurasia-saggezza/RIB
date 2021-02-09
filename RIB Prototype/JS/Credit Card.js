var table = $('#Credit_Card_Table').DataTable({
    lengthMenu: [5, 10, 15, 25, 30],
    stateSave: true,
});




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
        titleTextStyle: { fontSize: 18 },
    };
    chart = new google.visualization.PieChart(document.getElementById('Credit_Card_Pie'));
    chart.draw(data, options);
    
}


table.on('draw', ()=>{
    var dataFormTable = table.rows({search:'applied'}).data();
    console.log(this.value);
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
        titleTextStyle: { fontSize: 18 },
    };
    chart.draw(data, options);
    
    

});

