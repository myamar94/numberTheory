angular.module("assignment", ["ui.router", "mainController"])

    .config(function ($stateProvider, $locationProvider, $urlRouterProvider) {

        $stateProvider

            .state("home", {

                url: "/",
                templateUrl: "./views/index.html",
                controller: "mainCtrl"
            })

            .state("pie-chart", {

                url: "/pie-chart",
                templateUrl: "./views/pie-chart.html"
               
            })

        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');
    });