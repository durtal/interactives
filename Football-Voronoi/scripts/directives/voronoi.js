app
    .directive('voronoi', function() {

        function link(scope, element, attr) {

            var margin = {
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20
            },
                parentWidth = element[0].parentElement.offsetWidth,
                width = parentWidth - margin.left - margin.right,
                parentHeight = parentWidth * 0.64,
                height = width * 0.64;

            var svg = d3.select(element[0])
                    .append('svg')
                    .attr('height', height)
                    .attr('width', width)
                    .style('border', '1px solid #000000');

            scope.$watch('data', function(data) {

                svg.selectAll('*').remove();

                var data = data.map(function(d) {
                    return [d[0] * width, (1 - d[1]) * height];
                });

                var nPlayers;
                if (data.length > 10) {
                    nPlayers = 11;
                } else {
                    nPlayers = 5;
                }
                var circles = svg.append('g')
                        .selectAll('circle')
                        .data(data)
                        .enter()
                        .append('circle')
                        .attr('transform', function(d) {
                            return 'translate(' + d + ')';
                        })
                        .attr('r', 5)
                        .style('fill', function(d, i) {
                            var col = '#034694';
                            if(i < nPlayers) {
                                col = '#D00027';
                            }
                            return col;
                        });

                if (scope.show) {
                    var paths = svg.append('g')
                            .selectAll('path')
                            .data(d3.geom.voronoi(data))
                            .enter()
                            .append('path')
                            .attr('d', function(d) {
                                return 'M' + d.join(',') + 'Z';
                            })
                            .style('fill-opacity', 0)
                            .style('stroke', '#424242')
                            .style('stroke-opacity', 0.2);
                    paths.on('mouseover', function(d, i) {
                        // d contains data for path and point
                        // d.point is x,y coords
                        var t = this;
                        tooltips.show(d, i, t);
                    })
                    .on('mouseout', function() {
                        tooltips.hide();
                    });

                }

            }, true);

            scope.$watch('show', function(show) {

                if (show) {
                    var data = scope.data.map(function(d) {
                        return [d[0] * width, (1 - d[1]) * height];
                    });

                    var paths = svg.append('g')
                            .selectAll('path')
                            .data(d3.geom.voronoi(data))
                            .enter()
                            .append('path')
                            .attr('d', function(d) {
                                return 'M' + d.join(',') + 'Z';
                            })
                            .style('fill-opacity', 0)
                            .style('stroke', '#424242')
                            .style('stroke-opacity', 0.2);

                    paths.on('mouseover', function(d, i) {
                        // d contains data for path and point
                        // d.point is x,y coords
                        var t = this;
                        tooltips.show(d, i, t);
                    })
                    .on('mouseout', function() {
                        tooltips.hide()
                    });

                } else {
                    d3.selectAll('path').remove();
                }

            });

            var tooltips = {};
            tooltips.show = function(d, i, t) {
                d3.select(t)
                        .style('fill-opacity', 0.2)
                        .style('fill', '#FFFF00');
            }
            tooltips.hide = function() {
                d3.selectAll('path')
                        .style('fill-opacity', 0);
            }

        }

        return {
            restrict: 'E',
            scope: {
                data: '=',
                vars: '=',
                show: '='
            },
            link: link
        }
    });
