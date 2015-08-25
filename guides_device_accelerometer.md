# APIカタログ(デバイスハードウェア編) - 加速度センサ #
Titaniumでは加速度センサについての詳細情報を取得するための低級APIとスマートにそれらの情報を扱えるようにイベント化された高級APIが提供されています。厳密な傾き判定などを行う場合は低級APIが必要になってきますが、「縦横の向きが変わった」ことや「シェイクしている」といったことを判断するだけなら高級APIだけで事足ります。

## 高級API ##
提供されているイベントは"shake"と"orientationchange"の二つだけです。

| **イベント名** | **説明** |
|:----------|:-------|
|shake      |２～３回デバイスを振るとイベントが発生します。|
|orientationchange|縦横の向きを変えるとイベントが発生します。|

```
// shakeイベント
Ti.Gesture.addEventListener("shake", function(){
    var dialog = Titanium.UI.createAlertDialog();
    dialog.setTitle('shake event');
    dialog.setMessage('鮭じゃないよ、シェイクだよ。'); 
    dialog.setButtonNames(['OK']);
    dialog.show();
});

// orientationchangeイベント
Ti.Gesture.addEventListener('orientationchange',function(e) {
   // イベントから取得する場合は次のように取得
   var o = e.orientation;
   // デバイスの状態を取るには次のように
   var o2 = Titanium.Gesture.orientation;
   /*
    状態の種類は次のとおり
   ・Titanium.UI.PORTRAIT
   ・Titanium.UI.UPSIDE_PORTRAIT
   ・Titanium.UI.LANDSCAPE_LEFT
   ・Titanium.UI.LANDSCAPE_RIGHT
   ・Titanium.UI.FACE_UP
   ・Titanium.UI.FACE_DOWN
   ・Titanium.UI.UNKNOWN
   */
});
```
画面の方向は強制的に変更も可能です。
```
Titanium.UI.orientation = Titanium.UI.LANDSCAPE_LEFT;
```
## 低級API ##
x, y, z軸の情報を取得するAPIです。

取得自体は次のようなコードで随時イベントが発生する感じです。
```
Ti.Accelerometer.addEventListener('update',function(e){
   document.getElementById('x').innerHTML = e.x;
   document.getElementById('y').innerHTML = e.y;
   document.getElementById('z').innerHTML = e.z
});
```
XYZの軸に関する状態について口で説明するよりもこれを見たほうが一発なので、こちらをご覧下さい。

  * Digital Agua's Blog : Accelerometer x,y,z based on iPhone position
    * http://blog.digitalagua.com/2008/07/15/accelerometer-xyz-based-on-iphone-position/

== 関連するKitchenSinkソース

  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/accelerometer.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/orientation.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/shake.js

## 関連するAPIドキュメント ##
  * http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.Gesture-module
  * http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.Accelerometer-module


---

原著作者表示：[Appcelerator, Inc](http://www.appcelerator.com/)