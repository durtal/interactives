// from https://github.com/prcweb/d3-radialbar/
function radialBarChart() {

    // configurable variables
    var margin = {top: 20, right: 20, bottom: 20, left: 20},
        barHeight = 100,
        reverseLayerOrder = false,
        barColours = undefined,
        capitaliseLabels = false,
        domain = [0, 100],
        tickValues = undefined,
        colourLabels = false,
        tickCircleValues = [],
        transitionDuration = 1000;

    // scales and other useful things
    var numBars = null,
        barScale = null,
        keys = null,
        labelRadius = 0;

    function init(d) {
        // scale bar heights
        barScale = d3.scale.linear()
            .domain(domain)
            .range([0, barHeight]);
        // get data labels
        keys = d3.map(d[0].data).keys();
        // number of bars
        numBars = keys.length;
        // radius of key labels
        labelRadius = barHeight * 1.025;
    }

    function svgRotate(a) {
        return 'rotate(' + +a +')';
    }

    function svgTranslate(x, y) {
        return 'translate(' + +x + ',' + +y + ')';
    }

    function initChart(container) {
        // create svg
        var g = d3.select(container)
            .append('svg')
            .style('width', 2 * barHeight + margin.left + margin.right + 'px')
            .style('height', 2 * barHeight + margin.top + margin.bottom + 'px')
            .append('g')
            .classed('radial-barchart', true)
            .attr('transform', svgTranslate(margin.left + barHeight, margin.top + barHeight));
        // concentric circles at specified tick values
        g.append('g')
            .classed('tick-circles', true)
            .selectAll('circle')
            .data(tickCircleValues)
            .enter()
            .append('circle')
            .attr('r', function(d) {
                return barScale(d);
            })
            .style('fill', 'none');
    }

    function renderOverlays(container) {
        var g = d3.select(container)
            .select('svg g.radial-barchart');
        // spokes
        g.append('g')
            .classed('spokes', true)
            .selectAll('line')
            .data('keys')
            .enter()
            .append('line')
            .attr('y2', -barHeight)
            .attr('transform', function(d, i) {
                return svgRotate(i * 360 / numBars);
            });
        // axes
        var axisScale = d3.scale.linear()
            .domain(domain)
            .range([0, -barHeight]);
        var axis = d3.svg.axis()
            .scale(axisScale)
            .orient('right')
        if(tickValues) {
            axis.tickValues(tickValues);
        }
        g.append('g')
            .classed('axis', true)
            .call(axis);

        // outer circle
        g.append('circle')
            .attr('r', barHeight)
            .classed('outer', true)
            .style('fill', 'none');
        // labels
        var labels = g.append('g')
            .classed('labels', true);
        labels.append('def')
            .append('path')
            .attr('id', 'label-path')
            .attr('d', 'm0 ' + -labelRadius + ' a' + labelRadius + ' ' + labelRadius + ' 0 1,1 -0.01 0');
        labels.selectAll('text')
            .data(keys)
            .enter()
            .append('text')
            .style('text-anchor', 'middle')
            .style('fill', function(d, i) {
                return colourLabels ? barColours[i % barColours.length] : null;
            })
            .append('textPath')
            .attr('xlink:href', '#label-path')
            .attr('startOffset', function(d, i) {
                return i * 100 / numBars + 50 / numBars + '%';
            })
            .text(function(d) {
                return capitaliseLabels ? d.toUpperCase() : d;
            });
    }

    function chart(selection) {
        selection.each(function(d) {
            init(d);
            if(reverseLayerOrder) {
                d.reverse();
            }

            var g = d3.select(this)
                .select('svg g.radial-barchart');

            var update = g[0][0] !== null;

            // check whether chart has already been created
            if(!update) {
                initChart(this);
            }

            g = d3.select(this)
                .select('svg g.radial-barchart');

            // layer enter/exit/update
            var layers = g.selectAll('g.layer')
                .data(d);
            layers
                .enter()
                .append('g')
                .attr('class', function(d, i) {
                    return 'layer-' + i;
                })
                .classed('layer', true);

            // segment enter/exit/update
            var segments = layers
                .selectAll('path')
                .data(function(d) {
                    var m = d3.map(d.data);
                    return m.values();
                });
            segments
                .enter()
                .append('path')
                .style('fill', function(d, i) {
                    if(!barColours) return;
                    return barColours[i % barColours.length];
                });
            segments.exit().remove();
            segments
                .transition()
                .duration(transitionDuration)
                .attr('d', d3.svg.arc()
                    .innerRadius(0)
                    .outerRadius(or)
                    .startAngle(sa)
                    .endAngle(ea)
                );
            if(!update)
                renderOverlays(this);
        });
    }

    // arc functions
    or = function(d, i) {
        return barScale(d);
    }
    sa = function(d, i) {
        return (i * 2 * Math.PI) / numBars;
    }
    ea = function(d, i) {
        return ((i + 1) * 2 * Math.PI) / numBars;
    }

    // configuration getters/setters
    chart.margin = function(_) {
        if (!arguments.length) return barHeight;
        barHeight = _;
        return chart;
    };

    chart.reverseLayerOrder = function(_) {
        if (!arguments.length) return reverseLayerOrder;
        reverseLayerOrder = _;
        return chart;
    };

    chart.barHeight = function(_) {
        if (!arguments.length) return barHeight;
        barHeight = _;
        return chart;
    };

    chart.barColours = function(_) {
        if (!arguments.length) return barColours;
        barColours = _;
        return chart;
    }

    chart.capitaliseLabels = function(_) {
        if (!arguments.length) return capitaliseLabels;
        capitaliseLabels = _;
        return chart;
    }

    chart.domain = function(_) {
        if (!arguments.length) return domain;
        domain = _;
        return chart;
    }

    chart.tickValues = function(_) {
        if (!arguments.length) return tickValues;
        tickValues = _;
        return chart;
    }

    chart.colourLabels = function(_) {
        if (!arguments.length) return colourLabels;
        colourLabels = _;
        return chart;
    }

    chart.tickCircleValues = function(_) {
        if(!arguments.length) return tickCircleValues;
        tickCircleValues = _;
        return chart;
    }

    chart.transitionDuration = function(_) {
        if (!arguments.length) return transitionDuration;
        transitionDuration = _;
        return chart;
    }

    return chart;
}
