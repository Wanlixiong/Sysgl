$(function()
{
	var db_size=2*1024*1024;
	var db=openDatabase("sysgl","","",db_size);		//Web SQL实现离线数据存储
	db.transaction(function(tx){
		tx.executeSql("create table if not exists bwl(id integer primary key autoincrement,bt varchar(30),fbsj datetime,nr text)",[],null,function(e){
			alert("表创建失败！");
			return;
		});
	});
	show_all();
	function show_all(){
		db.transaction(function(tx){
			tx.executeSql("select * from bwl order by id desc",[],function(tx,result){
				var str="";
				$("#show_bwl").empty();
				if(result.rows.length>0){
					for(var i=0;i<result.rows.length;i++){
						var item=result.rows.item(i);
						str+="<li id="+item["id"]+"><a href='#'><h5>"+item["bt"]+"</h5><p>"+item["nr"]+"</p></a></li>";
					}
					$("#show_bwl").append(str);
					$("#show_bwl").listview('refresh');
				}
			});
		});
	}
	$("#scbw").click(function(){
		var id=$("#id").val();
		if(confirm("确定删除吗？")){
			db.transaction(function(tx){
				tx.executeSql("delete from bwl where id=?",[id],function(tx,result){
					alert("记录成功删除！");
					location="bwl.html";
				});
			});
		}
	});
	$("#xgbw").click(function(){
		var bt=$("#bt1").val();
		var nr=$("#nr1").val();
		var id=$("#id").val();
		db.transaction(function(tx){
			//tx.executeSql("update bwl set bt='"+bt+"',nr='"+nr+"' where id="+id,[]);
			tx.executeSql("update bwl set bt=?,nr=? where id=?",[bt,nr,id],function(tx,result){
				location="bwl.html";
			},function(e){
				alert("记录修改失败！");
			});
		});
	});
	
	$("#show_bwl").on("click","li",function(){
		var id=$(this).attr("id");
		db.transaction(function(tx){
			tx.executeSql("select * from bwl where id=?",[id],function(tx,result){
				if(result.rows.length>0){
					var item=result.rows.item(0);
					$("#bt1").val(item["bt"]);
					$("#nr1").val(item["nr"]);
					$("#id").val(item["id"]);
					$("#fbsj").html("发布时间："+item["fbsj"]);
					location="#xgbwl";
				}
			});
		});
	});
	//$("#zjqd").on("click",function(){});
	$("#zjqd").click(function(){
		var bt=$("#bt").val();
		var nr=$("#nr").val();
		db.transaction(function(tx){
			tx.executeSql("insert into bwl(bt,fbsj,nr)values(?,datetime('now','localtime'),?)",[bt,nr],function(tx,result){
				alert("增加成功！");
				location="bwl.html";
			},function(e){
				alert("增加失败！");
				return;
			});
			//tx.executeSql("insert into bwl(bt,fbsj,nr)values('"+bt+"','"+t+"','"+nr+"')",[],);
		});
	});
});
