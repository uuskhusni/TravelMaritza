/**
 * Created with JetBrains PhpStorm.
 * User: julisman
 * Date: 1/13/14
 * Time: 9:21 AM
 * To change this template use File | Settings | File Templates.
 */
define([

], function(){
    function Ctrlshuttle($scope,serviceAjax,localStorageService,growl){
        //set level
        $scope.level = localStorageService.get('user');
        $scope.gotoPage = function(page){
            page = page == 'berikutnya' ? parseInt($scope.page) + 1 : page;
            serviceAjax.getDataFromServer('shuttle','get_all_bypaging',+page)
                .then(function(data){
                    if (data) {
                        $scope.shuttle          = data['data'];
                        $scope.page             = data['page'];
                        $scope.pagefirst        = data['pagefirst'];
                        $scope.pagelast         = data['pagelast'];
                        $scope.pagination       = data['pagination'];
                        $scope.$apply();
                    } else {

                    }
                });
        };

        $scope.gotoPage(1);
        $scope.modalJadual = function(action,id){
            if(action=='Tambah'){
                $scope.modaloption = 'show';
                $scope.action = action;
            }else if(action =='Edit'){
                serviceAjax.getDataFromServer('shuttle','getbyid',+id).then(function(data){
                    if (data) {
                        $scope.modaloption = 'show';
                        $scope.action = action;
                        $scope.data = data[0];
                        $scope.$apply();
                    } else {

                    }
                });
            }
        };
        $scope.closeModal = function(){
            $scope.modaloption = 'hide';
            $scope.data = '';
        };
        $scope.save = function(data,action){
            if(action == 'Tambah') $scope.simpan(data); else $scope.edit(data);
        };
        /*simpan*/
        $scope.simpan = function(data){
            serviceAjax.posDataToServer('shuttle','insert',data).then(function(data){
                if(data){
                    /*close modal*/
                    $scope.closeModal();
                    /*tamplikan list*/
                    $scope.gotoPage($scope.page);
                    growl.addSuccessMessage('Shuttle Berhasil Di Tambah!',{ttl: 2000});
                }
            });
        };
        $scope.delete = function(id){
            serviceAjax.getDataFromServer('shuttle','delete',+id).then(function(data){
                if(data.length > 0){
                    console.log('dalam fungsi');
                    /*close modal*/
                    $scope.closeModal();
                    /*tamplikan list*/
                    $scope.gotoPage($scope.page);
                    growl.addSuccessMessage('Shuttle Berhasil Di Delete!',{ttl: 2000});
                }
            });
        };
        $scope.edit = function(data){
            serviceAjax.posDataToServer('shuttle','update',data).then(function(data){
                if(data){
                    /*close modal*/
                    $scope.closeModal();
                    /*tamplikan list*/
                    $scope.gotoPage($scope.page);
                    growl.addSuccessMessage('Shuttle Berhasil Di Edit!',{ttl: 2000});
                }
            });
        }
    }
    // set to global
    window.Ctrlshuttle = Ctrlshuttle;

    return Ctrlshuttle;
});