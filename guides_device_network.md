# APIカタログ(ネットワーク編) - ネットワークの状態 #
## コード例・解説 ##
```
// 通信状態じゃないと使えないアプリ(AppStoreとかもそうですが)がありますが、
// まずネットワークの状態を判断できる必要がありますね。

// 今現状のネットワーク状態を取得する
if(Titanium.Network.online){
   // boolean値で接続状態が返ります。
   // さらにどんなネットワークにつながっているのかを判断できます。
   var nt = Titanium.Network.networkType;
   /*
    候補として以下のいずれかの値になります。
    ・Titanium.Network.NETWORK_LAN
    ・Titanium.Network.NETWORK_MOBILE
    ・Titanium.Network.NETWORK_WIFI
    ・Titanium.Network.NETWORK_NONE
    ・Titanium.Network.NETWORK_UNKNOWN

    文字列として判断したい場合は Titanium.Network.networkTypeName を使ってください。
    */
}

// 接続状態が変わる度にイベントを発生させるリスナーです。
Titanium.Network.addConnectivityListener('change', function(e) {
    var online = e.online;
    var type = e.networkType;
    var networkTypeName = e.networkTypeName;
});
```

## 関連するKitchenSinkソース ##

  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/network.js

## 関連するAPIドキュメント ##

  * http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.Network-module


---

原著作者表示：[Appcelerator, Inc](http://www.appcelerator.com/)