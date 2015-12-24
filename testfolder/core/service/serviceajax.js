define([
    './../../app'
], function (app) {
    app.factory('serviceAjax' , ['$http', '$q',function($http,$q){

        return{
            getDataFromServer : function(){
                var params = '';
                for(var i = 0 ; i < arguments.length; i++){
                    params += arguments[i]+'/';
                }
                return $http.get(app['baseUrlServer'] + params)
                    .then(function(response){
                        if (response.data) {
                            return response.data;
                        } else {
                            // invalid response
                            return $q.reject(response.data);
                        }
                    },function(response){
                        // invalid response
                        return $q.reject(response.data);
                    });
            },

            posDataToServer : function(){
                var params = '',
                    data   = {};

                for(var i = 0 ; i < arguments.length; i++){
                    if(typeof arguments[i] === 'object'){
                        data = arguments[i];
                    }else{
                        params += arguments[i]+'/';
                    }
                }
                return  $http.post(app['baseUrlServer'] + params, data)
                    .then(function(response){
                        if (response.data) {
                            return response.data;
                        } else {
                            // invalid response
                            return $q.reject(response.data);
                        }
                    },function(response){
                        // invalid response
                        return $q.reject(response.data);
                    });
            },

            getWeather: function(kota) {
                var weather = { temp: {}, clouds: null };
                $http.jsonp('http://api.openweathermap.org/data/2.5/weather?q='+kota+',ID&units=metric&callback=JSON_CALLBACK')
                    .then(function(response) {
                        if (response['data']) {
                        if (response['data'].main) {
                            weather.temp.current = response['data'].main.temp;
                            weather.temp.min = response['data'].main.temp_min;
                            weather.temp.max = response['data'].main.temp_max;
                        }
                        weather.clouds = response['data'].clouds ? response['data'].clouds.all : undefined;
                    }
                });

                return weather;
            }
        }
    }]);

});