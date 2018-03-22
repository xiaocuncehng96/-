/*
//轮播图
var olist = document.getElementsByClassName("list")[0];
var ali = olist.getElementsByTagName("li");
var lw = ali[0].offsetWidth;
var btn = document.getElementsByClassName("btn")[0].getElementsByTagName("a");
var dot = document.getElementsByClassName("dot")[0].getElementsByTagName("a");
var ban = document.getElementsByClassName("banner")[0];
var btn1=document.getElementsByClassName("btn")[0];
var now = 0;
var timer = null;
olist.style.width=lw*ali.length+'px';
//console.log(dot)
//轮播原理
function toimg(){
	move(olist,{"left":lw*-now});
	for(var i=0;i<dot.length;i++){
		dot[i].className='';
	}
	dot[now==ali.length-1?0:now].className="active";
}
//自动轮播
function play(){
	timer=setInterval(function(){
		if(now==ali.length-1){
			now=1;
			olist.style.left=0;
		}else{
			now++;
		}
		toimg()
	},2000)
}
play();
//轮播的停止和播放
ban.onmouseover=function(){
	clearInterval(timer);
	btn1.style.display = "block";
}
ban.onmouseout=function(){
	play();
	btn1.style.display = "none";
}
//左右点击切换
btn[0].onclick=function(){
	if(now==0){
		now=ali.length-2;
		olist.style.left=-lw*(ali.length-1)+'px'
	}else{
		now--;
	}
	toimg()
}
btn[1].onclick=function(){
	if(now==ali.length-1){
		now=1;
		olist.style.left=0;
	}else{
		now++;
	}
	toimg()
}
//点击原点切换
for(var i=0;i<dot.length;i++){
	dot[i].index = i; 
	dot[i].onclick=function(){
		for(var j=0;j<dot.length;j++){
			dot[j].className = '';
		}
		this.className = "active";
		move(olist,{"left":-this.index*lw})
		now=this.index;
	}
}
//二级菜单
var cfy = document.getElementsByClassName("classify")[0];
var ht = document.getElementsByTagName("h2")[0];
//console.log(ht)
ht.onmouseover=function(e){
	var e=e||event;
	var target=e.target||e.srcElement;
	if(target.tagName=="A"){		
		target.className = "tgt";
	}
	move(cfy,{"height":300})
}
ht.onmouseout=function(){
	var e=e||event;
	var target=e.target||e.srcElement;
	if(target.tagName=="A"){		
		target.className = "";
	}
	move(cfy,{"height":0})
}
//回到顶部
var back = document.getElementById("back");
window.onscroll=function(){	
	var h = document.documentElement.clientHeight/2-back.offsetHeight/2;
	var scroll = document.documentElement.scrollTop||document.body.scrollTop;
	console.log(h,scroll)
	if(scroll>400){
	back.style.display="block";
	}
	move(back,{"top":h+scroll});
	if(scroll<400){
	back.style.display="none";	
	}
}
*/
function Init(){
	this.olist = document.getElementsByClassName("list")[0];
	this.ali = this.olist.getElementsByTagName("li");
	this.lw = this.ali[0].offsetWidth;
	this.btn = document.getElementsByClassName("btn")[0].getElementsByTagName("a");
	this.dot = document.getElementsByClassName("dot")[0].getElementsByTagName("a");
	this.ban = document.getElementsByClassName("banner")[0];
	this.btn1=document.getElementsByClassName("btn")[0];
	this.now = 0;
	this.timer = null;	
	var _this=this;
	this.olist.style.width=this.lw*this.ali.length+'px';
	
	
	//轮播的停止和播放
	this.ban.onmouseover=function(){
		clearInterval(_this.timer);
		_this.btn1.style.display = "block";
	}
	this.ban.onmouseout=function(){
		_this.play();
		_this.btn1.style.display = "none";
	}
	//左右切换
	this.btn[0].onclick=function(){
		if(_this.now==0){
			_this.now=_this.ali.length-2;
			_this.olist.style.left=-_this.lw*(_this.ali.length-1)+'px'
		}else{
			_this.now--;
		}
		_this.toimg()
	}
	this.btn[1].onclick=function(){
		if(_this.now==_this.ali.length-1){
			_this.now=1;
			_this.olist.style.left=0;
		}else{
			_this.now++;
		}
		_this.toimg()
	}
	//点击圆点切换
	for(var i=0;i<this.dot.length;i++){
		this.dot[i].index = i; 
		this.dot[i].onclick=function(){
			_this.click(this);
		}
	}
}
	Init.prototype.click = function(that){
		for(var j=0;j<this.dot.length;j++){
			this.dot[j].className = '';
		}
		that.className = "active";
		move(this.olist,{"left":-that.index*this.lw})
		this.now=that.index;		
	}
	//轮播原理
	Init.prototype.toimg = function(){
		move(this.olist,{"left":this.lw*-this.now});
		for(var i=0;i<this.dot.length;i++){
			this.dot[i].className='';
		}
		this.dot[this.now==this.ali.length-1?0:this.now].className="active";		
	}
	//自动轮播
	Init.prototype.play = function(){
		var _this=this;
		this.timer=setInterval(function(){
			if(_this.now==_this.ali.length-1){
				_this.now=1;
				_this.olist.style.left=0;
			}else{
				_this.now++;
			}
			_this.toimg()
		},2000)
	}
