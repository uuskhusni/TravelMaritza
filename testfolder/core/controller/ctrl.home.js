/**
 * Created with JetBrains PhpStorm.
 * User: julisman
 * Date: 1/8/14
 * Time: 4:20 PM
 * To change this template use File | Settings | File Templates.
 */

define([

], function(){
    function Ctrlhome($scope,$timeout,serviceAjax,localStorageService,growl){
        //set level
        $scope.level = localStorageService.get('user');
        $scope.date  = {};
        $scope.harga = {};
        $scope.weatherbandung = serviceAjax.getWeather('Bandung');
        $scope.weatherjakarta = serviceAjax.getWeather('Jakarta');
        // load data jam keberangkatan
        serviceAjax.getDataFromServer('jamkeberangkatan','get_all')
            .then(function(data){
                if (data) {
                    $scope.jamkeberangkatan = data;
                    $scope.$apply();
                }
        });

        //load data harga
        serviceAjax.getDataFromServer('harga')
            .then(function(data){
                if (data) {
                    $scope.harga = data[0];
                    $scope.$apply();
                }
        });

        //function update harga tiket
        $scope.changeharga = function(){
            $scope.loading = true;
            serviceAjax.posDataToServer('harga','update',$scope.harga).then(function(data){
                if(data){
                    $timeout(function(){
                        $scope.loading = false;
                        growl.addSuccessMessage('Harga Berhasil Di Edit!',{ttl: 2000});
                    },2000);
                   }
            });
        };
        //function update password
        $scope.changePassword = function(){
            if($scope.password == $scope.passwordulangi && $scope.password != undefined ){
                $scope.loadingp = true;
                $scope.datapassword = {
                    'userid'   : $scope.level[0]['userid'],
                    'password' : $scope.password
                };
                serviceAjax.posDataToServer('user','changepassword',$scope.datapassword).then(function(data){
                    if(data){
                        $timeout(function(){
                            $scope.loadingp = false;
                            growl.addSuccessMessage('Password Berhasil Di Edit!',{ttl: 2000});
                            $scope.password ='';
                            $scope.passwordulangi ='';
                        },2000);
                    }
                });
            }else{
                growl.addWarnMessage('Password Tidak Sama !',{ttl: 2000});
            }


        };
        // Update function
        var updateTime = function() {
            $scope.date = new Date();
            $scope.jam = $scope.date.getHours();

            $scope.jamterdekat = [];
            for(var i in $scope.jamkeberangkatan)if( $scope.jamkeberangkatan.hasOwnProperty(i)){
                if(parseInt($scope.jamkeberangkatan[i]['jam']) > $scope.jam){
                    $scope.jamterdekat.push($scope.jamkeberangkatan[i]['jam']);
                }
            }
            $timeout(updateTime, 1000);
        };
        // Kick off the update function
        updateTime();
    }

    // set to global
    window.Ctrlhome = Ctrlhome;

    return Ctrlhome;
});