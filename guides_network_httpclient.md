# APIカタログ(ネットワーク編) - HTTPClientによる通信 #
HTTPClientはAJAXでおなじみのXMLHttpClient(xhr)と同じ仕組みで動くので、prototype.jsやjQueryなどのラッパーなしで素のAJAXをしていた向きには理解しやすいかもしれません。

## 基本構文 ##
```
// オフラインなら処理しないようにしたほうがいいですよね！
if(Titanium.Network.online == false){
    // エラー表示
    return;
}

// オブジェクトを生成します。
var xhr = Titanium.Network.createHTTPClient();

// 第一引数はHTTP Method(GETかPOSTがほとんどだと思いますが)
// 第二引数はURIです。
// 第三引数は非同期か同期かを選択します。（デフォルトは非同期）
xhr.open('GET','http://search.twitter.com/search.json?q=%23titanium');

// レスポンスを受け取るイベント
xhr.onload = function(){
    alert(this.responseText);
    /*
    // これと同義
    xhr.onreadystatechange = function(){
        if(this.readyState == xhr.DONE){
            alert(this.responseText);
        }
    };
    */
};

// エラー発生時のイベント
xhr.onerror = function(error){
    // errorにはエラー事由の文字列オブジェクトが入ってくる。
};

// リクエスト送信します。(引数としてJSON値を入れるとパラメータ化される)
xhr.send();
/*
 xhr.send({
     q : 'querystring',
     param_name : 'param_value'
 });
 */
```
基本的にonloadでレスポンスを操作するという流れです。

responseTextのほかにDOMParserに予め通した形で受け取るresponseXMLというプロパティもあります。

### JSONの取得 ###
JSON化する場合は次のようにメソッドを使います。
```
xhr.onload = function(){
    var json = JSON.parse(this.responseText);
    // 後続処理
};
```

### バイナリデータの取得 ###
上の例ではテキストデータの取得ですが、画像やPDFなどをダウンロードする場合は次のように記述します。
```
xhr.onload = function(){
    var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'tmp.png');
    f.write(this.responseData);

    // 画像を表示する場合
    // imageView.url = f.nativePath;
    //
    // PDFを表示する場合
    // webView.url = f.nativePath;
};
```

## 写真をPOSTする例 + 進捗表示 ##
カメラ撮影をしたものを[TwitPic](http://www.twitpic.com/)サーバにアップロードする例です。
```
Titanium.Media.showCamera({
    success : function(event){
        try{
            var xhr = Titanium.Network.createHTTPClient();
            xhr.onload = function(){
                var xml = this.responseXML;
                var url = xml.documentElement.getElementsByTagName("mediaurl")[0].nodeValue;
                // ...
            };
            // 送信時処理(進捗表示など)
            xhr.onsendstream = function(e){
                Ti.API.info(e.progress);
            };
            xhr.open("POST","http://twitpic.com/api/upload");
            xhr.send({media:event.media, username:'username', password:'password'});
        }
        catch(error){
            // ...
        }
    }
});
```

上記で書いているアップロード進捗の反対、ダウンロードの進捗も別のイベントでフォローされています。
```
xhr.ondatastream = function(e){
    // e.progressで進捗を取得できる
};
```

## 標準認証 ##
かつてはURL埋め込み方式だった標準認証もsetBasicCredentialsが用意されました。

```
try{
    var xhr = Titanium.Network.createHTTPClient();
    xhr. setBasicCredentials(username, password);
    xhr.onload = function() {
        //do work on "this.responseXML"
    };
    xhr.open("GET","https://twitter.com/account/verify_credentials.xml");
    xhr.send();
}
catch(error){
    Titanium.UI.createAlertDialog({
        title: "Error",
        message: String(error),
        buttonNames: ['OK']
    }).show();
}
```

## リクエストヘッダの追加 ##
HTTPリクエストヘッダに対する操作も可能です。

```
// UAの指定
xhr.setRequestHeader('User-Agent','Mozilla/5.0 (iPhone; U; CPU like Mac OS X; en) AppleWebKit/420+ (KHTML, like Gecko) Version/3.0 Mobile/1A537a Safari/419.3');

// 認証系情報
xhr.setRequestHeader('Authorization','Basic '+Ti.Utils.base64encode(username.value+':'+password.value));
```

## メモリリーク回避 ##

参考：http://www.mountposition.co.jp/blog/?p=86

```
xhr.onload = null;
xhr.onreadystatechange = null;
xhr.ondatastream = null;
xhr.onerror = null;
xhr = null;
```


## 関連するKitchenSinkソース ##

  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/xhr_error.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/xhr_error.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/xhr_xml.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/xhr_properties.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/xhr_filedownload.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/xhr_utf8.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/xhr_cookie.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/xhr_settimeout.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/xhr_fileupload.js

## 関連するAPIドキュメント ##

  * http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.Network-module
  * http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.Network.HTTPClient-object.html


---

原著作者表示：[Appcelerator, Inc](http://www.appcelerator.com/)