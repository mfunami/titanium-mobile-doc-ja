# tiapp.xml, manifestについて #

## tiapp.xml ##
tiapp.xmlファイルはプロジェクトルートにあり、mafinestファイルと並んで、アプリケーションに関する情報を保存するためのファイルとなっています。

```
<?xml version="1.0" encoding="UTF-8"?>
<ti:app xmlns:ti="http://ti.appcelerator.org">
  <id>jp.hsj.test100</id>
  <name>Test100</name>
  <version>1.0</version>
  <publisher>donayama</publisher>
  <url>http://twitter.com/donayama/</url>
  <description>No description provided</description>
  <copyright>2010 by donayama</copyright>
  <icon>appicon.png</icon>
  <persistent-wifi>false</persistent-wifi>
  <prerendered-icon>false</prerendered-icon>
  <statusbar-style>default</statusbar-style>
  <statusbar-hidden>false</statusbar-hidden>
  <analytics>true</analytics>
  <guid>10eef80833b94e88ba0a455981620606</guid>
</ti:app>
```


|**要素名**|**説明**|
|:------|:-----|
|id     |アプリケーションのID(App ID)|
|name   |アプリケーション名|
|version|アプリケーションのバージョン|
|publisher|アプリケーション配布者（開発者）名|
|url    |会社や個人のURLを設定します|
|description|アプリケーションの説明|
|copyright|著作権表示 |
|icon   |アプリケーションアイコンのパスを指定します。|
|persistent-wifi|(iPhoneのみ)WIFI接続を必須とするか(true/false)。デフォルトはfalse。|
|prerendered-icon|(iPhoneのみ)すでに光沢加工済みのアイコンを使用しているか(true/false)。。デフォルトはfalse。|
|statusBarStyle|最上段のステータスバーの表示形式を指定します。選択はgrey (デフォルト), opaque\_black , translucent\_blackの3種類。|
|statusbar-hidden|ステータスバーを非表示にする場合trueを指定する。|
|analytics|分析機能を有効にする場合trueとします。|
|guid   |自動生成されるguidです。基本的に手をつけません。|

## manifest ##
このファイルはTitanium Developer上で設定されたプロジェクトの情報を保存し、パッケージング時に用いるファイルのため、基本的に変更することはありません。

```
#appname: Test100
#publisher: donayama
#url: http://twitter.com/donayama/
#image: appicon.png
#appid: jp.hsj.test100
#desc: undefined
#type: mobile
#guid: 1bef9b04-0362-4bfb-a68a-1a3635d5734a
```

## アプリケーション名について ##

プロジェクト作成時にも触れましたが、英数字以外のマルチバイト文字（漢字・ひらがな・カナ・記号）を使用することができません。

生成後にtiapp.xmlで変更しても同様にエラーとなりますので、今後のバージョンアップでの対応を望む以外にありません。



---

原著作者表示：[Appcelerator, Inc](http://www.appcelerator.com/)