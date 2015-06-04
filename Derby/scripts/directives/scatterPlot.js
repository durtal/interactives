app
    .directive('scatterPlot', function() {

        function link(scope, element, attr) {

            // create dimensions
            var margin = {
                    top: 20,
                    right: 0,
                    bottom: 50,
                    left: 30
                },
                parentWidth = element[0].parentElement.offsetWidth,
                width = parentWidth - margin.left - margin.right,
                parentHeight = 522,
                height = parentHeight - margin.top - margin.bottom;
            // initialise vis
            var svg = d3.select(element[0])
                    .append('svg')
                    .attr('height', height)
                    .attr('width', parentWidth);

            // watch the x variable for changing sectional
            scope.$watch('vars', function(vars) {
                // remove old elements
                svg.selectAll('*').remove();
                // set data and vars
                var data = scope.data,
                    xMax = d3.max(_.pluck(data, vars.xVar)) + 1,
                    xMin = d3.min(_.pluck(data, vars.xVar)) - 1;
                // define scales
                var xRange = d3.scale.linear()
                        .domain([xMin, xMax])
                        .range([margin.left, width - margin.right]);
                    yRange = d3.scale.ordinal()
                        .domain(data.map(function(d) {
                            return d.pos;
                        }))
                        .rangePoints([margin.top, height - margin.bottom]),
                    xAxis = d3.svg.axis()
                        .scale(xRange)
                        .tickFormat(d3.format('.2f'))
                        .tickSize(2)
                        .ticks(6)
                        .tickSubdivide(true),
                    yAxis = d3.svg.axis()
                        .scale(yRange)
                        .tickSize(2)
                        .orient('left')
                        .tickSubdivide(true);
                // append the silks to the vis
                svg.selectAll('.silks')
                        .data(data)
                        .enter().append('svg:image')
                        .attr('xlink:href', function(d) {
                            return d[vars.silk];
                        })
                        .attr('x', function(d) {
                            return xRange(d[vars.xVar]) - 26;
                        })
                        .attr('y', function(d) {
                            return yRange(d[vars.yVar]) - 21;
                        })
                        .attr('width', 52)
                        .attr('height', 42)
                        .attr('class', 'runner')
                        .on('mouseover', function(d) {
                            tooltips.show(d);
                        })
                        .on('mouseout', function() {
                            tooltips.hide();
                        });
                // tooltips functions (better to add content in data as a string?)
                var tooltips = {}
                tooltips.show = function(d) {
                    d3.select('#horse')
                        .html(d[vars.yVar] + '.   ' + d[vars.horse]);
                    d3.select('#xVar')
                        .html(d[vars.xVar].toFixed(2));
                    d3.select('#zVar')
                        .html(d[vars.zVar].toFixed(2));
                    d3.select('#fsVar')
                        .html((d[vars.fsVar] * 100).toFixed(2) + '%');
                    d3.select('#tooltip')
                        .style('opacity', 1);
                };
                tooltips.hide = function() {
                    d3.select('#tooltip')
                        .transition()
                        .duration(200)
                        .style('opacity', 0);
                };
                // axes and axis labels
                svg.append('g')
                        .attr('class', 'x axis ' + vars.xVar)
                        .attr('transform', 'translate(0,' + (height - (margin.bottom / 2)) + ')')
                        .call(xAxis);
                svg.append('text')
                        .attr('class', 'x axis ' + vars.xVar)
                        .attr('text-anchor', 'end')
                        .attr('x', width)
                        .attr('y', height)
                        .text('Cumulative Time (sec)');
                svg.append('g')
                        .attr('class', 'y axis')
                        .attr('transform', 'translate(' + margin.left + ',0)')
                        .call(yAxis);
                svg.append('text')
                        .attr('class', 'y axis')
                        .attr('text-anchor', 'middle')
                        .attr('x', -(margin.bottom + margin.top))
                        .attr('y', 10)
                        .attr('transform', function() {
                            return 'rotate(-90)'
                        })
                        .text('Finishing Position');

            }, true);

        };

        return {
            restrict: 'E',
            scope: {
                data: '=',
                vars: '='
            },
            link: link
        };

    });
