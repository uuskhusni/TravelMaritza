<?php
/**
 * Created Sublimetext 3.
 * User: Kang Uus
 * Date: 9/12/15
 * Time: 12:24 PM
 * To change this template use File | Settings | File Templates.
 */
class Harga extends CI_Controller {


    function Harga()
    {
        parent::__construct();
        // set config database
        $this->load->model('Harga_model', '', TRUE);

    }

    public function index()
    {
        $this->get();
    }

    public function get(){
        echo json_encode($this->Harga_model->get());
    }

    public  function update(){

        $data = json_decode(file_get_contents("php://input"));
        echo  $this->Harga_model->update($data);
    }

}
