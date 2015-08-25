# APIカタログ(プラットフォーム編) - アプリケーションバッジ (iPhoneのみ) #
アプリケーションバッジとは以下の図の右についている状態のものを指します。

表示できるのはタブバッジとは異なり数値のみとなりますので、未読数などを表示する以外になかなか使い道がなさそうです。

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100311/20100311213210.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100311/20100311213210.png)
![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100311/20100311213209.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100311/20100311213209.png)

```
// 20と表示する。（ホーム画面に戻らないと確認できない）
Titanium.UI.iPhone.appBadge = 20;

// バッジを外す
Titanium.UI.iPhone.appBadge = null;
```


## 関連するKitchenSinkソース ##

  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/app_badge.js

## 関連するAPIドキュメント ##
  * http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.UI.iPhone-module


---

原著作者表示：[Appcelerator, Inc](http://www.appcelerator.com/)