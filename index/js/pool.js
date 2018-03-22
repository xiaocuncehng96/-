/*
随机数：
	参数n,m
	返回：随机数
 */
function numRandom(n,m){
	return parseInt(n+Math.random()*(m-n+1));
}
/*
冒泡排序：
	参数：数组
	返回：排序好的数组
 */
function bubbleSort (arr) {
	var temp;
	for(var i=0;i<arr.length-1;i++){
		for(var j=0;j<arr.length-1-i;j++){
			if(arr[j]>arr[j+1]){
				temp = arr[j];
				arr[j] = arr[j+1];
				arr[j+1] = temp;
			}
		}
	}
	return arr
}
/*
选择排序：
	参数：数组
	返回：排序好的数组
 */
function selectSort(arr){
	var temp;
	for(var i=0;i<arr.length-1;i++){
		for(var j = i+1;j<arr.length;j++){
			if(arr[i]>arr[j]){
				temp = arr[i];
				arr[i] = arr[j];
				arr[j] = temp;
			}
		}
	return arr
	}
}
/*
	获取数组最大值
		参数：数组
		返回值：最大数
 */
function getMax(arr){
	var max = arr[0];
	for(var i in arr){
		if(arr[i]>max){
			max = arr[i];
		}
	}
	return max;
}
/*
	获取数组最小值
		参数：数组
		返回值：最小数
 */
function getMin(arr){
	var min = arr[0];
	for(var i in arr){
		if(arr[i]<min){
			min = arr[i];
		}
	}
	return min;
}
/*
	获取最小值的下标
		参数：数组
		返回值：最小下标
 */
function getMinIndex(arr){
	var min = arr[0];
	var index = 0;
	for(var  i in arr){
		if(arr[i]<min){
			min = arr[i];
			index = i;
		}
	}
	return index;
}
/*
	判断数字是否存在
		参数：数组 数值
		返回值：布尔值
 */
function has(arr,num){
	for(var i=0;i<arr.length;i++){
		if(arr[i]==num){
			return true;
		}
	}
	return false;
}
/*
	数组去重
		参数：数组
		返回值：去重后的数组
 */
function norepeat(arr){
	var newArr = [];
	for(var i=0;i<arr.length;i++){
		if(newArr.indexOf(arr[i])==-1){
			newArr.push(arr[i])
		}
	}
	return newArr;
}
/*
验证码：
	参数：无
	返回值：4位数验证码
 */
function randomCode(){
	var str = '';
	for(var i=0;i<4;i++){
		var num = parseInt(48+Math.random()*(122-48+1))
		while(num>=58&&num<=64||num>=91&&num<=96){
			num = parseInt(48+Math.random()*(122-48+1))
		}
		str+=String.fromCharCode(num);
	}
	return str;
}


/*
	补0
		参数：小于10的数字
 */
function addZero(num){
	if(num<10){
		num = "0"+num;
	}
	return num;
}
 

/*
时间对象转换成字符串
	参数：时间对象 符号
	返回值：时间字符串

 */
function dateToString(d,sign){
 	if(!sign){
 		sign = "/"
 	}
 	return d.getFullYear()+sign+(d.getMonth()+1)+sign+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
}
/*
 颜色随机
  	参数：无
  	返回值：随机的颜色
 * */
function sortColor(){
		var r=parseInt(Math.random()*255);
		var g=parseInt(Math.random()*255);
		var b=parseInt(Math.random()*255);
		var R=r.toString(16).length<2?"0"+r.toString(16):r.toString(16);
		var G=g.toString(16).length<2?"0"+g.toString(16):g.toString(16);
		var B=b.toString(16).length<2?"0"+b.toString(16):b.toString(16);
		return "#"+R+G+B;
	}
/*
 获取非行间样式---并兼容IE
 	参数：对象，样式
 	返回值：字符串，带单位
 */
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr]
	}else{
		return getComputedStyle(obj,false)[attr];
	}
}
/*
 获取id
 	参数：id名
 	返回值：拿到的id
 */
function getId(id){
	return document.getElementById(id);
}
/*
 获取元素
 	参数：元素名
 	返回值：拿到的元素
 */
function getName(name){
	return document.getElementById(name);
}
/*
获取到页面的偏移量
 	参数：对象
 	返回值：left  top
  */
 function offset(ele){
	var obj = {};
	obj.l = ele.offsetLeft;
	obj.t = ele.offsetTop;
	while(ele.offsetParent){
		ele = ele.offsetParent;
		obj.l+= ele.offsetLeft;
		obj.t+= ele.offsetTop;
	}
	return obj;
}
 /*
  事件监听
  	参数：对象，事件类型，回调函数
   */
  function attach(obj,type,fn){
  	if(obj.addEventListener){
  		obj.addEventListener(type,fn)
  	}else{
  		obj.attachEvent("on"+type,fn)
  	}
  }
/*
 设置cookie
 参数：key值，value,expire
 */
function setCookie(_name,_val,expires){
	var d = new Date();
	d.setDate(d.getDate()+expires);
	document.cookie = _name+"="+_val+";path=/;expires="+d.toGMTString();
}
/*

删除cookie
	参数：key val
 */
function removeCookie(_name,_val){
	setCookie(_name,_val,-1)
}

/*
获取cookie
	参数：key
 */
function getCookie(_name){
	var cookie = document.cookie;
	var arr = cookie.split("; ")
	for(var i=0;i<arr.length;i++){
		var newArr = arr[i].split("=");
		if(newArr[0]==_name){
			return newArr[1]
		}
	}
}
/*
	运动框架
	参数：对象  属性  回调
 */
function move(obj,json,fn){
	//第一步关闭定时器
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var bStop = true;
		for(var attr in json){
			//取元素的值
			//1、透明度  2、有单位的px
			var iCur = 0;
			if(attr=="opacity"){
				iCur = parseInt(parseFloat(getStyle(obj,attr))*100)
			}else{
				iCur = parseInt(getStyle(obj,attr));//有单位
			}

			//算速度
			var speed = (json[attr]-iCur)/8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);

			//判断是否全部到达
			if(iCur !=json[attr]){
				bStop = false;
			}
			//判断是透明度还是普通的值
			if(attr == "opacity"){	
				obj.style.opacity = (iCur+speed)/100;
				obj.style.filter = "alpha(opacity"+(iCur+speed)+")";
			}else{
				obj.style[attr] = iCur+speed+"px";
			}
		}

		if(bStop){
			clearInterval(obj.timer);
			fn&&fn();
		}
	},30)
}
/*
 ajax
 参数：method url json success error
  */
 function ajax(method,url,json,success,error){
	var xml = new XMLHttpRequest()|| new ActiveXObject("Microsoft,XMLHTTP");
	var str = '';
	for(var key in json){
			str+="&"+key+"="+json[key];
		}
	str = str.substr(1);
	if(method == "get"){
		url = url+"?"+str;
		xml.open("get",url,true);
		xml.send();
	}else{
		xml.open("post",url,true);
		xml.setRequestHeader("content-type","application/x-www-form-urlencoded");
		xml.send(str);
	}

	xml.onreadystatechange = function(){
		if(xml.readyState == 4 && xml.status == 200){
			var data = xml.responseText;
		
			if(typeof data !="object"){
				data = JSON.parse(data);
			}
			success&&success(data);
		}else{
			error&&error(xml.status);
		}
	}
}