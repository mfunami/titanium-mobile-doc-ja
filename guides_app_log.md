# APIカタログ(ユーティリティ編) - ログ出力 #
その名の通り、ログ出力します。

シミュレータ実行時にこんな表示がされるあれです。

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100311/20100311214011.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100311/20100311214011.png)

ログ出力系フレームワークをお使いならおなじみだと思いますが、ログレベルという概念があり、設定したログレベル以上のものに絞り込まれて表示や出力がされます。

| **高** | error |
|:------|:------|
| **↑** | warn  |
| **↓** | info  |
| **低** | debug |

たとえば、infoに設定しているとdebugレベルの内容は表示されません。

これという明確な線引きはありませんが、致命的なものがerror、警告レベルがwarnという感じでしょうか。

```
Ti.API.error('致命的なエラー');
Ti.API.warn('警告');
Ti.API.info('情報');
Ti.API.debug('デバッグ情報');
```

## 関連するKitchenSinkソース ##

  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/logging.js

## 関連するAPIドキュメント ##
  * http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.API-module


---

原著作者表示：[Appcelerator, Inc](http://www.appcelerator.com/)