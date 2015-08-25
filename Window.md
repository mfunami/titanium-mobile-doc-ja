# UIカタログ - Window #



## モード ##
Windowには通常モードとフルスクリーンモードの二つがあります。

フルスクリーンモード下では、StatusBar・NavBar・ToolBar・ TabGroupといった部品をもつ事ができませんが、デバイスの表示領域一杯を使う事ができます。

一方、通常モードはStatusBarとNavBarが標準で表示されます。

TabGroupを配置する場合、Windowオブジェクト群はTabGroupの子オブジェクトとして配置されます。

## Windowの作成 ##
windowを生成するために`Titanium.UI.createWindow`というAPIが用意されています。

仕様上ひとつのwindowしか同時に表示できないため、作成されたwindowはwindowスタックに格納されるだけになります。
現在表示されているwindowを閉じると、スタックの一つ手前にあるwindowが再び表示されるようになります。
```
// 切り替え時にはアニメーションする。独立した表示
var win = Titanium.UI.createWindow();
win.open({animated:true});

// 現在のTabに所属させるのなら次のとおり。
Titanium.UI.currentTab.open(win,{animated:true});
```

上記のように`open`メソッドの引数として`animeted`プロパティを指定する事により、アニメーション制御できます。この例ではwindowが左へスライドしていくような動きをします。`false`指定時は切り替わるだけの動きになります。

## 表示されているWindowの取得と操作 ##

現在表示されているwindowは`Titanium.UI.currentWindow`プロパティを用いてアクセスできます。

たとえば、このwindowに対して`close`メソッドを実行すると現在表示されているwindowを閉じることができます。
```
Titanium.UI.currentWindow.close();
```

## フルスクリーン ##
次のようにWindowのOpen時に指定するとフルスクリーン表示されます。
```
// 全面赤の背景色指定
var window = Titanium.UI.createWindow({
   backgroundColor:'red'
});
window.open({
    fullscreen:true
});
```

## 副コンテキストへの分割 ##
別のJavaScriptファイルをurlプロパティで指定（Resourcesフォルダからの相対パス）してWindowを生成する事ができます。あくまでもアプリケーションローカルのファイルしか読み取れません。セキュリティの観点からリモートURLは拒否されます。

```
// app.js
var win = Titanium.UI.createWindow({
    url: 'foo.js'
});
```

この際、新しいWindowのJavaScriptコードは別のコンテキスト（副コンテキスト）で評価・実行されます。またこれはapp.jsとは別のスレッドでそれぞれ実行される形となります。

特殊なプロパティ `Titanium.UI.currentWindow` のみ副コンテキストにおいて、グローバルコンテキストのオブジェクトを参照できます。

### グローバルコンテキストのオブジェクト参照 ###
通常、副コンテキストの変数やファンクションといったオブジェクトはグローバルコンテキストを直接参照できませんが、グローバルコンテキストのオブジェクトを次のように引き渡す事で、副コンテキストからグローバルコンテキストのオブジェクトを参照できるようになります。

簡単な例として、まず app.js で次のように変数 a とファンクション b を定義します。
```
// app.js
var a = 1;
function b(){
    return "hello";
}
```
続いて、foo.jsをurlプロパティで指定した新しいウィンドウ w を定義します。
```
// app.jsの続き
var w = Titanium.UI.createWindow({
    url: 'foo.js'
});
```
そのままだと w 上では変数 a とファンクション b を認識する事ができませんが、次のように w に対して割り当てることで、参照を渡す事が出来ます。
```
// app.jsの続き
w.a = a;
w.b = b;
```
ここではw.aやw.bという形で名前を引き渡しましたが、別段同じ名前である必要はありません。
```
// foo.js
alert("b() = " + Titanium.UI.currentWindow.b());
```
コード ` Titanium.UI.currentWindow.b() `により、グローバルコンテキスト（app.js）のファンクション b が評価され、結果が返ります。

この手法では値のコピー渡しではなく、参照渡しとなります。そのため、この参照に対して行われたいかなる変更もすべての副コンテキストに反映され、利用可能となります。

### 独自のイベント ###
グローバルコンテキストから個別のWindow（副コンテキスト下）に対して独自のイベントを送る（逆のパターンも含め）ためには、Titaniumに内蔵されているイベント機構を使用します。

たとえば、次のように独自のイベント foo を定義したとします。
```
// bar.js
Titanium.UI.currentWindow.addEventListener('foo', function(e){
    Titanium.API.info("foo event received = " + JSON.stringify(e));
});
```
次のようにapp.jsからイベント foo を起動します。
```
// bar.jsを副コンテキストで作成＆表示
var window = Titanium.UI.createWindow({
    url:'bar.js'
});
window.open();

// 独自イベントfooにイベント引数(JSON)を指定して起動する。
window.fireEvent('foo', {a: 'b' });
```