new Init().play();
//分页
function Pag(){
	this.one = document.getElementsByClassName("one")[0];
	this.first = document.getElementsByClassName("first")[0];
	this.last = document.getElementsByClassName("last")[0];
	this.btnList = document.getElementsByClassName("btnList")[0];
	this.numpage = document.getElementsByClassName("numpage");
	this.right = document.getElementsByClassName("three-r")[0];
	this.iNow=1;
	this.str='';
	this.str1='';
	var _this=this;
	this.p1 = new Promise(function(resolve,reject){
		ajax("get","json/home.json",{},function(data){
		var len = data.length;
		var num = Math.ceil(len/5);
		for(var i=0;i<num;i++){
			var a = document.createElement("a");
			a.innerHTML = i+1;
			a.className = "numpage";
			
			_this.btnList.insertBefore(a,_this.last);
		}
		var obj = {
			"len":len,
			"n":num,
			"data":data
		}
		resolve(obj);
	})
})
	
	this.p1.then(function(obj){
		var len = obj.len;
		var data = obj.data;
		var num = obj.n;
		
		page(1);
		function page(n){			
			for(var i=(n-1)*5;i<Math.min(len,n*5);i++){
			_this.str+=`<ul data-id=${data[i].id}>
					<li><img src="${data[i].imgres}" class="img"/></li>
					<li class="shop">加入购物车</li>
					<li>${data[i].title}</li>
					<li><span>${data[i].price}</span><span>${data[i].cost}</span></li>
				</ul>`
			}
			_this.one.innerHTML = _this.str;
			_this.str = '';
		}
	//核心代码
	
	//获取页面上所以的a标签
	
	for(var i=0;i<_this.numpage.length;i++){
		_this.numpage[i].onclick = function(){
		var val = this.innerHTML;		
		//iNow与innerHTML进行同步
		_this.iNow = this.innerHTML;
		 page(val);
		}
	}

	//点击上一页
	_this.first.onclick = function(){
		if(_this.iNow==1){
			_this.iNow = 1;
		}else{
			_this.iNow--
		}
		console.log(_this.iNow)
		page(_this.iNow)
	}
	//点击下一页
	_this.last.onclick = function(){
		if(_this.iNow==num){
			_this.iNow = num-0;
		}else{
			_this.iNow++
		}
		console.log(_this.iNow)
		page(_this.iNow)
		}
	})
	this.p1.then(function(obj){
		var data = obj.data;
		for(var i=0;i<data.length;i++){
			_this.str1+=`<ul data-id=${data[i].id}>
					<li><img src="${data[i].imgres}" class="img"/></li>
					<li class="shop1">加入购物车</li>
					<li>${data[i].title}</li>
					<li><span>${data[i].price}</span><span>${data[i].cost}</span></li>
				</ul>`
			}
			_this.right.innerHTML = _this.str1;			
	})
}
new Pag();
//cookie
function Goods(){
	this.main = document.getElementById("main-wrapper");
	this.cart = document.querySelector(".cart-n");
	this.cNum = 0;
	var _this = this;
	if(getCookie("shop")){
		this.newobj=JSON.parse(getCookie("shop"))
	}else{
		this.newobj={};
	}
	//事件代理
	this.main.onclick = function(e){
		_this.click(e)
	}
	window.onload = function(){
		if(getCookie("shop")){
			var nCoo = JSON.parse(getCookie("shop"));
			_this.cNum = Object.keys(nCoo).length
			//console.log(this.cNum)
			_this.cart.innerHTML = _this.cNum;}
		else{
			_this.cart.innerHTML = 0;
		}
	}
}
Goods.prototype.click = function(e){
	var e=e||event;
		var target=e.target||e.srcElement;
		if(target.className =="shop1"){
			var num=target.parentNode.getAttribute("data-id");
			var n = this.newobj[num];
			if(!this.newobj[num]){
				n=1;
				this.newobj[num]=n;
			}else{
				var n1=this.newobj[num];
				n1++;
				this.newobj[num]=n1;
			}
			var str=JSON.stringify(this.newobj);
			setCookie("shop",str,7)
			if(getCookie("shop")){
				var nCoo = JSON.parse(getCookie("shop"));
				this.cNum = Object.keys(nCoo).length
				//console.log(this.cNum)
				this.cart.innerHTML = this.cNum;
			}else{
				this.cart.innerHTML = 0;
			}
		}
		if(target.className =="shop"){
			var num=target.parentNode.getAttribute("data-id");
			var n = this.newobj[num];
			if(!this.newobj[num]){
				n=1;
				this.newobj[num]=n;
			}else{
				var n1=this.newobj[num];
				n1++;
				this.newobj[num]=n1;
			}			
			var str=JSON.stringify(this.newobj);
			setCookie("shop",str,7);
			if(getCookie("shop")){
				var nCoo = JSON.parse(getCookie("shop"));
				this.cNum = Object.keys(nCoo).length
				this.cart.innerHTML = this.cNum;
			}else{
				this.cart.innerHTML = 0;
			}
		}
		if(target.className == "img"){
			var num=target.parentNode.parentNode.getAttribute("data-id");
			location.href ="goods.html?"+num;
		}
}
new Goods()