app
    .directive('nbaVoronoi', function() {

        function link(scope, element, attr) {
console.log(scope)
            var margin = {
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20
            },
                parentWidth = element[0].parentElement.offsetWidth,
                width = parentWidth - margin.left - margin.right,
                parentHeight = parentWidth * 0.5319148936170213,
                height = width * 0.5319148936170213;

            var svg = d3.select(element[0])
                    .append('svg')
                    .attr('height', height)
                    .attr('width', width)
                    .style('border', '1px solid #000000');

                    // BASKETBALL COURT
            if(scope.court) {
                svg.append('g')
                        .selectAll('line')
                        .data(scope.court.lines)
                        .enter()
                        .append('line')
                        .attr('x1', function(d) {
                            return d.x1 * width
                        })
                        .attr('x2', function(d) {
                            return d.x2 * width
                        })
                        .attr('y1', function(d) {
                            return d.y1 * height
                        })
                        .attr('y2', function(d) {
                            return d.y2 * height
                        })
                        .style({
                            'stroke': '#D8D8D8',
                            'stroke-width': 1
                        });
                svg.append('g')
                        .selectAll('circle')
                        .data(scope.court.circles)
                        .enter()
                        .append('circle')
                        .attr('cx', function(d) {
                            return d.cx * width;
                        })
                        .attr('cy', function(d) {
                            return d.cy * height;
                        })
                        .attr('r', function(d) {
                            return d.r * height;
                        })
                        .style('stroke', '#D8D8D8')
                        .style('stroke-width', 1)
                        .style('fill', 'none');
            }

            scope.$watch('data', function(data) {

                svg.selectAll('.player').remove();

                var data = data.map(function(d) {
                    // need to invert y axis as d3 plots from top left
                    return [d[0] * width, (1 - d[1]) * height];
                });

                var nPlayers = 5;

                var circles = svg.append('g')
                        .selectAll('circle')
                        .data(data)
                        .enter()
                        .append('circle')
                        .attr('class', 'player')
                        .attr('transform', function(d) {
                            return 'translate(' + d + ')';
                        })
                        .attr('id', function(d, i) {
                            return 'player' + i;
                        })
                        .attr('r', 5)
                        .style('fill', function(d, i) {
                            var col = '#034694';
                            if(i < nPlayers) {
                                col = '#D00027';
                            }
                            return col;
                        });

                var paths = svg.append('g')
                        .selectAll('path')
                        .data(d3.geom.voronoi(data))
                        .enter()
                        .append('path')
                        .attr('class', 'player')
                        .attr('d', function(d) {
                            return 'M' + d.join(',') + 'Z';
                        })
                        .style('fill-opacity', 0)
                        .style('stroke', '#000000')
                        .style('stroke-opacity', 0.2);

                paths.on('mouseover', function(d, i) {
                        var t = this;
                        tooltips.show(d, i, t);
                })
                    .on('mouseout', function() {
                        tooltips.hide();
                    });

                var tooltips = {};
                tooltips.show = function(d, i, t) {
                    d3.select(t)
                            .style('fill-opacity', 0.2)
                            .style('fill', '#FFFF00');

                        d3.select('tr#player' + i)
                            .style('font-weight', 'bold');
                    // calc distance to other players
                    var player = [];
                    scope.data.forEach(function(dat, i) {
                        var x = [d.point[0], (dat[0] * width)],
                            x = Math.pow((d3.max(x) - d3.min(x)), 2),
                            y = [d.point[1], ((1 - dat[1]) * height)],
                            y = Math.pow((d3.max(y) - d3.min(y)), 2),
                            z = Math.sqrt(x + y);
                        player[i] = {
                            'player' : 'player' + i,
                            'dist' : z
                        }
                    });
                    player.forEach(function(what) {
                        d3.select('td#' + what.player)
                            .html(what.dist.toFixed(0));
                    })
                }
                tooltips.hide = function() {
                    d3.selectAll('path')
                            .style('fill-opacity', 0);
                    d3.selectAll('tr')
                            .style('font-weight', 'normal');
                }

            }, true);
        };

        return {
            restrict: 'E',
            scope: {
                data: '=',
                court: '='
            },
            link: link
        }
    });
