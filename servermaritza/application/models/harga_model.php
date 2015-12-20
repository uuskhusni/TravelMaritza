<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Julisman
 * Date: 7/7/13
 * Time: 12:25 PM
 * To change this template use File | Settings | File Templates.
 */

class Harga_model extends CI_Model {

    function Harga_model()
    {
        parent::__construct();
    }
    protected $tblname = 'harga';

    function get()
    {
        return $this->db->get($this->tblname)->result_array();
    }

    function update($data){
        return  $this->db->query("update ".$this->tblname." set harga = '".$data->harga."' where hargaid =".$data->hargaid);
    }
}