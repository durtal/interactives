app
    .directive('slopegraph', function() {

        function link(scope, element, attr) {

            // create dimensions
            var margin = {
                    top: 10,
                    right: 30,
                    bottom: 10,
                    left: 30
            },
                parentWidth = element[0].parentElement.offsetWidth,
                width = parentWidth - margin.left - margin.right,
                parentHeight = 300,
                height = parentHeight - margin.top - margin.bottom;

            var svg = d3.select(element[0])
                    .append('svg')
                    .attr('height', height)
                    .attr('width', width);

            scope.$watch('vars', function(vars) {

                var data = scope.data;

                svg.selectAll('*').remove();

                svg.attr('class', vars.y2);
                var yMin = d3.min([d3.min(_.pluck(data, vars.y1)), d3.min(_.pluck(data, vars.y2))]),
                    yMax = d3.max([d3.max(_.pluck(data, vars.y1)), d3.max(_.pluck(data, vars.y2))]);

                // if yMax is greater than 2seconds ignore runners
                if(yMax > 2) {
                    yMax = 2;
                }
                var yScale = d3.scale.linear()
                        .domain([yMin, yMax])
                        .range([height - margin.top - margin.bottom, margin.top]);
                var yAxis = d3.svg.axis()
                        .scale(yScale)
                        .tickFormat(d3.format('.2f'))
                        .tickSize(2)
                        .orient('left');
                var yAxisRight = d3.svg.axis()
                        .scale(yScale)
                        .tickFormat(d3.format('.2f'))
                        .tickSize(2)
                        .orient('right');

                var lines = svg.selectAll('.slopes')
                        .data(data)
                        .enter().append('line')
                        .attr('x1', margin.left)
                        .attr('x2', width - margin.right)
                        .attr('y1', function(d) {
                            return yScale(d[vars.y1]);
                        })
                        .attr('y2', function(d) {
                            return yScale(d[vars.y2]);
                        })
                        .attr('class', 'slopes')
                        .attr('id', function(d) {
                            return 'pos' + d[vars.yVar];
                        })
                        .style('stroke-width', '2px')
                        .style('stroke', '#0080FF')
                        .style('opacity', 0.7)
                        .on('mouseover', function(d) {
                            tooltips.show(d);
                        })
                        .on('mouseout', function() {
                            tooltips.hide();
                        });

                var tooltips = {};
                tooltips.show = function(d) {
                    // fill tooltip
                    d3.select('#horse')
                        .html(d[vars.yVar] + '. ' + d[vars.horse]);
                    d3.select('#xVar')
                        .html(d[vars.xVar].toFixed(2));
                    d3.select('#zVar')
                        .html(d[vars.zVar].toFixed(2));
                    d3.select('#fsVar')
                        .html((d[vars.fsVar]).toFixed(2) + '%');
                    d3.select('#bhd-ldr')
                        .html(d[vars.y2].toFixed(2));
                    d3.select('#behind-leader')
                        .html('At the previous sectional ' + d[vars.horse] +
                            ' was ' +
                            d[vars.y1] +
                            's behind the leader, ' +
                            d[vars.horse] +
                            ' was ' +
                            d[vars.y2] +
                            's behind after the next sectional.');
                    d3.select('#tooltip')
                        .style('display', 'block')
                    // handle colors/opacity
                    d3.selectAll('.slopes, .runner')
                        .style('opacity', 0.1);
                    d3.selectAll('#pos' + d[vars.yVar])
                        .style('opacity', 1)
                        .style('stroke', '#d9220f');
                };
                tooltips.hide = function() {
                    // hide tooltip
                    d3.select('#tooltip')
                        .style('display', 'none');
                    // handle colors/opacity
                    d3.selectAll('.slopes, .runner')
                        .style('opacity', 1)
                        .style('stroke', '#0080FF');
                }

                // axes and labels
                svg.append('g')
                        .attr('class', 'slopegraph-axis')
                        .attr('transform', 'translate(' + margin.left + ',0)')
                        .call(yAxis);
                svg.append('g')
                        .attr('class', 'slopegraph-axis')
                        .attr('transform', 'translate(' + (width - margin.right) + ',0)')
                        .call(yAxisRight);

            }, true);

        }

        return {
            restrict: 'E',
            scope: {
                data: '=',
                vars: '='
            },
            link: link
        }

    })
