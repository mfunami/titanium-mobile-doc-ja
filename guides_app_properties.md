# APIカタログ(I/O編) - アプリケーションプロパティ #
アプリケーション上での設定を保存するためのの仕掛けが用意されています。

`Titanium.App.Properties`にはset〜とget〜という関数が型単位で用意されています。

| **型** | **get〜** | **set〜** |
|:------|:---------|:---------|
| **string** | getString | setString |
| **int** | getInt   | setInt   |
| **boolean** | getBool  | setBool  |
| **double** | getDouble | setDouble |
| **Array** | getList  | setList  |

第一引数はプロパティ名で、set〜の場合、第二引数にプロパティに設定する値をセットします。

プロパティを削除する場合は第二引数に `null` を設定してください。

```
// 出力
Titanium.App.Properties.setString('String','I am a String Value ');
Titanium.App.Properties.setInt('Int',10);
Titanium.App.Properties.setBool('Bool',true);
Titanium.App.Properties.setDouble('Double',10.6);
Titanium.App.Properties.setList('MyList',array);

// 入力（表示はログレベルinfoで)
Titanium.API.info('String: '+ Titanium.App.Properties.getString('String'));
Titanium.API.info('Int: '+ Titanium.App.Properties.getString('Int'));
Titanium.API.info('Bool: '+ Titanium.App.Properties.getString('Bool'));
Titanium.API.info('Double: '+ Titanium.App.Properties.getString('Double'));
Titanium.API.info('List:');
```

また現在のプロパティ一覧の取得やプロパティの存在確認を行うためのメソッドもあります。

```
// プロパティの存在確認をします
var bool = Titanium.App.Properties.hasProperty("prop_name");

// プロパティ名の配列を返します。
var list = Titanium.App.Properties.listProperties()
```

## 関連するAPIドキュメント ##
  * http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.App.Properties-module


---

原著作者表示：[Appcelerator, Inc](http://www.appcelerator.com/)