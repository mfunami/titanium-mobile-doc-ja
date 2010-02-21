// twlib.js
var twitter = {
    //--------------------------------------------------------------
    // method[verify_credentials]
    // 引数.1. ユーザID
    //      2. パスワード
    //      3. 成功時処理
    //      4. NG時処理    
    //--------------------------------------------------------------
    verify_credentials : function(username, password, successEventHandler, errorEventHandler){
        // オフラインなら処理中断
        if(Ti.Network.online == false){
	    return false;
        }
        var url = "https://" + username + ":" + password + "@twitter.com/account/verify_credentials.json";
        var xhr = Titanium.Network.createHTTPClient();
        xhr.onload = function(){
            var json = eval('(' + this.responseText + ')');
	    if(json.error != null){
	        errorEventHandler();
	    }
	    else{
                successEventHandler();
            }
	};
        xhr.open('GET', url);
        xhr.send();
    },
    //--------------------------------------------------------------
    // method[search]
    // 引数.1. 検索語（あらかじめURIEncodeしてあることを想定)
    //      2. JSONでの結果受取イベントハンドラ
    //--------------------------------------------------------------
    search : function(query, rpp, page, jsonHandler){
        // オフラインなら処理中断
        if(Ti.Network.online == false){
	    return;
        }
        var url = 'http://search.twitter.com/search.json?q=' + query + '&page=' + page + '&rpp=' + rpp;
        var xhr = Titanium.Network.createHTTPClient();
        xhr.onload = function(){
            // JSONパースエラー対策のため、\nを振り落としています。
            var json = eval('(' + this.responseText.replace(/\\n/g, ' ') + ')');
            jsonHandler(json);
        };
        xhr.open('GET', url);
        xhr.send();
    },
    //--------------------------------------------------------------
    // method[uploadImage]
    // 引数.1. ユーザID
    //      2. パスワード
    //      3. 画像データ
    //      4. アップロード完了後イベントハンドラ(引数としてxmlを返す)
    //--------------------------------------------------------------
    uploadImage: function(username, password, image, progressBar,  successEventHandler){
        // オフラインなら処理中断
        if(Ti.Network.online == false){
	    return false;
        }
        // オンラインならアップロードする（原寸のままなので時間かかる）
	var url = 'https://twitpic.com/api/upload';
	var param = {
	    media:    forUploadImage,
	    username: username,
	    password: password
	};
        var xhr = Titanium.Network.createHTTPClient();
        xhr.onload = function(){
            if(progressBar != null){
                progressBar.hide();
            }
            var xml = Ti.XML.parseString(this.responseText, "text/xml");
            successEventHandler(xml);
        };
        // progressBarの指定をしている場合のみ進捗表示をする
        if(progressBar != null){
            xhr.onsendstream = function(e){
		progressBar.value = e.progress;
	    };
        }
        xhr.open('POST', url);
        if(progressBar != null){
	    progressBar.value = 0;
            progressBar.show();
        }
        xhr.send(param);
        return true;
    },
    //--------------------------------------------------------------
    // method[tweet]
    // 引数.1. ユーザID
    //      2. パスワード
    //      3. 発言内容
    //      4. 送信後のイベントハンドラ
    //--------------------------------------------------------------
    tweet : function(username, password, text, successEventHandler){
        // オフラインなら処理中断
        if(Ti.Network.online == false){
	    return false;
        }
        // オンラインなら発言(そのうちこのやり方変えます...)
	var url = "https://" + username + ":" + password + "@twitter.com/statuses/update.json";
	var xhr = Titanium.Network.createHTTPClient();
	xhr.onload = function(){
            successEventHandler();
        };
	xhr.open("POST", url);
	xhr.send("status=" + Titanium.Network.encodeURIComponent(text));
    }
};
