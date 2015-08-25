# APIカタログ(デバイスハードウェア編) - 振動（バイブレーション） #

単純な振動制御のみですが、以下のようにすることで振動します。
```
var b1 = Titanium.UI.createButton({
	title:'Vibrate',
	height:40,
	width:300,
	top:10
});

b1.addEventListener('click', function(){
	Titanium.Media.vibrate();
});
```
## 関連するKitchenSink ##
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/vibrate.js

## 関連するAPIドキュメント ##
  * http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.Media-module


---

原著作者表示：[Appcelerator, Inc](http://www.appcelerator.com/)