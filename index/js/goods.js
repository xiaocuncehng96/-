function Deta(){
	this.rw = document.getElementsByClassName("right-w")[0];
	this.num = location.href.split("?")[1];
	this.title =document.getElementsByClassName("title")[0];
	this.list = document.getElementsByClassName("right-list1 ")[0];
	this.first = document.querySelectorAll(".btn>a")[0];
	this.last = document.querySelectorAll(".btn>a")[1];
	this.imgs = document.getElementsByClassName("imgs")[0];
	this.iNow=1;
	var _this=this;
	this.str= '';
	this.str1='';
	this.str2='';
	this.str3='';
	this.str4='';
	this.p1 = new Promise(function(resolve,reject){
	ajax("get","json/home.json",{},function(data){
		var len = data.length;
		var num = Math.ceil(len/4);
		var obj = {
			"len":len,
			"n":num,
			"data":data
		}
		resolve(obj);
		})
	});
	this.p1.then(function(obj){
		var data = obj.data;
		for(var i = 0;i<data.length;i++){
			if(_this.num==data[i].id){
				for(var j = 0;j<data[i].imgmin.length;j++){
					_this.str1+=`<img src=${data[i].imgmin[j]} data-url=${data[i].imgmin[j]}/>`
				}
				for(var x = 0;x<data[i].imgmin.length;x++){
					_this.str4+=`<img src="${data[i].imgmin[x]}" />`
				}
				_this.str+=`<div class="right-1">
								<div class="max">
									<img src="${data[i].imgres}"/>
									<div class="fig">										
									</div>
								</div>
								<div class="small">${_this.str1}</div>															
								<div class="big">
									<img src="${data[i].imgres}"/>
								</div>
							</div>
							<div class="right-2">
								<div>
									<h3>${data[i].title}</h3>
									<img src="images01/stars5.gif"/>
									<span><span>${data[i].detail.ass}</span>条商品评论</span>
								</div>
								<div>
									<p><span>价格：</span><b>${data[i].price}</b></p>
									<p><span>商品编号：</span></span>${data[i].detail.serial}</span> <span>商品库存：</span></span>${data[i].detail.inventory}</span></p>
									<p><span>重量：</span><span>${data[i].detail.weight}</span></p>
								</div>
								<div>
									<form action="" class="num">
										<span>购买数量</span>
										<input type="button" value="-" />
										<input type="text"  value="1" />
										<input type="button"  value="+" />
									</form>
									<p data-id=${data[i].id}>
										<span class=""></span>
										<span class="shop1"></span>
										<span class="iconfont icon-shoucang">加入收藏夹</span>
									</p>
								</div>
								<div>
								广东省内地区购物满99元免运费，约3日内送达；广东省外地区购物满159元免运费，约5日内送达（港澳台、西藏、新疆、内蒙古地区及中国境外地区除外）
								</div>
							</div>`;
							_this.str2+=`${data[i].title}`;
			}
		}
		_this.rw.innerHTML=_this.str;
		_this.title.innerHTML=_this.str2;
		_this.imgs.innerHTML=_this.str4;
		new Magnify();
		});
	this.p1.then(function(obj){
		var len = obj.len;
		var data =obj.data;
		var num = obj.n;
		page(1);
		function page(n){
			for(var i=(n-1)*4;i<Math.min(len,n*4);i++){
			_this.str3+=`<ul data-id=${data[i].id}>
					<li><img src="${data[i].imgres}" class="img"/></li>
					<li class="shop">加入购物车</li>
					<li>${data[i].title}</li>
					<li><span>${data[i].price}</span><span>${data[i].cost}</span></li>
				</ul>`
			}
			_this.list.innerHTML = _this.str3;
			_this.str3 = '';
		}	
		_this.first.onclick = function(){
			if(_this.iNow==1){
				_this.iNow = 1;
			}else{
				_this.iNow--;
			}
			page(_this.iNow);			
		}
	//点击下一页
		_this.last.onclick = function(){
			if(_this.iNow==num){
				_this.iNow = num-0;
			}else{
				_this.iNow++;
			}
			page(_this.iNow);
		}
	})
}
new Deta();
function Magnify(){
	this.small = document.querySelectorAll(".small>img");
	this.fig = document.querySelector(".fig");
	this.big = document.querySelector(".big");
	this.bImg = document.querySelector(".big>img");
	this.mImg = document.querySelector(".max");
	this.num = document.querySelectorAll(".num>input");
	var _this = this;
	for(var i=0;i<this.small.length;i++){
		this.small[i].onmouseover=function(){
			_this.sOver(this);
		}
	}
	this.mImg.onmouseover = function(){
		_this.mOver();
	}
	this.mImg.onmouseout =function(){
		_this.mOut();
	}
	this.num[0].onclick =function(){
		_this.subtract();
	}
	this.num[2].onclick =function(){
		_this.add();
	}
}
Magnify.prototype.sOver =function(that){
	var src=that.getAttribute("data-url");
	that.parentNode.previousElementSibling.firstElementChild.src=src;
	this.mImg.src=src;
	this.bImg.src=src;
}
Magnify.prototype.mOver =function(){
	var _this =this;
	this.fig.style.display ="block";
	this.big.style.display ="block";
	this.mImg.onmousemove = function(e){
		_this.mMove(e,this);
	}	
}
Magnify.prototype.mMove =function(e,that){
	var e=e||event;
	var l=e.clientX-that.parentNode.offsetLeft-this.fig.offsetWidth/2;
	var t=e.clientY-that.parentNode.parentNode.offsetTop-this.fig.offsetHeight/2;
	l = l>that.offsetWidth - this.fig.offsetWidth?that.offsetWidth - this.fig.offsetWidth:(l<0?0:l);
	t = t>that.offsetHeight - this.fig.offsetHeight?that.offsetHeight - this.fig.offsetHeight:(t<0?0:t);
	this.fig.style.left=l+'px';
	this.fig.style.top=t+'px';
	this.bImg.style.left=-2*l+'px';
	this.bImg.style.top=-2*t+'px';
}
Magnify.prototype.mOut = function(){
	this.fig.style.display ="none";
	this.big.style.display ="none";
}
Magnify.prototype.subtract =function(){
	var tVal = this.num[1].value;
	tVal--;
	if(tVal<0){
		tVal=0;
	}
	this.num[1].value=tVal;
}
Magnify.prototype.add =function(){
	var tVal = this.num[1].value;
	tVal++;
	if(tVal>99){
		tVal=99;
	}
	this.num[1].value=tVal;
}
//cookie
function Goods(){
	this.main = document.getElementsByClassName("c-right")[0];
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
	if(target.className =="shop"){
		var num=target.parentNode.getAttribute("data-id");
		//console.log(num)
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
			//console.log(this.cNum)
			this.cart.innerHTML = this.cNum;}
		else{
			this.cart.innerHTML = 0;
		}
	}
		if(target.className =="shop1"){
			//var nCoo = JSON.parse(getCookie("shop"));
			//this.cNum = Object.keys(nCoo).length
			//this.cart.innerHTML = this.cNum;
			var num=target.parentNode.getAttribute("data-id");
			var n = this.newobj[num];			
			if(!this.newobj[num]){
				n=1;
				this.newobj[num]=n;
				//console.log(this.newobj)
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
				//console.log(this.cNum)
				this.cart.innerHTML = this.cNum;}
			else{
				this.cart.innerHTML = 0;
			}
		}
}
new Goods();