<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Julisman
 * Date: 7/7/13
 * Time: 12:25 PM
 * To change this template use File | Settings | File Templates.
 */

class Shuttle_model extends CI_Model {

    function Shuttle_model()
    {
        parent::__construct();
    }
    protected $tblname = 'shuttle';
    function get_all()
    {
        return $this->db->get($this->tblname)->result_array();
    }

    function insert($data){
      return $this->db->insert($this->tblname, $data);
    }
    function delete($id){
        return $this->db->delete($this->tblname, array('shuttleid' => $id));
    }
    function getbyid($id){
        return $this->db->get_where($this->tblname , array('shuttleid' => $id))->result_array();
    }
    function update($data){
        return  $this->db->query("update ".$this->tblname." set nama = '".$data->nama."' , kotaid = '".$data->kotaid."' where shuttleid =".$data->shuttleid);
    }
    function get_groupbykota($kotaid){
        //get shuttle
        $shuttle = $this->db->get_where($this->tblname,array('kotaid' => $kotaid))->result_array();
        $data = array();
        foreach($shuttle as $key => $val){
            $data['tujuan'][$val['kotaid']][$val['shuttleid']] = $val;
        }

        $shuttlekeberangkatan = $this->db->query("select * from ".$this->tblname." where kotaid != '".$kotaid."'")->result_array();
        foreach($shuttlekeberangkatan as $key => $val){
            $data['keberangkatan'][$val['kotaid']][$val['shuttleid']] = $val;
        }
        return $data;
    }
    function get(){
        //get shuttle
        $shuttle = self::get_all();
        $data = array();
        foreach($shuttle as $key => $val){
            $data['shuttle'][$val['kotaid']][$val['shuttleid']] = $val;
        }
        return $data;
    }

    function count(){
        return $this->db->count_all($this->tblname);
    }
}