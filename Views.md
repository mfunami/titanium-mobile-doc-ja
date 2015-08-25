# UIカタログ - View共通 #
Titanium MobileのWindowにはView、もしくはControlを格納できます。

複雑なUI制御/レイアウトをする際にはWindow上に直接Controlを配置するのではなく、Viewの上に配置していくほうが制御しやすいです。

## Viewの追加と表示 ##
生成されたViewは必ずWindowもしくは他のViewに追加しなければ利用できません。
```
// Viewを作成
Titanium.UI.createView({
   borderRadius:10,
   backgroundColor:'red',
   width:50,
   height:50
});

// 新たに作られた myView をWindowに追加する
Titanium.UI.currentWindow.add(myView);
```

最後に追加されたViewがWindow上では初期表示されますが、他の追加しておいたViewに切り替えたり、最初から`visible: false`として追加したViewを表示させるには`window#animate`を実行する事により、表示させる事が出来ます。

またshowメソッド、hideメソッドも用意されています。

その際にtransitionプロパティを指定する事により、すでに用意されているアニメーションを簡単に実行できます。

次の例では左へフリップするアニメーションで表示します。
```
// myViewはすでにあるものとする
Titanium.UI.currentWindow.animate({
    view: myView,
    transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
});
```

Transitionアニメーションスタイルには次の5つがあります。

  * `Titanium.UI.iPhone.AnimationStyle.CURL_UP`
  * `Titanium.UI.iPhone.AnimationStyle.CURL_DOWN`
  * `Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT`
  * `Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT`
  * `Titanium.UI.iPhone.AnimationStyle.NONE`

## Viewのイベント ##
View系のオブジェクトには共通して以下のようなイベントをハンドリングできるようになっています。
```
// タッチ開始
view.addEventListener('touchstart', function(e){
    // e.x, e.y：座標
});
// タッチしながら移動
view.addEventListener('touchmove', function(e){
    // e.x, e.y：座標
});
// タッチ終了
view.addEventListener('touchend', function(e){
    // e.x, e.y：座標
});
// タッチ中止
view.addEventListener('touchcancel', function(e){
    // e.x, e.y：座標
});
// シングルタップ
view.addEventListener('singletap', function(e){
    // e.x, e.y：座標
});
// ダブルタップ
view.addEventListener('doubletap', function(e){
    // e.x, e.y：座標
});
// 二本指でのシングルタップ
view.addEventListener('twofingertap', function(e){
    // e.x, e.y：座標
});
// スワイプ
view.addEventListener('swipe', function(e){
    // e.x, e.y：座標
    // e.direction：スワイプの向き(left | right)
});
// クリック
view.addEventListener('click', function(e){
    // e.x, e.y：座標
});
// ダブルクリック
view.addEventListener('dblclick', function(e){
    // e.x, e.y：座標
});
```

## Viewを削除する ##
画面の動的な変更をするために一旦画面に表示・使用したViewを削除することも可能です。
```
Ti.UI.currentWindow.remove(view);
```

## 関連するKichenSinkソース ##

  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/view_event_propagation.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/view_event_interaction.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/view_events.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/view_events_2.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/view_hide_show.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/views_zindex.js

## 関連するAPIドキュメント ##

http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.UI.View-object
http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.UI.iPhone.AnimationStyle-object.html



---

原著作者表示：[Appcelerator, Inc](http://www.appcelerator.com/)