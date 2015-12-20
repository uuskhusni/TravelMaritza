<?php

class Login_model extends CI_Model {

	 var $table = 'user';
	function Login_model()
	{
		parent::__construct();
	}
	

	function cek_user($username, $password){

         return  $this->db->query("SELECT userid,username, user.nama as nama, shuttle.nama as namashuttle, shuttle.shuttleid, level,kotaid FROM user,shuttle where user.shuttleid = shuttle.shuttleid and isactive = 1 and username = '".$username."' and password = '".$password."'")->result_array();
	}

}
