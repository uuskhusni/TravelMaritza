<?php
/**
 * Created Sublimetext 3.
 * User: Kang Uus
 * Date: 9/12/15
 * Time: 12:24 PM
 * To change this template use File | Settings | File Templates.
 */

class User extends CI_Controller {


 
	function User()
	{
		parent::__construct();
		$this->load->model('User_model', '', TRUE);
	}
	 function changepassword(){
        $data    = json_decode(file_get_contents("php://input"));
        $user = $this->User_model->changepassword($data);
        echo json_encode($user);
	}
    public function insert(){
        $data = json_decode(file_get_contents("php://input"));
        echo  $this->User_model->insert($data);
    }
    public function updateisactive(){
        $data = json_decode(file_get_contents("php://input"));
        echo  $this->User_model->updateisactive($data);
    }
    public function get_all_bypaging(){
        $uri_segment = 3;
        $offset = $this->uri->segment($uri_segment);
        $page = isset($offset) ? $offset : 1;
        $user = $this->User_model->get_all();
        $totaldata = count($user);
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

        $data = array_slice($user, ($page-1) * $this->limit, $this->limit);
        $vData = array(
            'page' => $page,
            'pagefirst' => 1,
            'pagelast' => $pagetotal,
            'pagination' => $pagination,
            'data' => $data,
        );
        echo  json_encode($vData);

    }
}
