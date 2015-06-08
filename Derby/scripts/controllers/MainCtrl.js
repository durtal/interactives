app
    .controller('MainCtrl', function($scope, $filter, elevation, Derby2015) {

        // Controlling data
        $scope.nextSect = function() {
            $scope.sectional+=1;
            if($scope.sectional == 5) {
                $('.nextSect').addClass('disabled');
            }
            if($scope.sectional > 0) {
                $('.prevSect').removeClass('disabled');
            }
            $('.blog').css({'display':'none'});
            $('#s'+$scope.sectional).css({'display': 'block'});
        };
        $scope.prevSect = function() {
            $scope.sectional-=1;
            if($scope.sectional > 0) {
                $('.nextSect').removeClass('disabled');
            }
            if($scope.sectional == 0) {
                $('.prevSect').addClass('disabled');
            }
            $('.blog').css({'display':'none'});
            $('#s'+$scope.sectional).css({'display': 'block'});
        };
        // distance labels
        $scope.dists = ['Start', '5f', '8.5f', '10f', '11f', 'Finish'];
        $scope.sectional = 0;

        ////////////////////////////////////////////////////////////////////////
        // Sectional data in table
        $scope.raceData = Derby2015;
        $scope.topThree = _.filter($scope.raceData, function(i) {
            return i.pos <= 3;
        });
        // show all runners in table (or first 3)
        $scope.showAllBool = false;
        $scope.showAll = function() {
            $scope.showAllBool = !$scope.showAllBool;
            if($scope.showAllBool) {
                $scope.topThree = _.filter($scope.raceData, function(i) {
                    return i.pos <= $scope.raceData.length;
                });
                $('#showAll').html('Show Top Three');
            } else {
                $scope.topThree = _.filter($scope.raceData, function(i) {
                    return i.pos <= 3;
                });
                $('#showAll').html('Show All Runners');
            }
        }
        // function to re-order table
        var orderBy = $filter('orderBy');
        $scope.order = function(predicate, reverse) {
            $scope.topThree = orderBy($scope.topThree, predicate, reverse);
        };
        $scope.order('-pos', true);

        ////////////////////////////////////////////////////////////////////////
        // Elevation data
        $scope.elevation = elevation;
        $scope.elevationVars = {
            x: 'cum_dist',
            y: 'elevation'
        };

        // filter elevation to current sectional
        $elevationCompleted = _.filter($scope.elevation, function(i) {
            return i.sectional == $scope.sectional;
        });
        // sectional variables
        $scope.variables = {
            pos: 'pos',
            horse: 'horse',
            silk: 'silk',
            c: ['start', 'c5f', 'c8_5f', 'c10f', 'c11f', 'c12f'],                // cumulative times
            s: ['start', 's5f', 's8_5f', 's10f', 's11f', 's12f'],                // sectional times
            fs: ['start', 'fs7f', 'fs3_5f', 'fs2f', 'fs1f', 'start'],           // finishing speeds
            p: ['start', 'p5f', 'p8_5f', 'p10f', 'p11f', 'p12f'],                // sectional position
            bl: ['start', 'start', 'bl5f', 'bl8_5f', 'bl10f', 'bl11f', 'bl12f']  // behind leader
        };
        $scope.scatterVars = {
            horse: $scope.variables.horse,
            silk: $scope.variables.silk,
            xVar: $scope.variables.c[0],
            yVar: $scope.variables.pos,
            zVar: $scope.variables.s[0],
            fsVar: $scope.variables.fs[0],
            y1: $scope.variables.bl[0],
            y2: $scope.variables.bl[1]
        };
        // watch sectional to filter elevation
        $scope.$watch('sectional', function(i) {
            // update sectional ticker
            $scope.sectional = i;
            // filter elevation data
            $scope.elevationCompleted = _.filter($scope.elevation, function(i) {
                return i.sectional == $scope.sectional;
            });

            // update sectional scatterPlot
            $scope.scatterVars = angular.extend($scope.scatterVars, {
                xVar: $scope.variables.c[$scope.sectional],
                zVar: $scope.variables.s[$scope.sectional],
                fsVar: $scope.variables.fs[$scope.sectional],
                y1: $scope.variables.bl[$scope.sectional],
                y2: $scope.variables.bl[$scope.sectional+1]
            });

            // progress bar
            var progressBar = ['0%', (5/12)*100+'%', (8.5/12)*100+'%', (10/12)*100+'%', (11/12)*100+'%', (12/12)*100+'%'];
            d3.selectAll('.progress-bar')
                .style('width', progressBar[i]);
        });
    });
