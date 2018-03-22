var code1 = document.querySelector(".code1");
	var btn = document.getElementById("btn");
	var zhuce = document.querySelector(".zhuce");
	var user = document.getElementById("username");
	var pass = document.getElementById("password");
	var kuang = document.querySelectorAll("li>input");
	console.log(p1.code)
	code1.innerHTML = randomCode();
	btn.onclick = function(){
		code1.innerHTML = randomCode();
	}
	zhuce.onclick = function(){	
		if(!p1.Bstop){
			alert("您输入有误，请重新填写");
		}else{
			ajax("get"," http://datainfo.duapp.com/shopdata/userinfo.php",{"status":"register","userID":user.value,"password":pass.value},function(data){
			if(data == 1){
				alert("注册成功");
				location.href = "home.html"
			}else if(data == 1){
				alert("用户名已存在，请重新输入");
			}else{
				alert("服务器错误");
				location.reload(true)
			}
		})	
	}
}		