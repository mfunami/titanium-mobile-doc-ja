# UIカタログ(コントロール) - Label #
文字を表示するコントロールです。

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190703.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190703.png)

```
var win = Titanium.UI.currentWindow;

var l1 = Titanium.UI.createLabel({
	text:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
	width:200,
	height:150,
	top:10,
	color:'#336699',
	textAlign:'center'
});

win.add(l1);

var l2 = Titanium.UI.createLabel({
	text:'Appcelerator',
	height:50,
	width:'auto',
	shadowColor:'#aaa',
	shadowOffset:{x:5,y:5},
	color:'#900',
	font:{fontSize:48},
	top:170,
	textAlign:'center'
});

win.add(l2);

// 中略

var b2 = Titanium.UI.createButton({
	title:'Change Label 2',
	height:40,
	width:200,
	top:280
});
b2.addEventListener('click', function(){
	l2.color = '#ff9900';
	l2.shadowColor = '#336699';
	l2.font = {fontSize:20};
});
win.add(b2);
```


## 関連するKitchenSinkソース ##
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/label.js

## 関連するAPIドキュメント ##
  * http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.UI.Label-object


---

原著作者表示：[Appcelerator, Inc](http://www.appcelerator.com/)