//--------------------------------------
// 共通処理読込
//--------------------------------------
// twitter関連の共通処理を取り込みます。
Titanium.include('twlib.js');

//--------------------------------------
// UI定義部
//--------------------------------------
var tweetButton = Titanium.UI.createButton({
    systemButton:Titanium.UI.iPhone.SystemButton.COMPOSE
});
Ti.UI.currentWindow.setRightNavButton(tweetButton);
var tableView = null;

//--------------------------------------
// 関数宣言部
//--------------------------------------
function reload_timeline(){
    // 検索結果をTableViewのRowとして格納します。
    twitter.search(Ti.Network.encodeURIComponent('#subwayjp -RT'), 25, 1, function(json){
        // 表示データを格納する配列
	var rows = [];
        for(var i = 0; i < json.results.length; i++){
            var v = json.results[i];
            // Rowに対して、プロフ画像・screen name・発言・発言時刻を
            // それぞれコントロールとしてaddしていく形になります。
            var row = Ti.UI.createTableViewRow();
            row.backgroundColor = '#f0f0f0';
            row.height = 100;
            // プロフ画像
	    var profileImage = Titanium.UI.createImageView({
	        url: v.profile_image_url,
		top:0,
		left:0,
                width: 48,
                height: 48
	    });
	    row.add(profileImage);
            // screen name
            var userLabel = Titanium.UI.createLabel({
	        text: v.from_user,
	        color:'#099',
	        font:{fontWeight:'bold',fontSize:12},
	        top:0,
	        left:50,
                height:20,
	        width:250
            });
            row.add(userLabel);
            // 発言
            var tweetLabel = Titanium.UI.createLabel({
	        text: v.text,
	        color:'#000',
	        font:{fontSize:11},
                top:20,
	        left:50,
	        width:260
            });
            row.add(tweetLabel);
            // 発言時刻
            var dateLabel = Ti.UI.createLabel({
		color:'#666',
		font:{fontSize:10,fontWeight:'normal', fontFamily:'Arial'},
		left:50,
		bottom: 2,
		height:20,
		width:250,
		text: v.created_at
	    });
            row.add(dateLabel);
            rows.push(row);
        }
	if(tableView != null){
	    tableView.setData(rows);
	}
	else{
            tableView = Titanium.UI.createTableView({
                data: rows,
                style:Titanium.UI.iPhone.TableViewStyle.PLAIN
            });
            Titanium.UI.currentWindow.add(tableView);
	}
    });
};

//--------------------------------------
// イベントハンドラ定義部
//--------------------------------------

// tweetボタンクリック時イベント
tweetButton.addEventListener('click', function(){
    // tweet入力画面の表示を行います
    //（認証情報の登録がされていることが前提）
    var username = Titanium.App.Properties.getString("tw_username");
    var password = Titanium.App.Properties.getString("tw_password");
    if(username == null || username == '' ||
       password == null || password == ''){
	Titanium.UI.createAlertDialog({
 	    title  : '認証情報未登録',
 	    message: '設定画面でTwitterのIDとパスワードを設定してください。'
	}).show();
        Titanium.UI.currentWindow.tabGroup.setActiveTab(4);
	return;
    }
    var tweetWindow = Titanium.UI.createWindow({
	url:'tweet.js',
        backgroundColor:'#000'
    });
    Titanium.UI.currentTab.open(tweetWindow, {animated:true});
});

// デバイスシェイク時イベント
Titanium.Gesture.addEventListener('shake', function(){
    // シェイクするとリロードする
    reload_timeline();
}, false);

//--------------------------------------
// ロード時処理
//--------------------------------------
reload_timeline();
