//
// Main OPAL Dashboard application
//

var opalshim = OPAL.module('opal', []);

var services = OPAL.module('opal.dashboard.services', []);


var controllers = OPAL.module('opal.dashboard.controllers', [
    'opal.services',
    'opal.dashboard.services'
]);

var app = OPAL.module('opal.dashboard', [
    'ngRoute',
    'ngProgressLite',
    'ngCookies',
    'opal.filters',
    'opal.services',
    'opal.directives',
    'opal.controllers',
    'opal.dashboard.controllers'
]);
OPAL.run(app);

app.directive('lineChart', function($http){
    return function(scope, element, attrs){
        var el = element

        $http.get('/dashboards/widgets/line-chart/' + attrs.lineChart).then(
            function(response){

                var ticks = response.data[0]
                var tick_values = [
                    moment(ticks[1])._d,
                    moment(ticks[ticks.length/2])._d,
                    moment(ticks[ticks.length-1])._d
                ]

                console.log(tick_values)

                c3.generate({
                    bindto: el[0],
                    data: {
                        x: 'x',
                        columns: response.data,
                    },
                    color: {
                        pattern: [
                            '#f76c51', // Red
                            '#9cc96b', // Green
                            '#5fa2dd' // Blue
                        ]
                    },

                    axis: {
                        x: {
                            type: 'timeseries',
                            tick: {
                                fit: true,
                                format: '%Y-%m',
                                values: tick_values
                            }
                        }
                    }
                });
            }
        )
    }
})
