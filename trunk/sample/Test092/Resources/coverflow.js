//--------------------------------------
// 共通処理読込
//--------------------------------------
// twitter関連の共通処理を取り込みます。
Titanium.include('twlib.js');

//--------------------------------------
// ロード後処理
//--------------------------------------
twitter.search('%23subwayjp%20twitpic%20-RT', 20, 1, function(json){
    // 検索結果を格納します。
    var buffer = {images:[], larges:[], users:[]};
    for(var i = 0; i < json.results.length; i++){
        var tweet = json.results[i];
	var picid = tweet.text;
	picid = picid.replace(/.*(http\:\/\/twitpic\.com\/(\w+)).*/i, "$2");
	if(i < 20){
	    buffer.images.push('http://twitpic.com/show/thumb/' + picid);
	    buffer.larges.push('http://twitpic.com/show/large/' + picid);
            buffer.users.push(tweet.from_user);
	}
    }
    // カバーフロービューを作ります。
    // 中に表示する画像はimagesプロパティとしてコンストラクタ引数として渡します。
    var coverflowview = Titanium.UI.createCoverFlowView({
	images: buffer.images,
	backgroundColor:'#fff'
    });
    coverflowview.addEventListener('click', function(e){
        // webviewのみを格納するwindowを生成します。
        // webviewには大きい画像のURLを引数として渡して、自動的な表示を行います。
        // HTMLベースで指定する場合はコメントアウトしているような書き方になります。
        var imageWindow = Ti.UI.createWindow();
	var web = Ti.UI.createWebView();
        web.bgcolor = '#fff';
        // a. URL指定の場合
        web.url = buffer.larges[e.index];
        // b. HTML指定の場合
        // web.html = '<html><head><title></title></head><body><img src="' + buffer.larges[e.index] + '" /></body></html>';
	imageWindow.add(web);
        // windowをモーダル表示するので閉じるためのボタンをnav barに配置します。
        var closeButton = Titanium.UI.createButton({
	    title:'閉じる',
	    style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
	});
	imageWindow.setLeftNavButton(closeButton);
	closeButton.addEventListener('click',function(){
	    imageWindow.close();
	});
        imageWindow.title = '@' + buffer.users[e.index];
	imageWindow.open({modal:true});
    });
    // このwindowにカバーフローを追加します。
    Titanium.UI.currentWindow.add(coverflowview);
});
