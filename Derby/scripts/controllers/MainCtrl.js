app
    .controller('MainCtrl', function($scope, $filter, elevation, Derby2015) {

        // Controlling data
        $scope.nextSect = function() {
            $scope.sectional+=1;
            if($scope.sectional == 6) {
                $('.nextSect').addClass('disabled');
            }
            if($scope.sectional > 0) {
                $('.prevSect').removeClass('disabled');
            }
        };
        $scope.prevSect = function() {
            $scope.sectional-=1;
            if($scope.sectional > 0) {
                $('.nextSect').removeClass('disabled');
            }
            if($scope.sectional == 0) {
                $('.prevSect').addClass('disabled');
            }
        };
        // distance labels
        $scope.dists = ['start', '2f', '5f', '8.5f', '10f', '11f', 'finish'];
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
            $scope.showAllBool = $scope.showAllBool === false ? true : false;
            if($scope.showAllBool) {
                $scope.topThree = _.filter($scope.raceData, function(i) {
                    return i.pos <= $scope.raceData.length;
                });
            } else {
                $scope.topThree = _.filter($scope.raceData, function(i) {
                    return i.pos <= 3;
                });
            }
        }
        var orderBy = $filter('orderBy');
        // function to re-order table
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
            c: ['start', 'c2f', 'c5f', 'c8_5f', 'c10f', 'c11f', 'c12f'],
            s: ['start', 's2f', 's5f', 's8_5f', 's10f', 's11f', 's12f'],
            fs: ['fs12f', 'fs10f', 'fs7f', 'fs3_5f', 'fs2f', 'fs1f', 'fs0f'],
            p: ['start', 'p2f', 'p5f', 'p8_5f', 'p10f', 'p11f', 'p12f'],
            tooltip: ['tt0', 'tt2f', 'tt5f', 'tt8_5f', 'tt10f', 'tt11f', 'tt12f']
        };
        $scope.config = {
            horse: $scope.variables.horse,
            silk: $scope.variables.silk,
            xVar: $scope.variables.c[0],
            yVar: $scope.variables.pos,
            zVar: $scope.variables.s[0],
            fsVar: $scope.variables.fs[0]
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
            $scope.config = angular.extend($scope.config, {
                xVar: $scope.variables.c[$scope.sectional],
                zVar: $scope.variables.s[$scope.sectional],
                fsVar: $scope.variables.fs[$scope.sectional]
            });

            // progress bar
            var progressBar = ['0%', (2/12)*100+'%', (5/12)*100+'%', (8.5/12)*100+'%', (10/12)*100+'%', (11/12)*100+'%', (12/12)*100+'%'];
            d3.selectAll('.progress-bar')
                .style('width', progressBar[i]);
        });
    });
