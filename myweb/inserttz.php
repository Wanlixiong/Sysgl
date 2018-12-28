<?php
    header("Access-Control-Allow-Origin:*");
    require_once('dbOption.php');
    $id=$_POST["id"];
    $bt=$_POST["bt"];
    $nr=$_POST["nr"];
    $obj=new dbOption();
    $obj->conn();
    $sql="";
    if($id==""){
        date_default_timezone_set('PRC');
        $d=date("Y-m-d H:i:s");
        $sql="insert into tzgg (bt,nr,fbsj) values('$bt','$nr','$d')";
    }else
        $sql="update tzgg set=$bt,nr=$nr where id=$id";  
    $r=$obj->zcg($sql);
    echo $r;  
    //$obj->close();
?>