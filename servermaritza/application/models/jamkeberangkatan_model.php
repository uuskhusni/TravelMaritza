<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Julisman
 * Date: 7/7/13
 * Time: 12:25 PM
 * To change this template use File | Settings | File Templates.
 */

class Jamkeberangkatan_model extends CI_Model {

    function Jamkeberangkatan_model()
    {
        parent::__construct();
    }
    protected $tblname = 'jamkeberangkatan';
    function get_all()
    {
        return $this->db->get($this->tblname)->result_array();
    }

    function insert($data){
      return $this->db->insert($this->tblname, $data);
    }
    function delete($id){
        return $this->db->delete($this->tblname, array('jamkeberangkatanid' => $id));
    }
    function getbyid($id){
        return $this->db->get_where($this->tblname , array('jamkeberangkatanid' => $id))->result_array();
    }
    function update($data){
        return  $this->db->query("update ".$this->tblname." set jam = '".$data->jam."' where jamkeberangkatanid =".$data->jamkeberangkatanid);
    }
    function count(){
        return $this->db->count_all($this->tblname);
    }
}