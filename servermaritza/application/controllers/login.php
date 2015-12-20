<?php
/**
 * Created Sublimetext 3.
 * User: Kang Uus
 * Date: 9/12/15
 * Time: 12:24 PM
 * To change this template use File | Settings | File Templates.
 */

class Login extends CI_Controller {


 
	function Login()
	{
		parent::__construct();
		$this->load->model('Login_model', '', TRUE);
	}
	 function index(){
         $data    = json_decode(file_get_contents("php://input"));
         $cekdata = $this->Login_model->cek_user($data->username, $data->password);

         echo json_encode($cekdata);
	 }

}
