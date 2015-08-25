# APIカタログ(プラットフォーム編) - 他アプリケーション連携(OpenURL) #
## SMS/MMS ##
SMS/MMSアプリケーションの起動ですが、残念ながら個人（ひとり）への送信しか対応していません。カンマを入れたりしようとしても「カンマを含んだひとつのアドレス」として認識されるiPhone OS側の制限でできないようになっています。
spam対策でしょうから致し方ありませんね。
```
// 電話番号080-1234-5678 なひとにSMSを送る（実在していたらすいません）
Titanium.Platform.openURL('sms:08012345678');
```
## 電話 ##
これも単独宛先になります。
```
// 電話番号080-1234-5678 なひとに電話をかける（実在していたらすいません）
Titanium.Platform.openURL('tel:08012345678');
```
## WebページをSafariで開く ##
これもまあ想像通りだと思いますが。
```
// Googleにアクセス！
Titanium.Platform.openURL('http://www.google.co.jp/');
```

## 関連するAPIドキュメント ##
  * http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.Platform.openURL-method.html


---

原著作者表示：[Appcelerator, Inc](http://www.appcelerator.com/)