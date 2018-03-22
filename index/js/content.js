	//二级导航
function Nav(){
	this.cfy = document.getElementsByClassName("classify")[0];
	this.ht = document.getElementsByTagName("h2")[0];
	this.header = document.querySelector(".le");
	this.header1 = document.querySelector(".header-l")
	var _this=this;
	console.log(this.header)
	this.ht.onmouseover=function(e){
		var e=e||event;
		var target=e.target||e.srcElement;
		if(target.tagName=="A"){		
			target.className = "tgt";
		}
		move(_this.cfy,{"height":300})
	}
	this.ht.onmouseout=function(){
		var e=e||event;
		var target=e.target||e.srcElement;
		if(target.tagName=="A"){		
			target.className = "";
		}
		move(_this.cfy,{"height":0})
	}
	setInterval(function(){
		if(_this.header.className){
			_this.header.className = "";
			_this.header1.style.color = ""
		}else{
			_this.header.className = "Hactive";
			_this.header1.style.color = "red"
		}
	},500)
}
new Nav();
	//回到顶部
function Back(){
	this.back = document.getElementById("back");
	this.mask=document.getElementById("mask");
	var _this=this;
	window.onscroll=function(){
		var scroll = document.documentElement.scrollTop||document.body.scrollTop;
		scroll = parseInt(scroll);
		if(scroll>400){
		_this.back.style.display="block";
		}	
		if(scroll<400){
		_this.back.style.display="none";	
		}
		_this.mask.style.top=scroll+'px';
	}
}
new Back();
	//登入框
function Drag(){
	this.user=document.getElementsByName("username")[0];
	this.pass=document.getElementsByName("password")[0];
	this.che=document.getElementById("che");
	this.register=document.getElementsByClassName("register")[0];
	this.enroll=document.getElementsByClassName("enroll")[0];
	this.logo=document.getElementsByClassName("f-logo")[0];
	this.mask=document.getElementById("mask");
	this.enter=document.getElementsByName("enter")[0];
	this.del=document.getElementsByClassName("del")[0];
	this.sub=document.getElementsByName("sub")[0];
	this.divX = 0;
	this.divY = 0;
	var _this=this;
	this.register.onclick=function(){
		_this.mask.style.display="block";
	}
	this.del.onclick = function(){
		_this.mask.style.display="none";
	}
	//拖拽
	this.logo.onmousedown = function(e){
		_this.down(e);
	}
	this.user.oninput = function(){
		_this.onipnt(this);
	}
	this.sub.onclick = function(){
		_this.sclick();
	}
	if(getCookie("user")){
		var cookie=getCookie("user");
		this.user.value=cookie;
	}
	if(getCookie("paw")){
		var cookie1=getCookie("paw");
		this.pass.value=cookie1;
	}
}	
	Drag.prototype.down = function(e){
		var _this = this;
		var e = e||event;
		this.divX = e.offsetX;
    	this.divY = e.offsetY;
		document.onmousemove = function(e){
			_this.mov(e)
		}
		document.onmouseup = function(){
			_this.up()		
		}
	}
	Drag.prototype.mov = function(e){
		var e = e||event;
		this.enter.style.left = e.clientX- this.divX +'px';
		this.enter.style.top = e.clientY-this.divY+'px';
	}
	Drag.prototype.up = function(){
		document.onmousemove = null;
		document.onmouseup = null;
	}
	//正则验证		
	Drag.prototype.onipnt = function(that){
	var str=/^([a-z]|[0-9]){6,15}$/;
	var userval=this.user.value;
	console.log(this)
	if(str.test(userval)){
		that.nextElementSibling.innerHTML="√正确";
	}else{
		that.nextElementSibling.innerHTML="×错误";
		}
	}
	Drag.prototype.sclick = function(){
		var uval=this.user.value;
		var pval=this.pass.value;		
		if(che.checked){
			setCookie("user",uval,7);
			setCookie("paw",pval,7)
		}
		user.value='';
		paw.value='';
	}
new Drag();
