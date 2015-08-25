# システムボタンアイコンの使い方 #
iPhoneOSに組み込まれているボタンアイコンを使う事ができます。
むしろ、そういった挙動（たとえばカメラ撮影をするなど）をする場合はこれらのアイコンを使う事が推奨されていますので、機能が合致する場合は積極的に使ったほうがよいでしょう。

ボタンのインスタンス作成時の引数として渡して使います。
```
var button = Titanium.UI.createButton({
    systemButton:Titanium.UI.iPhone.SystemButton.CAMERA
});
```

## ボタン一覧 ##
  * Titanium.UI.iPhone.SystemButton.ACTION
  * Titanium.UI.iPhone.SystemButton.CAMERA
  * Titanium.UI.iPhone.SystemButton.COMPOSE
  * Titanium.UI.iPhone.SystemButton.BOOKMARKS
  * Titanium.UI.iPhone.SystemButton.SEARCH
  * Titanium.UI.iPhone.SystemButton.ADD
  * Titanium.UI.iPhone.SystemButton.TRASH
  * Titanium.UI.iPhone.SystemButton.REPLY
  * Titanium.UI.iPhone.SystemButton.STOP
  * Titanium.UI.iPhone.SystemButton.REFRESH
  * Titanium.UI.iPhone.SystemButton.PLAY
  * Titanium.UI.iPhone.SystemButton.PAUSE
  * Titanium.UI.iPhone.SystemButton.FAST\_FORWARD
  * Titanium.UI.iPhone.SystemButton.REWIND
  * Titanium.UI.iPhone.SystemButton.EDIT
  * Titanium.UI.iPhone.SystemButton.CANCEL
  * Titanium.UI.iPhone.SystemButton.SAVE
  * Titanium.UI.iPhone.SystemButton.ORGANIZE
  * Titanium.UI.iPhone.SystemButton.DONE
  * Titanium.UI.iPhone.SystemButton.DISCLOSURE
  * Titanium.UI.iPhone.SystemButton.CONTACT\_ADD
  * Titanium.UI.iPhone.SystemButton.SPINNER
  * Titanium.UI.iPhone.SystemButton.INFO\_DARK
  * Titanium.UI.iPhone.SystemButton.INFO\_LIGHT

## 関連するKitchenSinkソース ##

  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/system_buttons.js

## 関連するAPIドキュメント ##

  * https://developer.appcelerator.com/apidoc/mobile/latest/Titanium.UI.iPhone.SystemIcon


---

原著作者表示：[Appcelerator, Inc](http://www.appcelerator.com/)