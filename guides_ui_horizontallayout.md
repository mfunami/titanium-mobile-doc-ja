# UIカタログ(API) - Horizontal Layout #
指定したWindowやViewの中に配置したコントロールやViewが追加した順に水平に自動配置されていくレイアウト指定です。

![http://img.f.hatena.ne.jp/images/fotolife/d/donayama/20101031/20101031181903.png](http://img.f.hatena.ne.jp/images/fotolife/d/donayama/20101031/20101031181903.png)

```
var win = Ti.UI.currentWindow;

// レイアウトプロパティにhorizontalを指定する。
var view = Ti.UI.createView({
    height:300,
    width:320,
    layout:'horizontal'
});
win.add(view);

// leftの指定値ではなく、追加した順番にラベルが配置されているのが、
// 上のスクリーンショットと対比すると分かる。
var l1 = Ti.UI.createLabel({
    text:'I am the first label',
    left:5,
    width:'auto',
    height:20,
});
view.add(l1);

var l2 = Ti.UI.createLabel({
    text:'I am the second label',
    left:2,
    width:'auto',
    height:20
});
view.add(l2);

var l3 = Ti.UI.createLabel({
    text:'I am the third label',
    left:2,
    width:'auto',
    height:20
});
view.add(l3);
```

## 関連するKitchenSinkソース ##

  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/horizontal_layout.js


---

原著作者表示：[Appcelerator, Inc](http://www.appcelerator.com/)