define([

], function(){
    function Ctrlpemesanan($scope,serviceAjax,growl,$sce,localStorageService){
        // set type data object
        $scope.data = {};
        // tampung informasi user ke variabel user
        var user = localStorageService.get('user');
        $scope.data.userid = user[0]['userid'];
        $scope.judulform = 'Pilih Tujuan Anda';
        $scope.indikatorform = 'width: 0%';
        //ambil data shuttle tujuan
        serviceAjax.getDataFromServer('shuttle','get_groupbykota',$scope.actions)
            .then(function(data){
                if (data) {
                    $scope.shuttletujuan        = data['tujuan'];
                    $scope.shuttlekeberangkatan = data['keberangkatan'];
                    $scope.$apply();
                }
        });
        //load data harga
        serviceAjax.getDataFromServer('harga')
            .then(function(data){
                if (data) {
                  $scope.data.harga = data[0]['harga'];
                  $scope.$apply();
                }
            });
        $scope.isNumber = function(n){
            if(!isNaN(parseFloat(n)) && isFinite(n)){

            }else{
                $scope.data.jumlah ='';
                growl.addWarnMessage('Jumlah Hanya Boleh Angka !',{ttl: 2000});
            }

        };

        $scope.prosesdua = function() {
            var validasi = true;

            if($scope.data.tanggal === undefined ){
                validasi = false;
                growl.addWarnMessage('Tanggal tidak boleh kosong !',{ttl: 2000});
            }
            if($scope.data.asal === undefined ){
                validasi = false;
                growl.addWarnMessage('Keberangkatan tidak boleh kosong !',{ttl: 2000});
            }
            if($scope.data.tujuan === undefined ){
                validasi = false;
                growl.addWarnMessage('Tujuan tidak boleh kosong !',{ttl: 2000});
            }
            if($scope.data.jumlah === undefined ){
                validasi = false;
                growl.addWarnMessage('Jumlah tidak boleh kosong !',{ttl: 2000});
            }

            if(validasi){
                $scope.judulform = 'Pilih Jadual Keberangkatan';
                $scope.indikatorform = 'width: 30%';
                $scope.halaman ='dua';

                //ambil data jam keberangkatan
                serviceAjax.getDataFromServer('jamkeberangkatan')
                    .then(function(data){
                        if (data) {
                            // tampilkan list jam yang lebih dari jam sekarang
                            $scope.jam      = data;
                            $scope.date     = new Date();
                            $scope.jamskrng = $scope.date.getHours();

                            $scope.arrayjam = [];
                            var o = 0;
                            for(var j in $scope.jam)if( $scope.jam.hasOwnProperty(j)){
                               // $scope.arrayjam[j] = j;
                                if(parseInt($scope.jam[j]['jam']) > $scope.jamskrng){
                                    $scope.arrayjam[o] = {
                                        'jamkeberangkatanid' : $scope.jam[j]['jamkeberangkatanid'],
                                        'namajam'            : $scope.jam[j]['jam']
                                    };
                                    o++;
                                }
                            }

                        }
                    });

                $scope.data.namapemesan = [];
                for(var i = 0; i < $scope.data.jumlah;i++){
                    $scope.data.namapemesan[i] = {nama:''}
                }
            }
        };

        $scope.prosestiga = function(id,jam){
            $scope.judulform = 'Informasi Penumpang';
            $scope.indikatorform = 'width: 60%';
            $scope.halaman ='tiga';
            $scope.data.jam = jam
            $scope.data.jamkeberangkatanid = id
        };

        $scope.prosesempat = function(){
            var validasi = true;
            for(var i =0;i < $scope.data.jumlah; i++){
                if($scope.data.namapemesan[i]['nama'] == '' || $scope.data.namapemesan[i]['nama'] == undefined){
                    validasi = false;
                    growl.addWarnMessage('Nama Pemesan '+(i+1) ,{ttl: 2000});
                }
            }

            if($scope.data.nohp === undefined ){
                validasi = false;
                growl.addWarnMessage('No Hp tidak boleh kosong !',{ttl: 2000});
            }

            if(validasi){
                $scope.judulform = 'Pilih Kursi';
                $scope.indikatorform = 'width: 80%';
                $scope.halaman ='empat';
                $scope.kursi =[];
                for(var i =1;i<11;i++){
                    // array of object

                    $scope.kursi[i] = { status:'free',
                        isi:$sce.trustAsHtml('<img src="./image/kursi-kosong.png">')};
                }
                $scope.cekKursi = function(){
                    // karena $scope.data.tujuan bernilai shuttleid-nama
                    // maka kita split terlebih dahulu untuk mengambil shuttleidnya saja dengan fungsli split()
                    var asalshuttleid  = $scope.data.asal.split('-');
                    var tujuanhuttleid = $scope.data.tujuan.split('-');
                    serviceAjax.getDataFromServer('transaksitiket','get',$scope.data.tanggal, $scope.data.jamkeberangkatanid,tujuanhuttleid[0], asalshuttleid[0])
                    .then(function(data){
                        if (data) {
                            $scope.datakursi = data;
                            //cek no kursi jika sudah ada yang pesan maka status menjadi book tidak bisa di pilih
                            angular.forEach($scope.datakursi, function(value, key){
                                $scope.kursi[value.nokursi] = { status:'book',
                                isi:$sce.trustAsHtml('<img src="./image/kursi-terisi.png">')};
                                $scope.$apply();
                            });
                        }
                    });
                 };

                 $scope.cekKursi();

                $scope.pilihkursi = function(id){
                    if($scope.kursi[id].status == 'free'){
                        if($scope.data.jumlah == "0"){
                            growl.addWarnMessage('jumlah kursi yang dipilih sudah melebihi jumlah pemesanan !',{ttl: 2000});
                        }else{
                            $scope.kursi[id] = {  status:'lock',isi:$sce.trustAsHtml('<img src="./image/kursi-terpilih.png">')}
                            $scope.data.jumlah = parseInt($scope.data.jumlah) - 1;
                        }
                    }else if($scope.kursi[id].status == 'book'){
                        growl.addWarnMessage('Kursi Sudah Di Pesan Silahkan Pilih Kursi Yang Kosong !',{ttl: 5000});
                    }else if($scope.kursi[id].status == 'lock'){
                        $scope.kursi[id] = {status:'free',isi:$sce.trustAsHtml('<img src="./image/kursi-kosong.png">')}
                        $scope.data.jumlah = parseInt($scope.data.jumlah) + 1;
                    }
                };
            }

        };

        $scope.selesai = function(){
            if($scope.data.jumlah == "0"){
                for(var j = 0; j < $scope.data.namapemesan.length;j++){
                    var i    = 1,
                        loop = true;
                    do{
                        if($scope.kursi[i]['status'] == 'lock'){
                            $scope.data.namapemesan[j] = {
                                'nama'    : $scope.data.namapemesan[j]['nama'],
                                'nokursi' : i
                            };
                            //set status kursi yang di simpan ke penumpang pertama menjadi book
                            $scope.kursi[i]['status'] = 'book';
                            loop = false;
                        }
                        i++;
                    }while(loop);
                }

                serviceAjax.posDataToServer('transaksitiket','insert',$scope.data).then(function(data){
                    if (data.length > 0) {
                        growl.addWarnMessage("Penyimpanan Berhasil",{ttl: 2000});
                        $scope.judulform     = 'Selesai';
                        $scope.halaman       = 'lima';
                        $scope.indikatorform = 'width: 100%';
                    } else {
                        growl.addWarnMessage("Peroses Penyimpanan Data Gagal",{ttl: 2000});
                    }
                });

            }else{
                growl.addWarnMessage('Anda Belum Memilih Kursi Atau Kursi Yang Anda Pilih Belum Sesuai Dengan Jumlah Pemesanan !',{ttl: 5000});
            }
        };


    }
    // set to global
    window.Ctrlpemesanan = Ctrlpemesanan;

    return Ctrlpemesanan;
});