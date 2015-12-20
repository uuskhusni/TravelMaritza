<?php
/**
 * Created Sublimetext 3.
 * User: Kang Uus
 * Date: 9/12/15
 * Time: 12:24 PM
 * To change this template use File | Settings | File Templates.
 */
class Shuttle extends CI_Controller {

    var $limit = 5; // jumlah data yg muncul
    var $pageshow = 2; // jumlah page yg muncul

    function Shuttle()
    {
        parent::__construct();
        // set config database
        $this->load->model('Shuttle_model', '', TRUE);

    }

    public function index(){

    }
    public function count(){
        echo $this->Shuttle_model->count();
    }
    public function insert(){
        $data = json_decode(file_get_contents("php://input"));
        echo  $this->Shuttle_model->insert($data);
    }
    public function delete($id){
       echo $this->Shuttle_model->delete($id);
    }
    public function getbyid($id){
        //data harus berupa json
        echo json_encode($this->Shuttle_model->getbyid($id));
    }
    public  function update(){
        $data = json_decode(file_get_contents("php://input"));
        echo  $this->Shuttle_model->update($data);
    }

    public function get_all_bypaging(){
        $uri_segment = 3;
        $offset = $this->uri->segment($uri_segment);
        $page = isset($offset) ? $offset : 1;
        $shuttle = $this->Shuttle_model->get_all();
        $totaldata = count($shuttle);
        $pagetotal = ceil($totaldata / $this->limit);
        $pageshow = $pagetotal > $this->pageshow ? $this->pageshow : $pagetotal;
        $step = floor($pageshow / 2);
        $pagestart = ($page - $step) > 1 ? $page - $step : 1;
        $pageend = ($page + $step) < $pagetotal ? $page + $step : $pagetotal;
        if($pageend - $pagestart + 1 < $pageshow) {
            $pageend = $pagestart + $pageshow - 1;
            $pageend = $pageend > $pagetotal ? $pagetotal : $pageend;

            if($pageend - $pagestart + 1 < $pageshow){
                $pagestart = $pageend - $pageshow - 1;
                $pagestart = $pagestart > 1 ? $pagestart : 1;
            }
        }
        if($pageend - $pagestart + 1 > $pageshow) {
            if($pageend == $pagetotal){
                $pagestart = $pageend - $pageshow + 1;
            }
        }

        $pagination = array();
        for($i=$pagestart; $i<=$pageend; $i++){
            $pagination[] = $i;
        }

        $data = array_slice($shuttle, ($page-1) * $this->limit, $this->limit);
        $vData = array(
            'page' => $page,
            'pagefirst' => 1,
            'pagelast' => $pagetotal,
            'pagination' => $pagination,
            'data' => $data,
        );
        echo  json_encode($vData);

    }

    public function get_groupbykota(){
        $kotaid = $this->uri->segment(3);
        $shuttle = $this->Shuttle_model->get_groupbykota($kotaid);
        echo  json_encode($shuttle);
    }
    public function get(){
        $shuttle = $this->Shuttle_model->get();
        echo  json_encode($shuttle);
    }
}
