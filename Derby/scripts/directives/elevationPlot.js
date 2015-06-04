app
    .directive('elevationPlot', function() {

        function link(scope, element, attr) {

            // create dimensions
            var margin = {
                    top: 10,
                    right: 15,
                    bottom: 35,
                    left: 45
                },
                    parentWidth = element[0].parentElement.offsetWidth,
                    width = parentWidth - margin.left - margin.right,
                    parentHeight = parentWidth / 6 * 2.5,
                    height = parentHeight - margin.top - margin.bottom;

            // define variables
            var xVar = scope.vars.x,
                yVar = scope.vars.y,
                data = scope.data;
            // initialise vis
            var svg = d3.select(element[0])
                    .append('svg')
                    .attr('height', height)
                    .attr('width', width);
            // define scales
            var xRange = d3.scale.linear()
                    .range([margin.left, width - margin.right])
                    .domain([d3.min(data, function(d) {
                        return d[xVar];
                    }), d3.max(data, function(d) {
                        return d[xVar];
                    })]),
                yRange = d3.scale.linear()
                    .range([height - margin.bottom, margin.top])
                    .domain([d3.min(data, function(d) {
                        return d[yVar];
                    }), d3.max(data, function(d) {
                        return d[yVar];
                    })]),
                xAxis = d3.svg.axis()
                    .scale(xRange)
                    .tickSize(2)
                    .tickSubdivide(true)
                    .tickFormat(d3.format('d')),
                yAxis = d3.svg.axis()
                    .scale(yRange)
                    .tickSize(2)
                    .orient('left')
                    .tickSubdivide(true);
            // axes and axis labels
            svg.append('g')
                    .attr('class', 'y axis')
                    .attr('transform', 'translate(' + margin.left + ',0)')
                    .call(yAxis);
            svg.append('g')
                    .attr('class', 'x axis')
                    .attr('transform', 'translate(0,' + (height - margin.bottom) + ')')
                    .call(xAxis);
            svg.append('text')
                    .attr('class', 'x axis')
                    .attr('text-anchor', 'end')
                    .attr('x', width)
                    .attr('y', height-5)
                    .text('Distance (m)');
            svg.append('text')
                    .attr('class', 'y axis')
                    .attr('text-anchor', 'middle')
                    .attr('x', -(margin.bottom + margin.top))
                    .attr('y', 10)
                    .attr('transform', function(d) {
                        return 'rotate(-90)';
                    })
                    .text('Elevation (m)');

            // lines function
            var lines = d3.svg.line()
                    .x(function(d) {
                        return xRange(d[xVar]);
                    })
                    .y(function(d) {
                        return yRange(d[yVar]);
                    })
                    .interpolate('linear');
            // add elevation path
            var path = svg.append('path')
                    .attr('d', lines(data))
                    .attr('stroke', '#85E432')
                    .attr('stroke-width', 2)
                    .attr('fill', 'none')
                    .attr('class', 'derby-elevation');


            scope.$watch('sectionalcompleted', function(d) {
                // remove old sectional-completed path
                svg.selectAll('.sectional-completed')
                        .remove();
                // add new sectional-completed path
                var sect = svg.append('path')
                        .attr('stroke', '#D9220F')
                        .attr('stroke-width', 5)
                        .attr('fill', 'none')
                        .attr('class', 'sectional-completed')
                        .attr('d', lines(d));
            }, true);
        }

        return {
            restrict: 'E',
            scope: {
                data: '=',
                sectionalcompleted: '=',
                vars: '='
            },
            link: link
        };
    });
