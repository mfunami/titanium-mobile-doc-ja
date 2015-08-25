# UIカタログ(API) - Virtical Layout #
指定したWindowやViewの中に配置したコントロールやViewが垂直に自動配置されていくレイアウト指定です。

次の例では左がWindowと中心部のVIew, 右がTable View内のRowでVirtical Layoutを指定したものになります。

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100310/20100310035013.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100310/20100310035013.png)
![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100310/20100310035014.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100310/20100310035014.png)

```
// Windowのlayoutプロパティに 'virtical' を指定する。
var win = Ti.UI.currentWindow;
win.layout = 'vertical';

// ヘッダ部となるViewを設定する。（べつにヘッダというものがVirtical Layoutにあるわけではない）
var header = Ti.UI.createView({
    height:50,
    borderWidth:1,
    borderColor:'#999'
});
var headerLabel = Ti.UI.createLabel({
    color:'#777',
    top:10,
    textAlign:'center', 
    height:'auto', text:'Header'
});
header.add(headerLabel);
win.add(header);

// ボディ部となるViewを設定する。（同様にボディ部があるわけでもない）
// このボディ自体もVirtical Layoutするようにする(局所的なVirtical Layout)
var body = Ti.UI.createView({
    height:'auto', 
    layout:'vertical'
});
var bodyView1 = Ti.UI.createView({backgroundColor:'#336699', height:100, left:10, right:10});
var bodyView2 = Ti.UI.createView({backgroundColor:'#ff0000', height:50, left:10, right:10, top:10});
var bodyView3 = Ti.UI.createView({backgroundColor:'orange', height:50, left:10, right:10, top:10});
body.add(bodyView1);
body.add(bodyView2);
body.add(bodyView3);
win.add(body)

// 同様に「フッタ」を作る
var footer = Ti.UI.createView({
    height:50,
    borderWidth:1,
    borderColor:'#999'
});
var footerLabel = Ti.UI.createLabel({color:'#777', textAlign:'center', height:'auto', text:'Footer'});
footer.add(footerLabel);
win.add(footer);
```

## 関連するKitchenSinkソース ##

  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/vertical_layout_basic.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/vertical_layout_table_view.js


---

原著作者表示：[Appcelerator, Inc](http://www.appcelerator.com/)