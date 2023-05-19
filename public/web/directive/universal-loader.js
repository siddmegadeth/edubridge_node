// Screen Loader Directive With Controller
app.directive("loader", function($rootScope) {
    return function($scope, element, attrs) {
        $scope.$on("loader_show", function() {
            return element.show();
        });
        return $scope.$on("loader_hide", function() {
            return element.hide();
        });
    };
})


app.directive('screenLoader', [function() {
    return {
        restrict: 'AE',
        template: ' <div id="loaderDiv" class="loading-spinner" loader><div class="loading-spinner-inner"><i class="fa-solid fa-spinner fa-spin fa-4x"></i></div></div>',
        link: function(scope, iElement, iAttrs) {

        }
    };
}])

