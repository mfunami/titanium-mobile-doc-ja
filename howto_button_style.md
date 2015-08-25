# ボタン形状の指定 #
iPhoneのNative UIのボタンには３種類の形状が用意されています。
使うにはボタン生成時に以下のように引数として指定する必要があります。
```
var button = Titanium.UI.createButton({
  title:'Text',
  style:Titanium.UI.iPhone.SystemButtonStyle.DONE
});
```

引数の種類としては以下の３つから選びます。

  * Titanium.UI.iPhone.SystemButtonStyle.PLAIN
  * Titanium.UI.iPhone.SystemButtonStyle.BORDERED
  * Titanium.UI.iPhone.SystemButtonStyle.DONE

## 関連するAPIドキュメント ##
  * https://developer.appcelerator.com/apidoc/mobile/latest/Titanium.UI.iPhone.SystemButtonStyle


---

原著作者表示：[Appcelerator, Inc](http://www.appcelerator.com/)