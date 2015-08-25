# APIカタログ(デバイスハードウェア編) - 電源状態 #
バッテリ容量・充電状況についての状態を取得するプロパティとその変化を通知するイベントがあります。

## 充電状況 ##
|Titanium.Platform.BATTERY\_STATE\_UNKNOWN|不明|
|:----------------------------------------|:-|
|Titanium.Platform.BATTERY\_STATE\_UNPLUGGED|放電中|
|Titanium.Platform.BATTERY\_STATE\_CHARGING|充電中|
|Titanium.Platform.BATTERY\_STATE\_FULL   |フル|

## コード例・解説 ##
```
// 電源状態の取得
var bs = Titanium.Platform.batteryState;

// バッテリ残量の取得
var bl = Titanium.Platform.batteryLevel;

// バッテリ状況変化を検知するイベント
Titanium.Platform.addEventListener('battery', function(e){
    // 状態と残量が以下のように返されます。
    var state = e.state;
    var level = e.level;
});
```

## 関連するAPIドキュメント ##
  * http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.Platform-module


---

原著作者表示：[Appcelerator, Inc](http://www.appcelerator.com/)