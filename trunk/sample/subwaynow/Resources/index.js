$(function(){
    var tableView = null;
    var tweetWindow = null;

    var tweetButton = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.COMPOSE
    });
    tweetButton.addEventListener('click',function(){
	var username = Titanium.App.Properties.getString("tw_username");
	var password = Titanium.App.Properties.getString("tw_password");
	if(username == null || username == '' ||
           password == null || password == ''){
	    var dialog = Titanium.UI.createAlertDialog({
 		title: '認証情報未登録',
 		message: '設定画面でTwitterのIDとパスワードを設定してください。'
	    });
	    dialog.show();
	    return;
	}
	if(tweetWindow == null){
	    tweetWindow = Titanium.UI.createWindow({
		url:'tweet.html'
	    });
	}
	tweetWindow.open({animated:true});
    });
    Titanium.UI.currentWindow.setRightNavButton(tweetButton);

    var reload_timeline = function(){
	// オフラインなら処理しないようにしたほうがいいですよね！
	if(Titanium.Network.online == false){
	    // エラー表示
	    return;
	}

	// オブジェクトを生成します。
	var xhr = Titanium.Network.createHTTPClient();

	// 第一引数はHTTP Method(GETかPOSTがほとんどだと思いますが)
	// 第二引数はURIです。
	var rpp = 25;
	var qword = Titanium.Network.encodeURIComponent('#subwayjp -RT');
	var url = 'http://search.twitter.com/search.json?q=' + qword + '&page=1&rpp=' + rpp;
	xhr.open('GET', url);
	
	// レスポンスを受け取るイベント
	xhr.onload = function(){
	    var json = eval('(' + this.responseText.replace(/\\n/g, '') + ');');
	    var rowData = [];
	    $.each(json.results, function(i, v){
		/*
		var html =
		    '<table cellpadding="0" cellspacing="0"><tr><td width="64" valign="top"><div style="word-break:break-all;float:left;text-align:center;">' + 
		    '<img src="' + v.profile_image_url + '" style="max-width:64px;max-height:64px;" /><br />'+
		    '<span class="username" style="font-size:x-small;">' + v.from_user + '</span></div></td>' + 
		    '<td width="210" valign="top"><div style="float:left;font-size:small;word-break:break-all;">' + v.text + '</div></td>' + 
		'</tr></table>';
		//'<span style="font-size:xx-small;">' + tilib.util.gmt_to_jst(v.created_at) + '</span>' +;
                */ 
		rowData.push({
		    //html: html, 
		    description: v.text,
		    title: v.from_user,
		    image: v.profile_image_url
		});
	    });

	    if(tableView != null){
		tableView.setData(data);
	    }
	    else{
		tableView = Titanium.UI.createTableView({
		    template:{
			//selectedBackgroundColor:'#ffffff',
			// http://support.appcelerator.net/discussions/titanium-mobile-discussion/1151-custom-table-view-templatelayout-elements-background-colors
			layout:[
			    {type:'text', top:4, left:72,  name:'title', fontSize: 12},
			    {type:'text', top:20, left:72, name:'description', fontSize:12, fontWeight: 'normal'},
			    {type:'image', top:8, left:4, name:'image', width: 64, height: 64 }
			]},
		    data:rowData,
		    rowHeight: 84,
		    title:'#subwayjp timeline'
		},function(eventObject) {
		    /*
                    var a = Titanium.UI.createAlertDialog();
                    a.setTitle('Table View Test2');
                    a.setMessage('row ' + eventObject.row + ' index ' + eventObject.index + ' section ' + eventObject.section + ' rowData ' + eventObject.rowData);
                    a.show();
                    */
		});
		//add view to current window
		Titanium.UI.currentWindow.addView(tableView);
		// show view
		Titanium.UI.currentWindow.showView(tableView);
	    }
	};

	// リクエスト送信します。
	xhr.send();

	
    };

    reload_timeline();



    Titanium.Gesture.addEventListener('shake',function(){
	reload_timeline();
    },false);
	
});
