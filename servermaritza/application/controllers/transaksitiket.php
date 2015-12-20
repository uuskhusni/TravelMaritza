<?php
/**
 * Created Sublimetext 3.
 * User: Kang Uus
 * Date: 9/12/15
 * Time: 12:24 PM
 * To change this template use File | Settings | File Templates.
 */
class Transaksitiket extends CI_Controller {



    function Transaksitiket()
    {
        parent::__construct();
        // set config database
        $this->load->model('Transaksitiket_model', '', TRUE);

    }

    public function index()
    {
        if ($this->session->userdata('login') == TRUE)
        {
            $this->get_all();
        }
        else
        {
           $data['login'] = false;
           echo json_decode($data);
        }


    }

    public function insert(){
        $data = json_decode(file_get_contents("php://input"));

        echo  $this->Transaksitiket_model->insert($data);
    }

    public function get($id){
        $data = new stdClass();
        $data->tanggal            = $this->uri->segment(3);
        $data->jamkeberangkatanid = $this->uri->segment(4);
        $data->tujuanshuttleid    = $this->uri->segment(5);
        $data->asalshuttleid      = $this->uri->segment(6);

        $transaksi_tiket          = $this->Transaksitiket_model->get($data);
        echo json_encode($transaksi_tiket);
    }
}
