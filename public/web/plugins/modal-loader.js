app.directive('bootstrapModal', function() {
    return {
        restrict: 'EA',
        scope: {
            title: '=modalTitle',
            header: '=modalHeader',
            body: '=modalBody',
            footer: '=modalFooter',
            callbackbuttonleft: '&ngClickLeftButton',
            callbackbuttonright: '&ngClickRightButton',
            handler: '=lolo'
        },
        templateUrl: 'components/directive/modal-loader.html',
        transclude: true,
        controller: function($scope) {
            $scope.handler = 'pop';
            alert();
        },
    };
});