# UIカタログ - NavBar #
WindowのStatusBarの直下にあり、画面遷移をしていく画面でのナビゲーション・指示を司るUI部品です。



## 表示・非表示の切り替え ##
```
// 現在のwindowから表示→非表示
Titanium.UI.currentWindow.hideNavBar();

// 現在のwindowから非表示→表示
Titanium.UI.currentWindow.showNavBar();
```

## 背景色の変更 ##
Window生成時に指定する方法と動的な変更の二種類があります。
```
// window生成時に指定する。
var win = Titanium.UI.createWindow({barColor:'#336699'});

// 現在表示中のWindowのNavBarの背景色を変更する。
Titanium.UI.currentWindow.barColor = '#336699';

// デフォルト色に戻す。
Titanium.UI.currentWindow.barColor = null;
```

translucentプロパティをtrueに設定すると、背景透過表示がされます。

## 表示テキストの変更 ##
タイトル部分・プロンプトを表示する場合は次のようにします。
```
// タイトル変更
Titanium.UI.currentWindow.title = 'タイトル';

// プロンプトの表示(再び無効にする場合はnullを設定する)
Titanium.UI.currentWindow.titlePrompt = 'プロンプトが表示されます。';
```

また、戻るボタンの表示内容も同様に変更できます。
```
Titanium.UI.currentWindow.backButtonTitle = '戻る！';
```
## タイトル部への画像表示 ##
タイトルのかわりに画像を表示する事も可能です。
```
// 画像を表示する(消す場合はnullを設定)
Titanium.UI.currentWindow.titleImage = '../images/slider_thumb.png';
// 戻るボタンも画像化することが可能です
Titanium.UI.currentWindow.backButtonTitleImage = null;	
```
## コントロールの配置 ##
NavBarもコントロールコンテナなので、各種コントロールを載せる事ができます。

ここでは[Button](Button.md)を配置していますが、[Switch](Switch.md)や[Slider](Slider.md)、[TabbedBar](TabbedBar.md)や[TextField](TextField.md)といったものまで配置できます。
```
var b1 = Titanium.UI.createButton({title:'Left Nav'});
var b2 = Titanium.UI.createButton({title:'Title'});
var b3 = Titanium.UI.createButton({title:'Right Nav'});

// タイトル部にボタン配置
Titanium.UI.currentWindow.titleControl = b2;

// 左右のボタンにも配置可能です
Titanium.UI.currentWindow.leftNavButton = b1;
Titanium.UI.currentWindow.setLeftNavButton(null);
Titanium.UI.currentWindow.rightNavButton = b3;
Titanium.UI.currentWindow.setRightNavButton(null);
```

## 関連するKitchenSinkソース ##

  * http://github.com/appcelerator/KitchenSink/blob/master/Resources/examples/window_navbar.js

## 関連するAPIドキュメント ##
  * https://developer.appcelerator.com/apidoc/mobile/latest/Titanium.UI.Window-object

---

原著作者表示：[Appcelerator, Inc](http://www.appcelerator.com/)