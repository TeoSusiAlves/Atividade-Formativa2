
//https://covid19-brazil-api.vercel.app/api/report/v1/countries

google.charts.load('current', {
    'packages': ['geochart'],
});
google.charts.setOnLoadCallback(drawRegionsMap);

async function drawRegionsMap() {

    await fetch('https://covid19-brazil-api.vercel.app/api/report/v1/countries')
        .then(response => response.json())
        .then(dados => prepararDados(dados))
        .catch(e => exibirErro(e));
        
    let data = google.visualization.arrayToDataTable(prepararDados(dados));
    let options = {
        colorAxis: {colors: ['green', 'blue', 'red','purple', 'gray', 'white', 'black']},
        backgroundColor: 'brown'
};
    let chart = new google.visualization.GeoChart(document.getElementById('mundotodo'));
    chart.draw(data, options);
}


function prepararDados(dados) {
    if (dados['data'].length > 0) {
        

        let confirmados = 0;

        for (let i = 0; i < dados['data'].length; i++) {

                confirmados[0] += dados[i].country;
                confirmados[1] += dados[i].confirmed;
        }

       console.log(dados);
    }
    return dados;
}


function exibirErro( ){

}

function exibirErro(mensagem) {
    let erro = document.getElementById('erro');
    erro.style.display = 'block';
    erro.innerHTML = '<b> Erro ao acessar a API:</b><br />' + mensagem;

}
        















































// function exibirErro(mensagem) {
//     let erro = document.getElementById('erro');
//     erro.style.display = 'block';
//     erro.innerHTML = '<b> Erro ao acessar a API:</b><br />' + mensagem;

// }

// async function obterDados() {
//     let erro = document.getElementById('erro');
//     erro.style.display = 'none';

//     await fetch('https://www.mercadobitcoin.net/api/BTC/trades')
//         .then(response => response.json())
//         .then(dados => prepararDados(dados))
//         .catch(e => exibirErro(e.mensagem));
// }
function prepararDados(dados) {
    if (dados.length > 0) {

        dados_linha = [['índice', 'Preço']];
        //dados_pizza = [['Negociação', 'Volume']];

        let compras = 0;
        let vendas = 0;


        for (let i = 0; i < dados.length; i++) {

            if (dados[i].type == 'sell') {

                vendas += dados[i].amount;

                dados_linha.push([new Date(dados[i].date * 1000), dados[i].price]);
            }
            else
                compras += dados[i].amount;
        }
        dados_pizza.push(['Comprar', compras ]);
        dados_pizza.push(['Vendas', vendas ]);
    }
    drawChart();
    drawChart2();
    
}

var dados_linha = [
    ['índice', 'Preço'],
    ['0', 0]
];
var dados_pizza = [
    ['Negociação', 'Volume'],
    ['0', 0]
];

//-----------------------------------------------------------


// google.charts.load('current', { 'packages': ['corechart'] });
// google.charts.setOnLoadCallback(drawChart);

// function drawChart() {
//     let data = google.visualization.arrayToDataTable(dados_linha);

//     let options = {
//         title: 'Variação de preço (Vendas)',
//         curveType: 'function',
//         legend: { position: 'bottom' }
//     };

//     let chart = new google.visualization.LineChart(document.getElementById('grafico'));

//     chart.draw(data, options);
// }


// google.charts.load('current', { 'packages': ['corechart'] });
// google.charts.setOnLoadCallback(drawChart2);

// function drawChart2() {

//     let data = google.visualization.arrayToDataTable(dados_pizza);

//     let options = {
//         title: 'Volume de negociações',
//         legend: { position: 'bottom' }
//     };

//     let chart = new google.visualization.PieChart(document.getElementById('grafico2'));

//     chart.draw(data, options);
// }




