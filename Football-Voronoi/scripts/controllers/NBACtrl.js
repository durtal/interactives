app
    .controller('NBACtrl', function($scope, NBA) {

        $scope.frame = 0;
        $scope.nextFrame = function() {
            if ($scope.frame == 17) {
                $scope.frame = 0;
            } else {
                $scope.frame +=1;
            }
            console.log($scope.frame);
        }
        $scope.prevFrame = function() {
            if ($scope.frame == 0) {
                $scope.frame = 17;
            } else {
                $scope.frame -=1;
            }
        }
        $scope.teams = NBA[$scope.frame];
        $scope.$watch('frame', function(i) {
            $scope.frame = i;
            $scope.teams = NBA[$scope.frame];
        });

    });
