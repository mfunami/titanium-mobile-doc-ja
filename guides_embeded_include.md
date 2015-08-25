# APIカタログ - ユーティリティ編 - 外部 JavaScript 取込み #
配列処理をスマートに実現したり、あるいは毎度同じように書いているtwitterへのpost処理などをライブラリ化して読み込ませたいといったことも多々あると思います。

Cにおける`#include`のような機能が`Titanium.include`関数で実現します。

読み込まれたjsファイルは同じコンテキストで処理されるため、外部ファイル側で定義された変数などがそのまま使えます。

```
// 複数のjsファイルを "," 区切りで列挙できる
Titanium.include('../my_js_include.js', '../my_js_include_2.js', 'local_include.js');

// 中で使われているそれぞれの変数は外部ファイルで定義されているものと考えてください
Ti.UI.createAlertDialog({
    title:'JS Includes',
    message:'first name: ' + myFirstName + ' middle name: ' + myMiddleName +' last name: ' + myLastName
}).show();
```

Titanium.includeは使用したコンテキストに対して指定したスクリプトを当てはめて評価されるため、同じ名前のオブジェクト(functionやclassも含む)はすべて上書きされます。

意図しない挙動の原因にもなるので名前空間の汚染をしないように常々心がけ、また命名には細心の注意を払う必要があるでしょう。

別コンテキストで評価可能であるのならば、windowを分割するなどして対策しましょう。


## 関連するKitchenSinkソース ##

  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/js_include.js

## 関連するAPIドキュメント ##

  * http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.include-method.html


---

原著作者表示：[Appcelerator, Inc](http://www.appcelerator.com/)