<?php
    header("content-type:text/html;charset=utf-8");  
    require_once('dbOption.php');
    $keyword=$_POST["keyword"];
    $obj=new dbOption();
    $obj->conn();
    $sql="";
    if($keyword=="")
        $sql="select * from tzgg";
    else
        $sql="select * from tzgg where bt like '%$keyword%' or nr like '%$keyword%'";
    $r=$obj->tz_rows($sql);
    echo $r;
/*    $num=count($r,1);
    echo "记录数=".$num."<br>";
    echo "用户名=".$r[0][0]."，密码=".$r[0][1];
 
    $sql="select * from yhb";
    $a=$obj->yhb_rows($sql);
    $num=count($a,1);
    echo "记录数=".$num."<br>";
    echo "用户名=".$a[0][0]."，密码=".$a[0][1];*/
   // $obj->close();
?>