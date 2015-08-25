# UIカタログ - StatusBar (iOSのみ) #


StatusBarは３種類の設定を切り替えることができます。

また、表示非表示も切り替える事が出来ます。

```
// これはTRANSLUCENT_BLACK指定時
Titanium.UI.iPhone.setStatusBarStyle(Titanium.UI.iPhone.StatusBar.TRANSLUCENT_BLACK);
```
```
// ステータスバーを消す
Titanium.UI.iPhone.hideStatusBar();
// 再表示する
Titanium.UI.iPhone.showStatusBar();
```

## 表示例 ##

|Titanium.UI.iPhone.StatusBar.GREY|![http://img.skitch.com/20090708-cma3hx6tusnyaw9mw5e6qd4frg.jpg](http://img.skitch.com/20090708-cma3hx6tusnyaw9mw5e6qd4frg.jpg)|
|:--------------------------------|:------------------------------------------------------------------------------------------------------------------------------|
|Titanium.UI.iPhone.StatusBar.TRANSLUCENT\_BLACK|![http://img.skitch.com/20090708-x3rbdnmysgyhmkaufnr4gdbfmu.jpg](http://img.skitch.com/20090708-x3rbdnmysgyhmkaufnr4gdbfmu.jpg)|
|Titanium.UI.iPhone.StatusBar.OPAQUE\_BLACK|![http://img.skitch.com/20090708-mx53dehqc4dcr4fb6jypb56h31.jpg](http://img.skitch.com/20090708-mx53dehqc4dcr4fb6jypb56h31.jpg)|

## 関連するKitchenSinkソース ##

  * http://github.com/appcelerator/KitchenSink/blob/master/Resources/examples/statusbar.js

## 関連するAPIドキュメント ##
  * https://developer.appcelerator.com/apidoc/mobile/latest/Titanium.UI.iPhone-module
  * https://developer.appcelerator.com/apidoc/mobile/latest/Titanium.UI.iPhone.StatusBar-object


---

原著作者表示：[Appcelerator, Inc](http://www.appcelerator.com/)