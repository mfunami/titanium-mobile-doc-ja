# APIカタログ(ユーティリティ編) - タイマー処理 #
TitaniumにはJavaScriptの`setTimeout`と`setInterval`を使って、タイマー処理をします。

`setTimeout`は指定した時間後に処理を実行させるのに対し、`setInterval`は一定間隔で処理を繰り返し実行します。
```
//setTimeoutの例
var labelTimeout = Ti.UI.createLabel({
    text: 'setTimeout',
    textAlign:'center',
    width:'auto',
    height: 20,
    top:20
});
Ti.UI.currentWindow.add(labelTimeout);

// 3000ms後に描画する。
setTimeout(function(){
	labelTimeout.text = "3 sec timer fired!!";
}, 3000);
	
// setIntervalの例
var count = 0;
var labelInterval = Ti.UI.createLabel({
    text: '0',
    textAlign:'center',
    width:'auto',
    height: 20,
    top:100
});
Ti.UI.currentWindow.add(labelInterval);

// 10msごとにカウントアップし、描画する。
setInterval(function(){
    count++;
    labelInterval.text = "Interval fired " + count;
}, 10);
```


## 関連するKitchenSinkソース ##

  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/set_timeout.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/set_interval.js

## 関連するAPIドキュメント ##
  * http://developer.appcelerator.com/apidoc/mobile/latest/Titanium-module


---

原著作者表示：[Appcelerator, Inc](http://www.appcelerator.com/)