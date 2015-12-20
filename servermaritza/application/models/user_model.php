<?php

class User_model extends CI_Model {

	var $table = 'user';

    function User_model(){
		parent::__construct();
	}

	function changepassword($data){

        return  $this->db->query("update ".$this->table." set password = '".$data->password."' where userid =".$data->userid);

    }
    function get_all(){
        return  $this->db->query("SELECT userid,username, user.nama as nama, shuttle.nama as namashuttle, shuttle.shuttleid, level,kotaid, isactive FROM user,shuttle where user.shuttleid = shuttle.shuttleid and level != 'admin' ")->result_array();
    }
    function insert($data){
        return $this->db->insert($this->table, $data);
    }
    function updateisactive($data){
        return  $this->db->query("update ".$this->table." set isactive = '".$data->isactive."' where userid =".$data->userid);
    }
}
