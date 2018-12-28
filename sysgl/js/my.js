var db;
$(function()
{
	var request=window.indexedDB.open("db_yhgl");		//indexedDB实现离线数据存储
	request.onsuccess=function(e){
		db=request.result;
		if(filename()=="wd.html")
			if(localStorage.yhm==null){
    			alert("请登录");
    			location="dl.html";
    		}else
    			show_yhxx(localStorage.yhm);
    	if(filename1()=="yhxx.html")
			if(localStorage.yhm==null){
    			alert("请登录");
    			location="dl.html";
    		}else
    			show_yhxx1("yhm");
	};
	request.onupgradeneeded=function(e){
		var os=e.target.result.createObjectStore("yhb",{keyPath:"yhm"});
		os.createIndex("mm","mm",{unique:false});
		os.createIndex("xb","xb",{unique:false});
		os.createIndex("yx","yx",{unique:false});
	};
	function filename(){
		var fn=location.href;
		fn=fn.substring(fn.lastIndexOf("/")+1);
		return fn;
	}
	function filename1(){
		var fn=location.href;
		fn=fn.substring(fn.lastIndexOf("/")+1,fn.lastIndexOf("?"));
		return fn;
	}
	function getQueryString(key){
		var reg=new RegExp("(^|&)"+key+"=([^&]*)(&|$)");		
		var r=location.search.substr(1).match(reg);
		if(r!=null)
			return unescape(r[2]);
		else
			return null;			
	}
	function show_yhxx1(yhm){
		var ts=db.transaction("yhb","readonly");
		var store=ts.objectStore("yhb");
		var s=getQueryString(yhm);
		var req=store.get(s);
		req.onsuccess=function(e){
			$("#yhm").html("用户名="+e.target.result.yhm);
			$("#mm").html("密码="+e.target.result.mm);
			$("#yx").html("邮箱="+e.target.result.yx);
			$("#xb").html("性别="+e.target.result.xb); 			
		};
	}
	$("#yhsc").click(function(){
		var ts=db.transaction("yhb","readonly");
		var store=ts.objectStore("yhb");
		var req=store.delete(getQueryString(yhm));
		req.onsuccess=function(e){
			alert("记录成功删除！");
			location="wd.html";
		};
		req.onerror=function(e){
			alert("记录删除失败！");
			location="wd.html";
		}
	});
	function show_yhxx(yhm){
		var ts=db.transaction("yhb","readonly");
		var store=ts.objectStore("yhb");
		var req=store.get(yhm);
		req.onsuccess=function(e){
			$("#yhm").val(e.target.result.yhm);
			$("#mm").val(e.target.result.mm);
			$("#mm1").val(e.target.result.mm);
			$("#yx").val(e.target.result.yx);
			if(e.target.result.xb==$("#xb0").val())
				$("#xb0").prop('checked', true);
			else
				$("#xb1").prop('checked', true); 
		};
	}
	$("#xgqd").click(function(){
		var yhm=$("#yhm").val();
		var mm=$("#mm").val();
		var mm1=$("#mm1").val();
		if(mm!=mm1){
			alert("密码不一致！");
			$("#mm").focus();
			return;
		}
		var xb=$("input:radio:checked").val();
		var yx=$("#yx").val();
		var ts=db.transaction("yhb","readwrite");
		var store=ts.objectStore("yhb");
		var req=store.put({yhm:yhm,mm:mm,xb:xb,yx:yx});
		req.onerror=function(e){
			alert("出错了");
			return;
		};
		req.onsuccess=function(e){
			alert("修改成功");
			location="wd.html";
		};
	});
	$("#tc").click(function(){
		localStorage.clear();
		location="dl.html";
	});
	$("#yhgl").click(function(){
		var ts=db.transaction("yhb","readonly");
		var store=ts.objectStore("yhb");
		var req=store.openCursor(null,"next");
		var str="<table border=1 align='center' width='90%'><tr><th>用户名</th><th>性别</th><th>邮箱</th></tr>";
		req.onsuccess=function(e){			
			var c=e.target.result;
			if(c){
				str+="<tr><td><a href='yhxx.html?yhm="+c.value.yhm+"' rel='external'>"+c.value.yhm;
				str+="</a></td><td>"+c.value.xb;
				str+="</td><td>"+c.value.yx+"</td></tr>";
				c.continue();
			}else
				str+="</table>";
			$("#xxxs").html(str);
		};
	});
	$("#zc").click(function(){
		var yhm=$("#yhm").val();
		if(yhm==""){
			alert("请输入用户名");
			$("#yhm").focus();
			return;
		}
		var mm=$("#mm").val();
		var mm1=$("#mm1").val();
		if(mm!=mm1){
			alert("密码不一致！");
			$("#mm").focus();
			return;
		}
		var xb=$("input:radio:checked").val();
		var yx=$("#yx").val();
		var ts=db.transaction("yhb","readwrite");
		var store=ts.objectStore("yhb");
		var req=store.add({yhm:yhm,mm:mm,xb:xb,yx:yx});
		req.onerror=function(e){
			alert("用户名重复了");
			return;
		};
		req.onsuccess=function(e){
			alert("注册成功");
			location="dl.html";
		};
	});
	$("#dl").click(function(){
		var yhm=$("#yhm").val();
		if(yhm==""){
			alert("请输入用户名！");
			$("#yhm").focus();
			return;
		}
		var ts=db.transaction("yhb","readonly");
		var store=ts.objectStore("yhb");
		var req=store.get(yhm);
		req.onerror=function(e){
			alert("数据库错了！");
			$("#yhm").focus();
			return;
		};
		req.onsuccess=function(e){
			if(e.target.result==null){
				alert("用户名错了！");
				$("#yhm").focus();
				return;
			}else{
				var mm=$("#mm").val();
				if(mm!=req.result.mm){
					alert("密码错了！");
					$("#mm").focus();
					return;
				}else{
					localStorage.yhm=yhm;
					location="wd.html";
				}
			}
		};
	});
});
