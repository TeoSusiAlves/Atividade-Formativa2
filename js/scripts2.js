var dadosMapa = [
    ['Country', 'Popularity'],
    ['', 0]
];
var dadosPizza = [
    ['Status', 'Total'],
    ['', 0]
]
// var dadosGrafico = [['Sigla', 'Estado', 'Casos', 'Mortes', 'Suspeitos', 'Descartados'],
// ['', '', 0, 0, 0, 0]
// ];

//---------------------------------------------------------------------
async function buscarDados() {

    await fetch('https://covid19-brazil-api.vercel.app/api/report/v1/countries')
        .then(response => response.json())
        .then(dados => prepararDados(dados))
        .catch(e => exibirErro(e.message));

}

//---------------------------------------------------------------------

function prepararDados(dados) {

    dadosMapa = [['Países', 'Casos confirmados']];

    for (let i = 0; i < dados['data'].length; i++) {

        let pais = dados['data'][i].country;
        let casos = dados['data'][i].confirmed;

        dadosMapa.push([pais, casos]);
    }

    drawRegionsMap();
}

function exibirErro(mensagem) {
    let erro = document.getElementById('erro');
}



//******************** Código para o mapa ****************/

google.charts.load('current', {
    'packages': ['geochart'],
});
google.charts.setOnLoadCallback(drawRegionsMap);

function drawRegionsMap() {
    let data = google.visualization.arrayToDataTable(dadosMapa);

    var options = {
        colorAxis: { colors: ['white', 'blue', 'purple', 'purple', 'red', 'gray', 'black'] },
        backgroundColor: 'blue'
      
    };

    var chart = new google.visualization.GeoChart(document.getElementById('mundotodo'));

    chart.draw(data, options);
}







//------------Dados PIZZA---------------------------------------------------------
async function buscarDadosPizza() {

    await fetch('https://covid19-brazil-api.vercel.app/api/report/v1/countries')
        .then(response => response.json())
        .then(dados => prepararDados2(dados))
        .catch(e => exibirErro(e.message));

}

//---------------------------------------------------------------------

//******************** Código para a PIZZA ****************/
google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

    let data = google.visualization.arrayToDataTable(dadosPizza);

    var options = {
        title: '',
        legend: {position:'bottom'}
    };

    var chart = new google.visualization.PieChart(document.getElementById('pizza'));

    chart.draw(data, options);
}

function exibirErro(mensagem) {
    let erro = document.getElementById('erro');
}

function prepararDados2(dados) {

    dadosPizza = [['Status', 'Total']];
    let mortes = 0;
    let confirmados = 0;
    let recuperados = 0;

    for (let i = 0; i < dados['data'].length; i++) {

        mortes += dados['data'][i].deaths;
        confirmados += dados['data'][i].confirmed;
        recuperados += dados['data'][i].recovered;
    }
    dadosPizza.push(['Confirmados', confirmados]);
    dadosPizza.push(['Mortes', mortes]);
    dadosPizza.push(['Recuperados', recuperados]);
    drawChart();
}


//------------Dados Tabela--------------------------------------------------------
async function buscarDadosTabela() {

    await fetch('https://covid19-brazil-api.vercel.app/api/report/v1')
        .then(response => response.json())
        .then(dados => prepararDados3(dados))
        .catch(e => exibirErro(e.message));

}
function exibirErro(mensagem) {
    let erro = document.getElementById('erro');
}
function prepararDados3(dados) {
    let linhas = document.getElementById('linhas');
    linhas.innerHTML = '';  
    for (let i = 0; i<dados['data'].length; i++) {
        let auxlinhas = '';
        auxlinhas = '<tr>';
        auxlinhas += '<td>' + dados['data'][i].uf + '</td>' + 
        '<td>' + dados['data'][i].state + '</td>' + '<td>' + dados['data'][i].cases + '</td>' +
        '<td>' + dados['data'][i].deaths + '</td>' +
        '<td>' + dados['data'][i].suspects + '</td>' +
        '<td>' + dados['data'][i].refuses + '</td>' +
         '</tr>';

        linhas.innerHTML += auxlinhas;
        
    }

}
function todos(){
    buscarDadosTabela();
    buscarDadosPizza();
    buscarDados();


}

// function prepararDados3(dados) {

//     dadosGrafico = [['Sigla', 'Estado', 'Casos', 'Mortes', 'Suspeitos', 'Descartados']];
//     let mortes = 0;
//     let suspeitos = 0;
//     let descartados = 0;
//     let casos = 0;


//     for (let i = 0; i < dados['data'].length; i++) {

//         let estado = dados['data'][i].state;
//         let sigla = dados['data'][i].uf;
//         casos = dados['data'][i].cases;
//         mortes = dados['data'][i].deaths;
//         suspeitos = dados['data'][i].suspects;
//         descartados = dados['data'][i].refuses;

//     }
//     dadosGrafico.push(['Sigla', sigla]);
//     dadosGrafico.push(['Estado', estado]);
//     dadosGrafico.push(['Mortes', mortes]);
//     dadosGrafico.push(['suspeitos', suspeitos]);
//     dadosGrafico.push(['descartados', descartados]);
//     dadosGrafico.push(['casos', casos]);

//     drawTable();
// }

// google.charts.load('current', { 'packages': ['table'] });
// google.charts.setOnLoadCallback(drawTable);

// function drawTable() {
//     let data = new google.visualization.DataTable();
//     data.addColumn('string', 'Name');
//     data.addColumn('string', 'Name');
//     data.addColumn('number', 'Salary');
//     data.addColumn('number', 'Salary');
//     data.addColumn('number', 'Salary');
//     data.addColumn('number', 'Salary');
//     data.addRows([
//         [sigla, estado, {v: mortes, ],
           
//     ]);

//     var table = new google.visualization.Table(document.getElementById('tabela'));

//     table.draw(data, { showRowNumber: true, width: '80%', height: '100%' });
// }












