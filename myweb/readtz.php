<?php
    header("content-type:text/html;charset=utf-8");  
    require_once('dbOption.php');
    $id=$_GET["id"];
    $obj=new dbOption();
    $obj->conn();    
    if($id=="")
        echo '{"id":0}';
    $sql="select * from tzgg where id=$id";
    $r=$obj->tz_row($sql);    
    echo $r; 
    //$obj->close();    
?>