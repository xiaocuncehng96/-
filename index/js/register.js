//正则验证
class Verify{
	constructor(){
		this.user = document.getElementById("username");
		this.pass = document.getElementById("password");
		this.pass1 = document.getElementById("password1");
		this.tel = document.getElementById("tel");
		this.email = document.getElementById("email");
		this.code = document.getElementById("code");
		this.code1 = document.querySelector(".code1");
		this.Bstop= false;
	}
	matching(){
		let _this =this;
		this.user.oninput = function(){
			_this.User(this);	
		}
		this.pass.oninput = function(){
			_this.Pass(this);
		}
		this.pass1.oninput = function(){
			_this.Pass1(this);
		}
		this.tel.oninput = function(){
			_this.Tel(this);
		}
		this.email.oninput = function(){
			_this.Email(this);
		}
		this.code.onblur = function(){
			_this.Code(this);
		}
		
	}
	User(that){
		let str = /^([a-z]|[0-9]){6,15}$/;
		let userval=this.user.value;
		if(str.test(userval)){
			that.nextElementSibling.style.display="block";
			that.nextElementSibling.nextElementSibling.style.display="none";
			this.Bstop = true;
		}else{
			that.nextElementSibling.style.display="none";
			that.nextElementSibling.nextElementSibling.style.display="block";
			this.Bstop = false;
		}	
	}
	Pass(that){
		let str= /^[a-zA-Z0-9_-]{6,20}$/;
		let passval=this.pass.value;
		if(str.test(passval)){
			that.nextElementSibling.style.display="block";
			that.nextElementSibling.nextElementSibling.style.display="none";
			this.Bstop = true;
		}else{
			that.nextElementSibling.style.display="none";
			that.nextElementSibling.nextElementSibling.style.display="block";
			this.Bstop = false;
		}
	}
	Pass1(that){
		let passval=this.pass.value;
		let pass1val=this.pass1.value;
		if(passval==pass1val){
			that.nextElementSibling.style.display="block";
			that.nextElementSibling.nextElementSibling.style.display="none";
			this.Bstop = true;
		}else{
			that.nextElementSibling.style.display="none";
			that.nextElementSibling.nextElementSibling.style.display="block";
			this.Bstop = false;
		}
	}
	Tel(that){
		let str = /^\d{11}$/;
		let telval=this.tel.value;
		if(str.test(telval)){
			that.nextElementSibling.style.display="block";
			that.nextElementSibling.nextElementSibling.style.display="none";
			this.Bstop = true;
		}else{
			that.nextElementSibling.style.display="none";
			that.nextElementSibling.nextElementSibling.style.display="block";
			this.Bstop = false;
		}
	}
	Email(that){
		let str = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
		let emailval=this.email.value;
		if(str.test(emailval)){
			that.nextElementSibling.style.display="block";
			that.nextElementSibling.nextElementSibling.style.display="none";
			this.Bstop = true;
		}else{
			that.nextElementSibling.style.display="none";
			that.nextElementSibling.nextElementSibling.style.display="block";
			this.Bstop = false;
		}
	}
	Code(that){
		if(code.value == code1.innerHTML){
			that.nextElementSibling.nextElementSibling.nextElementSibling.style.display="block";
			that.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.style.display="none";
			this.Bstop = true;
		}else{
			that.nextElementSibling.nextElementSibling.nextElementSibling.style.display="none";
			that.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.style.display="block";
			this.Bstop = false;
		}
	}
}
let p1 = new Verify();
p1.matching();
