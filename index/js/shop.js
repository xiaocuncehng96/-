function Car(){
	this.detail = document.getElementsByClassName("detail")[0];
	this.str = '';
	this.num ;
	var _this = this;
	
	this.p1 = new Promise(function(resolve,reject){
		ajax("get","json/home.json",{},function(data){
			_this.appen();
			resolve(data);
		})
	})
	this.p1.then(function(data){
		_this.app(data)
	})
}
Car.prototype.appen = function(){
	if(getCookie("shop")){
		this.num = JSON.parse(getCookie("shop"))
	}	
}
Car.prototype.app = function(data){
	for(var i in this.num){
		for(var j=0;j<data.length;j++){
			
			if(i==data[j].id){
				this.str+=`<div data-id=${data[j].id}>
				<span>
					<input type="checkbox" class="choice"/>
				</span>
				<span>
					<img src=${data[j].imgres}/>
					<i>${data[j].title}</i>
				</span>
				<span >${data[j].price}</span>
				<span>
					<button class="subtract" type="button">-</button>
					<input type="text"  value=${this.num[i]} class="num">
					<button class="add" type="button">+</button>
				</span>
				<span class = "price">
					￥${(data[j].price.substr(1)*this.num[i]).toFixed(2)}
				</span>
				<span><button type="button" class="remove">删除</button></span>
				</div>`
			}
		}
	}
	this.detail.innerHTML = this.str;
	new cartOperation();
}
new Car();
function cartOperation(){
	this.all = document.querySelector(".all");
	this.choice = document.querySelectorAll(".choice");
	this.add = document.querySelectorAll(".add");
	this.subtract = document.querySelectorAll(".subtract");
	this.total = document.querySelector(".total");
	this.remove = document.querySelectorAll(".remove");
	this.num = JSON.parse(getCookie("shop"));
	this.price = document.querySelectorAll(".price");
	this.btn = document.querySelector(".get1");
	this.shou = document.querySelector("#shou");
	this.input = document.querySelectorAll(".num")
	this.sum = 0;
	this.sum1 =0;
	var _this =this;
	console.log(this.sum)
	//全选
	this.all.onclick = function(){
		_this.checkAll();
	}
	//加
	for(var i=0;i<this.add.length;i++){
		this.add[i].onclick =  function(){
			_this.Add(this);			
		}
	}
	//减
	for(var i=0;i<this.subtract.length;i++){
		this.subtract[i].onclick =  function(){
			_this.Subtract(this);			
		}
	}
	//删除
	
	for(var i=0;i<this.remove.length;i++){
		this.remove[i].onclick =  function(){
			_this.Remove(this);			
		}
	}
	//单选
	for(var i = 0;i<this.choice.length;i++){
			this.choice[i].onclick = function(){
				_this.all.checked = '';
				if(this.checked ){
					_this.Choice(this);
				}else{
					_this.Choice1(this);
				}
			}
		}
	//结算
	this.btn.onclick =function(){
		if(_this.shou.style.display){
		_this.shou.style.display = "none"
		}else{
			_this.shou.style.display = "block"
		}
	}
	//设置输入框
	for(var i = 0;i<this.input.length;i++){
		this.input[i].onblur = function(){
			_this.set(this);
		}
	}
	//获取焦点
	for(var i = 0;i<this.input.length;i++){
		this.input[i].onfocus = function(){
			_this.sum1 = this.parentNode.nextElementSibling.innerHTML.split("￥")[1];
			_this.sum1 = Number(_this.sum1)
		}
	}
}
cartOperation.prototype.checkAll = function(){
	this.sum = 0
	for(var i = 0;i<this.choice.length;i++){
		if(this.all.checked){
			this.choice[i].checked = "checked";			
			var n = this.price[i].innerHTML.split("￥")[1];
			n = Number(n);
			this.sum+=n;
			this.total.innerHTML = "￥"+this.sum.toFixed(2);	
			//console.log(this.sum);
		}else{
			this.choice[i].checked = "";
			this.sum = 0;
			this.total.innerHTML ="￥"+this.sum.toFixed(2);			
		}	
	}	
}
cartOperation.prototype.Add = function(that){
	var txtVal = Number(that.previousElementSibling.value);
	txtVal++;
	that.previousElementSibling.value = txtVal;
	var pic = ((that.parentNode.previousElementSibling.innerHTML).split("￥")[1]);
	that.parentNode.nextElementSibling.innerHTML = "￥"+(pic*txtVal).toFixed(2);
	if(that.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.children[0].checked){
		this.sum = this.total.innerHTML.split('￥')[1];
		this.sum = Number(this.sum);	
		this.sum +=Number(pic);
		console.log(this.sum,pic)
		this.total.innerHTML = '￥'+this.sum.toFixed(2);
	}
	for(var j in this.num){
		var ID = that.parentNode.parentNode.getAttribute("data-id");
		if(ID == j){
			var n = this.num[j];
			n++;
			this.num[j] = n;
			var str=JSON.stringify(this.num);
			setCookie("shop",str,7)
		}
	}
}
cartOperation.prototype.Subtract = function(that){
	var txtVal = Number(that.nextElementSibling.value);
	txtVal--;
	if(txtVal<0){
		txtVal=0
	}
	that.nextElementSibling.value = txtVal;
	var pic = ((that.parentNode.previousElementSibling.innerHTML).split("￥")[1]);
	that.parentNode.nextElementSibling.innerHTML = "￥"+(pic*txtVal).toFixed(2);
	if(that.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.children[0].checked){
		this.sum = this.total.innerHTML.split('￥')[1];
		this.sum = Number(this.sum);	
		this.sum -=Number(pic);
		console.log(this.sum,pic)
		if(this.sum<0){
			this.sum=0
		}
		this.total.innerHTML = '￥'+this.sum.toFixed(2);
	}
	for(var j in this.num){
		var ID = that.parentNode.parentNode.getAttribute("data-id");
		if(ID == j){
			var n = this.num[j];
			n--;
			this.num[j] = n;
			var str=JSON.stringify(this.num);
			setCookie("shop",str,7)
		}
	}
}
cartOperation.prototype.Remove = function(that){
	
	var pic = ((that.parentNode.previousElementSibling.innerHTML).split("￥")[1])
	if(that.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.children[0].checked){
		this.sum = this.total.innerHTML.split('￥')[1];
		this.sum = Number(this.sum);	
		this.sum -=Number(pic);
		//console.log(this.sum,pic)
		this.total.innerHTML = '￥'+this.sum.toFixed(2);
	}
	that.parentNode.parentNode.remove();
	for(var j in this.num){
		var ID = that.parentNode.parentNode.getAttribute("data-id");
		if(ID == j){
			delete this.num[j];
			var str=JSON.stringify(this.num);
			setCookie("shop",str,7)
		}
	}
}
cartOperation.prototype.Choice = function(that){	
	var n = that.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML.split('￥')[1];
	n = Number(n);
	this.sum += n;
	this.total.innerHTML ='￥'+this.sum.toFixed(2);
	//console.log(this.sum)
}
cartOperation.prototype.Choice1 = function(that){
	var n = that.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML.split('￥')[1];
	n = Number(n);
	this.sum = this.total.innerHTML.split('￥')[1];
	this.sum = Number(this.sum);
	this.sum-= n;
	console.log(this.sum)
	this.total.innerHTML = '￥'+this.sum.toFixed(2);
}
cartOperation.prototype.set = function(that){
	var val = that.value;
	var pic = ((that.parentNode.previousElementSibling.innerHTML).split("￥")[1]);
	that.parentNode.nextElementSibling.innerHTML = "￥"+(pic*val).toFixed(2);
	for(var j in this.num){
		var ID = that.parentNode.parentNode.getAttribute("data-id");
		if(ID == j){
			this.num[j] = val;
			var str=JSON.stringify(this.num);
			setCookie("shop",str,7)
		}
	}
	if(that.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.children[0].checked){
		this.sum = this.total.innerHTML.split('￥')[1]-this.sum1;
		this.sum = Number(this.sum);	
		this.sum +=Number(that.parentNode.nextElementSibling.innerHTML.split('￥')[1]);
		if(this.sum<0){
			this.sum=0
		}
		this.total.innerHTML = '￥'+this.sum.toFixed(2);
	}
}
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
//回到底部
function Back(){
	this.back = document.getElementById("back");
	this.mask=document.getElementById("mask");
	var _this=this;
	window.onscroll=function(){
		_this.Oll()
}
Back.prototype.Oll = function(){
	var h = document.documentElement.clientHeight/2-_this.back.offsetHeight/2;
	var scroll = document.documentElement.scrollTop||document.body.scrollTop;
	if(scroll>400){
	this.back.style.display="block";
	this.back.style.top = scroll+h+'px';
	}	
	if(scroll<400){
	this.back.style.display="none";	
	}
	this.mask.style.top=scroll+'px';
	}
}
new Back();