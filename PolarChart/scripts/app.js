d3.json('data/data.json', function(err, data) {
    var chart = radialBarChart()
        .barHeight(250)
        .reverseLayerOrder(true)
        .capitaliseLabels(true)
        .barColours(['#B66199', '#9392CB', '#76D9FA', '#BCE3AD', '#FFD28C', '#F2918B'])
        .domain([0,10])
        .tickValues([1,2,3,4,5,6,7,8,9,10])
        .tickCircleValues([1,2,3,4,5,6,7,8,9]);
    d3.select('#chart')
        .datum(data)
        .call(chart);
});
