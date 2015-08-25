# APIカタログ(ユーティリティ編) - カスタムイベント #
カスタムイベントを設定し、それを任意のタイミングでfireすることにより多彩な処理を行う事ができます。

以下ではapp.jsで宣言したメッセージ表示用イベントをグローバル関数的に使う手法をサンプルに挙げます。
```
//---------------------------------------------
// app.js
//---------------------------------------------

//メッセージ表示用のWindow - View - Labelのセットを作っておく
var messageWin = Titanium.UI.createWindow({
	height:30,
	width:250,
	bottom:70,
	borderRadius:10,
	touchEnabled:false
});
var messageView = Titanium.UI.createView({
	height:30,
	width:250,
	borderRadius:10,
	backgroundColor:'#000',
	opacity:0.7,
	touchEnabled:false
});
var messageLabel = Titanium.UI.createLabel({
	text:'',
	color:'#fff',
	width:250,
	height:'auto',
	font:{
		fontFamily:'Helvetica Neue',
		fontSize:13
	},
	textAlign:'center'
});
messageWin.add(messageView);
messageWin.add(messageLabel);

// カスタムイベント「show_message」を設定しておきます。
Titanium.App.addEventListener('show_message', function(e){
    // 内容としてはメッセージ表示して1秒後にcloseするというシンプルなものです
    messageLabel.text = e.message;
    messageWin.open();
    setTimeout(function(){
        messageWin.close({opacity:0,duration:500});
    },1000);
});
```

Titanium.Appに対するイベントリスナの登録なので、グローバルに適用されます。次のボタンをクリックすると「サンプル」というメッセージが表示される寸法です。

```
// sample.js
var b = Titanium.UI.createButton({
    title:'Fire Event ',
    width:200,
    height:40,
    top:60
});
b.addEventListener('click', function(){
    Titanium.App.fireEvent('show_message', {message: 'サンプル', arg1: 'hogehoge'});
});
```

## 関連するAPIドキュメント ##
  * http://developer.appcelerator.com/apidoc/mobile/latest/Titanium-module
  * http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.App-module


---

原著作者表示：[Appcelerator, Inc](http://www.appcelerator.com/)