以下の2点に気をつけてください。

  * 独自イベントを起動する前に、イベントリスナに登録しておく必要があります。しかし、windowは呼び出し元(たとえばapp.js)と別スレッドで非同期に処理されているため、windowを作成直後にイベントを起動する必要がある場合、ある程度の時間を置かなければならない可能性があります。
  * イベント引数(JSON)として引き渡せるのはシリアライズ可能なオブジェクトに限られます。もし、ファンクション参照などをもったオブジェクトを渡そうとしてもそれらはnullとして扱われます。

## アニメーション ##
Windowも他のView同様にアニメーション表示できます。ふたつのWindowの間で遷移する場合はanimeteメソッドのtrasitionプロパティで指定します。
```
// 遷移先のウィンドウ
var window2 = Titanium.UI.createWindow({
    url: 'foo.js'
});
// 現在のWindowがwindow1とする
window1.animate({
    view: window2,
    transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
});
```
また、open時の引数として指定する方法もあります。
```
nextWindow.open({
	transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
});
```

[詳細はこちら](guides_ui_animation.md)

## モーダルウィンドウ ##
いくつかの表示形式でモーダルウィンドウを前面に表示できるようになっています。

![http://img.skitch.com/20100406-bqb3f8pb6e4ger7wkcdcw5mbar.png](http://img.skitch.com/20100406-bqb3f8pb6e4ger7wkcdcw5mbar.png)

```
var window = Titanium.UI.createWindow();
window.open({
    modal:true,
    modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL,
    modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET
})
```

### 表示形式(modalStyle) ###

  * Ti.UI.iPhone.MODAL\_PRESENTATION\_CURRENT\_CONTEXT
    * 親ウィンドウと同じスタイルで表示する。
  * Ti.UI.iPhone.MODAL\_PRESENTATION\_FORMSHEET
    * 高さ・幅ともにスクリーンサイズより小さいウィンドウを中央寄せで表示します。もし横向きでキーボード表示をしている場合は上余白を詰めて表示されます。 ウィンドウの外側は薄暗くマスクされ、タッチしても反応しません。
  * Ti.UI.iPhone.MODAL\_PRESENTATION\_FULLSCREEN
    * スクリーン全体を覆う形で表示されます。
  * Ti.UI.iPhone.MODAL\_PRESENTATION\_PAGESHEET
    * スクリーンの高さと同じ高さ、ウィンドウ幅は縦方向時のスクリーンの幅と同じに設定されたウィンドウを表示します。ウィンドウの外側は薄暗くマスクされ、タッチしても反応しません。（縦方向のときはTi.UI.iPhone.MODAL\_PRESENTATION\_FULLSCREENと同じ挙動となります）

### 表示時アニメーション(modalTransitionStyle) ###

  * Ti.UI.iPhone.MODAL\_TRANSITION\_STYLE\_COVER\_VERTICAL
  * Ti.UI.iPhone.MODAL\_TRANSITION\_STYLE\_CROSS\_DISSOLVE
  * Ti.UI.iPhone.MODAL\_TRANSITION\_STYLE\_FLIP\_HORIZONTAL
  * Ti.UI.iPhone.MODAL\_TRANSITION\_STYLE\_PARTIAL\_CURL

## Android "root" Windows ##
In Android, you may wish to specify that a window which you create (such as the first window) should be considered the root window and that the application should exit when the back button is pressed from that window. This is particularly useful if your application is not using a Tab Group and therefore the splash screen window is appearing whenever you press the back button from your lowest window on the stack.

To indicate that a particular window should cause an application to exit when the back button is pressed, pass exitOnClose: true as one of the creation arguments, as shown here:
```
var win = Titanium.UI.createWindow({
    title: 'My Root Window',
    exitOnClose: true
});
```

## Windowに関する特殊なイベント ##
windowも配下になるviewの一環なのでviewがもつすべてのイベントをハンドルすることができますが、それとは別に
windowのイベントとしては次のようなものがあります。

| **イベント** | **発生するタイミング** |
|:---------|:--------------|
|open      |開く             |
|close     |閉じる            |
|focus     |選択状態になる        |
|blur      |選択外状態になる       |

## 関連するKitchenSinkソース ##

  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/window_properties.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/window_standalone.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/window_constructor.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/window_layout.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/window_events.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/modal_windows.js

## 関連するAPIドキュメント ##
  * https://developer.appcelerator.com/apidoc/mobile/latest/Titanium.UI.Window-object


---

原著作者表示：[Appcelerator, Inc](http://www.appcelerator.com/)