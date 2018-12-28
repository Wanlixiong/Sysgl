<?php
    header("Access-Control-Allow-Origin:*");
    header('Content-Type: text/html;charset=utf-8');
    class dbOption{
        private $hostname;
        private $username;
        private $password;
        private $db_name;	#数据库名字
        private $link;  #数据库连接
        public function __construct(){
            $this->hostname= "localhost:8088";      //绑定服务器主机端口
            $this->username= "root";
            $this->password= "root";
            $this->db_name= "longjun";	#数据库名字
        }
        function conn(){
            $this->link=mysqli_connect($this->hostname,$this->username,$this->password) or die("连接数据库服务器失败！<br>");
            $this->link->select_db($this->db_name) or die("数据库选择失败！<br>");//面向对象
        }
        function close(){
            $this->$link->close() or die("无法关闭与数据库服务器的连接<br>");//面向对象
        }
        function zcg($sql){
            $json="";
            if($this->link->query($sql))//面向对象
                $json='{"code":1}';#增删改成功
            else
                $json='{"code":0}';#增删改失败                
            return $json;
        }
        function tz_row($sql){
            $result=$this->link->query($sql);//面向对象
            $json="";
            if($row=$result->fetch_object()){
                $a=array('id'=>$row->Id,'bt'=>$row->bt,'nr'=>$row->nr,'fbsj'=>$row->fbsj);
                $json=json_encode($a);
            }else{ 
                $json='{"id":0}';
            }                
            $result->free();          
            return $json;
        }
        function tz_rows($sql){
            $result=$this->link->query($sql);//面向对象
            $num=$result->num_rows;//面向对象 
            $a=array();
            $i=0 ;
            while($row=$result->fetch_object()){                           
                $b=array('id'=>$row->Id,'bt'=>$row->bt,'nr'=>$row->nr,'fbsj'=>$row->fbsj);
                $a[$i]=json_encode($b);
                $i++;
            }         
            $result->free();
            $json=json_encode($a); 
            return $json;
        }
    }
?>