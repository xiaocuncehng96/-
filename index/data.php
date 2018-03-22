<?php
	header("content-type:text/html;charset=utf-8");
	$arr = array(
		array(
			"name"=>"周伟聪",
			"pass"=>"123456"
		),
		array(
			"name"=>"龚霖",
			"pass"=>"123456"
		)
	);
	$user = $_POST["username"];
	$pass = $_POST["password"];
	$bStop=false;
	foreach($arr as $val){
		if($val["name"]==$user&&$val["pass"]==$pass){
			$bStop=true;
		}
	}
	$a = array(
		"code"=>1,
		"userID"=>$user
	);
	$b = array(
		"code"=>2,
		"title"=>"用户名或密码错误"
	);
	if($bStop){
		echo "登录成功";
	}else{
		echo "登录失败";
	}
?>