# UIカタログ(API) - ダイアログ関連 #


## シンプルなアラート(Alert Dialog) ##
![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100313/20100313205050.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100313/20100313205050.png)

タイトルとメッセージ、OKボタンだけというようなダイアログのパターンは次のように記述します。

```
var dialog = Titanium.UI.createAlertDialog();
dialog.setTitle('アラートのテスト');
dialog.setMessage('メッセージはここに指定します。'); 
dialog.show();
```

このような引数を引き渡すことにより、ボタンを増やしたりキャンセルボタンの認識が可能になる生成方法もあります。

```
var alertDialog = Titanium.UI.createAlertDialog({
    title: 'キャンセルのテスト',
    message: 'テスト',
    buttonNames: ['OK','きゃんせる'],
    // キャンセルボタンがある場合、何番目(0オリジン)のボタンなのかを指定できます。
    cancel: 1
});
alertDialog.addEventListener('click',function(event){
    // Cancelボタンが押されたかどうか
    if(event.cancel){
        // cancel時の処理
    }
    // 選択されたボタンのindexも返る
    if(event.index == 0){
        // "OK"時の処理
    }
});
alertDialog.show();

```

## 処理選択をするダイアログ(Option Dialog) ##
![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100313/20100313205051.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100313/20100313205051.png)

プロンプトと共に処理内容を選択させるような画面です。
```
// ダイアログの生成
var dialog = Titanium.UI.createOptionDialog();

// タイトルということになっていますが、プロンプト的な位置づけですね。
dialog.setTitle('どの処理を実行しますか？');

// ボタンの配置（ちなみに配列なので0オリジンでindexを持ちます）
dialog.setOptions(["更新","削除","キャンセル"]);

// 削除などの破壊的な挙動をするボタンは赤くするという規定が
// iPhoneにはあるのでそれに該当するボタンのindexを指定します。
dialog.setDestructive(1);

// キャンセルボタンにも同様の規定があるので、indexを指定します。
dialog.setCancel(2);

// ボタン選択時の処理はイベントハンドラを記述します。
// 第一引数のindexプロパティで選択されたボタンのindexが設定されます。
dialog.addEventListener('click',function(event){
    if(event.index == 0){
        // 更新処理
    }
    else if(event.index == 1){
        // 削除処理(event.desctructive == trueでも可能)
    }
    // キャンセル時はevent.cancel == trueとなる
});

// ダイアログを表示します。
dialog.show();
```

## E-mail作成ダイアログ ##
![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100313/20100313205052.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100313/20100313205052.png)

いわゆるe-mailの作成画面です。

ぼくはMMSに対応してからめっきり使わなくなりましたが(^^;
```
var emailDialog = Titanium.UI.createEmailDialog();

// 題名の初期値をセットします
emailDialog.setSubject('題名');

// To, Cc, Bccについては文字列配列として引き渡します。
emailDialog.setToRecipients(['foo1@yahoo.com', 'foo2@yahoo.com']);
emailDialog.setCcRecipients(['bar@yahoo.com']);
emailDialog.setBccRecipients(['hoge@yahoo.com']);

// 本文と添付(ここではすでにimageというオブジェクトがある前提)を初期設定します。
emailDialog.setMessageBody('this is a test message');
emailDialog.addAttachment(image);

// ツールバー色を指定して画面を開きます。
emailDialog.setBarColor('#336699');
emailDialog.open();
```

### 独自のイベント ###
EmailDialogには作成完了を受け取るイベントがあります。
```
emailDialog.addEventListener('complete', function(e){
    // e.resultに以下の４つのいずれかが返る
    // ・Titanium.UI.EmailDialog.SENT
    // ・Titanium.UI.EmailDialog.SAVED
    // ・Titanium.UI.EmailDialog.CANCELED
    // ・Titanium.UI.EmailDialog.FAILED
    
    // 送信成功時にはe.success == trueが設定される
    if(e.success == false){
        // e.errorにエラー時のメッセージ
    }
});
```

## 関連するKitchenSinkソース ##

  * http://github.com/appcelerator/KitchenSink/blob/master/Resources/examples/alert.js
  * http://github.com/appcelerator/KitchenSink/blob/master/Resources/examples/options_dialog.js
  * http://github.com/appcelerator/KitchenSink/blob/master/Resources/examples/email_dialog.js


## 関連するAPIドキュメント ##

  * https://developer.appcelerator.com/apidoc/mobile/latest/Titanium.UI.AlertDialog-object
  * https://developer.appcelerator.com/apidoc/mobile/latest/Titanium.UI.OptionDialog-object
  * https://developer.appcelerator.com/apidoc/mobile/latest/Titanium.UI.EmailDialog-object


---

原著作者表示：[Appcelerator, Inc](http://www.appcelerator.com/)