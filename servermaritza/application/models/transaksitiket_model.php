<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Julisman
 * Date: 7/7/13
 * Time: 12:25 PM
 * To change this template use File | Settings | File Templates.
 */

class Transaksitiket_model extends CI_Model {

    function Transaksitiket_model()
    {
        parent::__construct();
    }
    protected $tblname = 'transaksi_tiket';
    function get($data)
    {
        return $this->db->get_where($this->tblname,array('tanggal' => $data->tanggal,'jamkeberangkatanid' => $data->jamkeberangkatanid,
                                                         'tujuanshuttleid' => $data->tujuanshuttleid,'asalshuttleid' => $data->asalshuttleid))->result_array();
    }

    function insert($data){

        $listtujuan =  explode('-',$data->tujuan);
        $listasal   =  explode('-',$data->asal);
        $data->tujuanshuttleid = $listtujuan[0];
        $data->asalshuttleid   = $listasal[0];
        try{
            foreach($data->namapemesan as $key => $val){
                $datainsert = new stdClass();
                $datainsert->userid             = $data->userid;
                $datainsert->tanggal            = $data->tanggal;
                $datainsert->jamkeberangkatanid = $data->jamkeberangkatanid;
                $datainsert->tujuanshuttleid    = $data->tujuanshuttleid;
                $datainsert->asalshuttleid      = $data->asalshuttleid;
                $datainsert->asalshuttleid      = $data->asalshuttleid;
                $datainsert->nokursi            = $val->nokursi;
                $datainsert->nama               = $val->nama;
                $datainsert->nohp               = $data->nohp;
                $datainsert->harga              = $data->harga;
                $this->db->insert($this->tblname, $datainsert);
            }
            return 1;
        } catch (Exception $e) {

        }
    }


}