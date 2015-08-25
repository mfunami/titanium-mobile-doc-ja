# Appcelerator Titanium MobileでiPhoneアプリ開発を始めよう!! #

---

**注意**
本稿の記述内容を実際に試すにはMac OSX 10.6以上が動作する端末、iOS SDK 3.2/4.1以上が必要になります。

Windowsでは開発できませんのでご注意ください。

また（本稿ではそこまで触れませんが）実機での動作検証・App Storeへのアプリケーションの登録配布には[iPhone Developer Program](http://developer.apple.com/jp/iphone/program/)への参加(有償)が必要となります。

なお、Appcelerator Titanium Mobileは本文中でも触れている通りAndroid向けの開発も可能ですが、iPhone SDK向けの開発にフォーカスして記述されていますので、その点ご容赦ください。

---

**目次**


## Appcelerator Titanium Mobileについて ##
Appcelerator Titanium Mobile(以下、Titanium Mobile)とは[Appcelerator社](http://www.appcelerator.com/)が提供するモバイルデバイス向けのソフトウェア開発環境です。

(ちなみにTitaniumは「チタニウム」ではなく「タイタニウム」と発音するようです)


プログラミング言語としては基本的にJavaScriptのみを利用します。

それだけでiOS SDK/Android SDK向けのネイティブアプリケーションを開発できることがウリとなっています。

Objective-CやJavaでコーディングする必要は一切ありません。


もちろんJavaScriptだからといってWebインタフェイスのみをサポートしているわけではありません。

以下に挙げる全ての機能を実現できるようになっています。

  * ラベル・テキスト入力・ボタン・スライダーなどの豊富なネイティブUI部品
  * 地図表示
  * 画像・音声・動画の再生・撮影・録画
  * ファイルシステム
  * ネットワーク通信（XMLHttpRequestだけではなくSocket通信やBonjourにも対応）
  * ハードウェアデバイス(カメラ・GPS・電子コンパス・加速度センサ)の利用
  * デバイス内データベース(連絡先など)の操作
  * SQLiteデータベースのI/O

プラットフォームに依存した機能を利用しない限り、基本的にサポートされるプラットフォーム全てに対してにコードを転用できると謳われていますので、JavaScriptによる開発効率の向上だけではなくマルチプラットフォーム展開を少ないコストで実現できることも魅力のひとつとなっています。


現時点で対応しているプラットフォームとしては前掲したiOS(iPhone, iPad)とAndroidのみになりますが、今後も追加されていく予定があります。

また本稿では取り上げませんが、兄弟製品として[Titanium Desktop](http://www.appcelerator.com/products/titanium-desktop-application-development/)があり、こちらはWindows, Mac OSX, Linuxというマルチプラットフォームで動作するデスクトップアプリケーションを開発できる環境も提供されています。

これについては http://d.hatena.ne.jp/yuichi_katahira/searchdiary?word=*[Titanium]の記事群が詳しいですので、興味があればぜひご覧ください

![http://www.appcelerator.com/wp-content/uploads/2009/12/PROD_arch11.png](http://www.appcelerator.com/wp-content/uploads/2009/12/PROD_arch11.png)

### 価格体系 ###

気になる価格体系ですが、大きく二つのラインナップに分かれています。

  * Titanium Community
  * Titanium Professional

大部分の機能は無料で提供されており、有償サービスはプレミアムサービスという位置づけです。

プレミアムサービスとして提供されているのは下図の右側のチェックにある項目です。

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100317/20100317233426.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100317/20100317233426.png)

β版SDKの利用や最新デバイス(BlackBerryなど)のβプレビューへの参加、開発＆サポートチームによる迅速かつ綿密なサポート体制、アプリケーション分析ログの保存期間の長さなどが挙げられます。

費用も開発者単位に毎月199USDという金額なので十分にTitaniumプラットフォームに慣れて、さらにそのプレミアムサービスが必要と判断して契約するとよいでしょう。

詳細はAppceleratorのサイト内の下記のアドレスをご参照下さい。

http://pages.appcelerator.com/Plans_Pricing.html

## 前提環境(iPhone SDK) ##
Titanium Mobile自体はTitanium DeveloperというDesktop, Mobileでそれぞれ共用する開発環境を利用します。TItanium Developerの動作するプラットフォームとして、Windows, Mac OSX, Linuxをサポートしています。

しかし本稿で取り上げるiPhoneアプリケーションの開発に関してはiOS SDKが必要になります。
そのため必然的に動作する環境としては Mac OSXのみとなってしまいます。

その点、ご注意ください。

### iPhone SDKのインストールについて ###
Titanium Mobileでの開発を始める前に、前述の通り前もって iOS SDK のインストールを行っておく必要があります。

SDKのセットアップから開発環境構築については下記記事をご参照ください。
|目指せ！iPhoneアプリ開発エキスパート | gihyo.jp|http://gihyo.jp/dev/serial/01/iphone/0002|
|:-------------------------------|:----------------------------------------|

また、本稿では取り上げませんが、実機での動作検証（ならびにAppStoreでの配布）を行うためにはiPhone Developer Programへの登録が必要となります。

それについては次の記事をご参照ください。
|目指せ！iPhoneアプリ開発エキスパート | gihyo.jp|http://gihyo.jp/dev/serial/01/iphone/0009|
|:-------------------------------|:----------------------------------------|

### エディタの準備 ###
TitaniumはIDEではありません。

むしろビルド・パッケージング専用環境のプログラムであるため、ソースプログラムの修正すらすることができません。なんらかのテキストエディタを準備してください。

Appceleratorの中の人たちは[TextMate](http://macromates.com/)などを使ってるようですが日本語入力に難があるので、手になじんだエディタを用意しましょう。（もちろんTextMateでもOKです）

できればJavaScriptの文法ハイライト機能や入力支援があるソフトの方が開発効率もグンとあがると思います。ちなみに筆者はCarbon Emacs + JS2-mode + αで開発をしています。

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100221/20100221210219.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100221/20100221210219.png)

## Titanium Developerのインストールと起動 ##
[こちらのページ](http://www.appcelerator.com/products/download/)を開くと自動的にインストーライメージファイル(Titanium Developer.dmg)をダウンロード開始しますので、完了後インストールしてください。

ちなみにアプリケーションが「Titanium Developer」となっていますが、これはDesktop・Mobileで共用されるツールであるため、このように名づけられています。

### 起動画面 ###
インストール後にTitanium Developer起動すると、次のような画面が表示されます。

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100226/20100226224833.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100226/20100226224833.png)


Titaniumを使うに当たって、この画面でアカウントを作る必要があります。

ログインIDとなるメールアドレスとパスワード、姓名といった個人情報を登録しないとTitanium Developer環境が利用できませんので必ず登録してください。（twitter idをいれておくと勝手に公式アカウントがフォローしてくれます）

ここで登録したアカウントでAppceleratorのサポートページなどへのログインにも利用します。

アカウント作成が完了すると、Titanium Developerの新規プロジェクト作成画面を開きます。

ここから、新規プロジェクトを作成したり、既存のプロジェクトをインポートできます。

アプリケーション終了／(Titanium Developer上での)ログアウト後はログインタブに切り替え、登録したメールアドレスとパスワードを入力して、立ち上げる流れになります。

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100226/20100226224834.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100226/20100226224834.png)

ダウンロードしたファイルのリリース以降に新しいTitanium SDKがリリースされていると、起動後しばらくしてから右上のTitaniumアイコンの部分にその旨が表示されます。クリックすると、ダウンロード・インストールが自動的にされますので、一度ご確認ください。

## Kitchen Sinkを触ってみる ～ iPhoneシミュレータの起動 ##
インストールしたら早速「Hello, world的なプログラムを始めましょう！」……と言いたいところですが、まずは開発元のAppceleratorから提供されているデモアプリケーション「KitchenSink」を利用して、アプリケーションのビルドから動作確認（iPhoneシミュレータ上で、ですが）の流れを体験したいと思います。

KitchenSinkはTitanium MobileのUI部品、APIのカテゴリ単位に機能を個別に紹介した機能カタログにあたるデモアプリケーションです。

実際にTitanium Mobileでの開発を進めていく中で「KitchenSinkのこれと同じようなことをやりたい」ということになると思います。その際、APIリファレンスをひも解くよりも、KitchenSinkの該当部分のソースをコードスニペット（サンプル）として利用するほうが手っ取り早かったりします。

逆に言うと、KitchenSinkの動きをよく見て「Titanium Mobileで "何が" "どこまで" できるのか」を知っておく必要があります。

### Kitchen Sinkをダウンロードする ###
KitchenSinkだけではなく、Appceleratorの製品はオープンソースソフトウェアとして開発がされており、ソースコードは[githubのレポジトリ](http://github.com/appcelerator)で公開されています。

KitchenSinkも同様にgithubで公開されています。

http://github.com/appcelerator/KitchenSink

取得だけをする場合 gitクライアントは不要です。

まず上記リンクにアクセスし、githubの右上「Download Source」を選択します。

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100313/20100313132448.jpg](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100313/20100313132448.jpg)

続いて表示される画面でzipアイコンか、tarアイコンのいずれかを選択し、ダウンロードします。完了後、展開してください。

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100313/20100313132447.jpg](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100313/20100313132447.jpg)

### Kitchen Sinkを動かす ###
展開したKitchenSinkのアーカイブから最新のプロジェクトをTitanium Developerに取り込みます。

Titanium Developerのツールバー「Import Project」を選択して、先ほど展開した先の `/1.0.x/KitchenSink` フォルダを選択後「OK」ボタンをクリックすると、KitchenSinkプロジェクトがPROJECTS一覧に追加され、プロジェクト設定の編集画面が表示されます。

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100309/20100309230651.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100309/20100309230651.png)

続いて、画面上部右の「Test & Package」を選択すると、タブで構成された処理選択が表示されます。

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100309/20100309232347.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100309/20100309232347.png)

「Run Emulator」タブの下方に並ぶプラットフォームから「iPhone」を選択します。

画面中央を陣取る黒い部分は実行時のログ表示部になります。ログレベルによって、表示内容の範囲が代わります（情報であったりエラーメッセージであったり）。

画面下部には使用するSDKのバージョンやログレベルを選択するコンボボックスとシミュレータの起動と終了をするためのボタンが付いています。

「Launch 」（ウィンドウ下部左側のボタン）をクリックすると、ビルドが開始されます。
マシンスペックなどにも依存しますが、初回時（とTitanium Developerの立ち上げ直後）は比較的ビルド時間がかかる傾向があるようです。

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100309/20100309231133.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100309/20100309231133.png)

表示内容を見ていただけば、内部でXcodeのコンパイラを呼び出しておりiPhoneネイティブのバイナリに変換しているということが分かっていただけのではないでしょうか。

ビルド完了後、自動的にiPhoneシミュレータが起動し、更にビルドされたアプリケーションも自動起動します。

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100226/20100226233327.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100226/20100226233327.png)
![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100226/20100226233639.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100226/20100226233639.png)

あれこれ言うより実際にシミュレータ上のデモを見て、どのようなことがTitanium Mobileで実現できるかを体感してください。

(残念ながらデバイスハードウェア系（カメラ・加速度センサ・GPS・電子コンパスなど）を中心にiPhoneシミュレータでの動作がサポートされていない機能は使用できません。実機に転送する必要がありますが、本稿では触れません)

## テストプロジェクトの作成からプロジェクト作成後のフォルダ構成 ##
一通りのKitchenSinkの体験をしたら、次は実際にプログラムしていきましょう。

### プロジェクトの作成 ###
まずはプロジェクトの新規作成をします。

Titanium Developerのツールバーから「New Project」をクリックすると、New Project画面が立ち上がるので、必ずProject typeをデフォルトの「Desktop」から「Mobile」にするようにしてください。
（Mobileに切り替えた後、iPhone SDKとAndroid SDKの検出を行うため、切替え直後、画面の下部のInstalled Mobile Platformsは緑チェックマークではありません）

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100309/20100309231630.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100309/20100309231630.png)

ここでは次のように入れてみましょう。
| **項目** | **設定値** | **補足** |
|:-------|:--------|:-------|
|Project type|Mobile   |モバイルデバイス向けの際は必ずMobileを選択してください。|
|Name    |GetStarted|アプリケーションの名前です。残念ながら日本語文字を入れると現バージョンではビルド時にエラーになります。長すぎる名前をつけるとホーム画面で「…」で省略されるので注意しましょう（英数字11桁まで）。Androidではハイフン"-"を入れると具合が悪くなるらしいので気をつけましょう。また、一度命名した後の変更は困難（というか無理？）ですので、ご注意あれ。|
|App Id  |com.yourdomain.applicationname|アプリケーションを一意に判別するためのIDです。Javaの名前空間のようにドメイン名を反転させた名前の付け方をすることが推奨されています。（例：com.twitter.your\_id.testapp）|
|Directory|/Users/your\_account|ソースの生成先フォルダ。このフォルダに上記Nameで指定した名前のフォルダが作られます|
|Company / Personal URL|http://www.yourdomain.com/|Publisher URLという項目に反映されます|
|Titanium SDK version|1.4.2    |特段の問題がない限り、デフォルトになっている最新バージョンを使います|

そして「Create Project」ボタンをクリックすると、ひな形に基づいたフォルダ・ファイル群が Directory/Name なフォルダに自動生成され、画面もプロジェクト編集画面に遷移します。

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100309/20100309230651.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100309/20100309230651.png)

このプロジェクト編集画面の上部にあるパス名(終端は省略されることもありますが)をクリックすると、Finderが起動し、該当フォルダを開いてくれます。

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100226/20100226224839.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100226/20100226224839.png)

### プロジェクトのフォルダ構成 ###
フォルダには以下のようなファイルが生成されています。
  * CHANGELOG.txt
  * LICENSE
  * LICENSE.txt
  * README
  * manifest
  * tiapp.xml
  * /Resources
    * KS\_nav\_ui.png
    * KS\_nav\_views.png
    * app.js
    * /android
    * /iphone
      * Default.png
      * appicon.png
  * /build
    * (以下略)

それぞれについて代表的なものをかなり簡単に説明します。
|manifest|パッケージングする際に用いるアプリケーション定義が記述されています。（基本的に変更しません）|
|:-------|:---------------------------------------------|
|tiapp.xml|アプリケーション定義が記述されています。パッケージング・実行時に用いられます。       |
|/build  |ビルド結果を格納するフォルダ。直接触る事はあまりないはずです。               |
|/Resources|実際のアプリケーション開発をするソースなどはここに格納します。               |
|/Resources/app.js|アプリケーションのエントリポイントとなるスクリプトファイルです。              |
|/Resources/android|Android向けに依存したソース・リソースを格納します。                 |
|/Resources/iphone|iPhone向けに依存したソース・リソースを格納します。                  |

最初のふたつはアプリケーション定義に関するファイルです。

一部の例外を除き、プロジェクト編集画面で設定できる内容なので、本稿では触れません。


最後のふたつに付いてはビルド時に一時的にiPhone用は/Resourcesに/Resources/iphoneをマージされた（Androidも同様）状態とすることで、機種依存機能を吸収できるようになっています。（上記状態ではiPhone用のスプラッシュスクリーン画像とアプリケーションアイコンが収納されています）

### ちなみに実行すると... ###
次のようなシンプルな画面が立ち上がります。

すでにKitchenSinkの動きを見てるので拍子抜けするぐらいシンプルですね。

タブのボタンを押すと画面が切り替わることも含めて確認してください。

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100226/20100226224846.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100226/20100226224846.png)

## app.jsからすべてはじまる ##
Titanium MobileのアプリケーションはすべてResources/app.jsから起動されます。

### app.jsを見る ###
実際に生成されたソースコードを見てみましょう。(ムダな空行を間引いています)
```
// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

// create base UI tab and root window
var win1 = Titanium.UI.createWindow({  
    title:'Tab 1',
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window:win1
});
var label1 = Titanium.UI.createLabel({
    color:'#999',
    text:'I am Window 1',
    font:{fontSize:20,fontFamily:'Helvetica Neue'}
});
win1.add(label1);

// create controls tab and root window
var win2 = Titanium.UI.createWindow({  
    title:'Tab 2',
    backgroundColor:'#fff'
});
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Tab 2',
    window:win2
});
var label2 = Titanium.UI.createLabel({
    color:'#999',
    text:'I am Window 2',
    font:{fontSize:20,fontFamily:'Helvetica Neue'}
});
win2.add(label2);

//  add tabs
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  

// open tab group
tabGroup.open();
```

やっていることは次のような流れです。

  * ベースの背景色を黒(#000)にする
  * TabGroupを生成し、
    * そこに格納するためのTab(タブのアイコンやタイトルも指定している)とWindowを生成する
      * WindowにはLabelを配置する
      * TabにWindowを格納し
    * TabGroupにTabを格納し、
  * TabGroupを表示する

この結果、次のような親子関係になっています。

  * app.js (MasterUIView)
    * tabGroup
      * tab1
        * win1
          * label1
      * tab2
        * win2
          * label2

### app.jsからWindow単位のスクリプト分離 ###
このように画面生成・ロジック記述（そしてここには含まれませんがイベント処理）も含めてすべてJavaScriptで記述するというシンプルな思想によってTitanium Mobileアプリケーションは開発していくことになります。

とはいえ、このままアプリケーション規模が増えると際限なくapp.jsが膨らんでいきます。スコープ管理も大変で可読性も悪くなります。

そこで別のJavaScriptファイルを切り出してみましょう。


まず現状のtab1関連を再度抜き出してみます。
```
var win1 = Titanium.UI.createWindow({  
    title:'Tab 1',
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window:win1
});
var label1 = Titanium.UI.createLabel({
    color:'#999',
    text:'I am Window 1',
    font:{fontSize:20,fontFamily:'Helvetica Neue'}
});
win1.add(label1);
```

現在Labelがひとつだからいいですが、複数のUI部品が混ざってくると可読性は一気に悪くなります。

そのため、上記ソースを次のように変えます。

```
var win1 = Titanium.UI.createWindow({  
    title:'Tab 1',
    backgroundColor:'#fff',
    url: 'win1.js'
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window:win1
});
```
変わったのはcreateWindowの引数にurlプロパティが追加されている部分、label1の定義とwin1への追加部分が削除されている部分です。

これによりwin1の表示時にwin1.jsという外部スクリプトファイルをロードし、それを実行するという流れになります。


Resorces フォルダに呼び出される側のwin1.jsを作成します。

```
// /Resources/win1.js
var label1 = Titanium.UI.createLabel({
    color:'#999',
    text:'I am Window 1',
    font:{fontSize:20,fontFamily:'Helvetica Neue'}
});
Titanium.UI.currentWindow.add(label1);
```
win1.jsで新しく登場したのがTitanium.UI.currentWindowというプロパティです。

win1.jsを評価している最中の currentWindow とはすなわち app.js における win1 なので、ここには win1 のオブジェクトがセットされます。

そのため最終的な結果は同じようになります。

(実際には生成処理の評価タイミングが違うために表示の待ち時間が発生するようになる)


このようにwindow単位でjsファイルを分割していくと、処理と画面をコンパクトに記述でき、また管理もしやすくなります。

### 部品配置とイベントリスナへの登録 ###
もう少し win1.js に画面部品を追加してしていこうと思います。

```
// よく使うのでこのように再定義しておくと便利です。
var win    = Titanium.UI.currentWindow;

// 一段Viewを間に挟むようにします。
var view   = Ti.UI.createView();

// label1に表示位置の指定を追加します。
var label1 = Titanium.UI.createLabel({
    color:'#999',
    text:'I am Window 1',
    font:{fontSize:20,fontFamily:'Helvetica Neue'},
    height: 32,
    width: 200,
    top:80
});

// button1を生成します。
var button1 = Ti.UI.createButton({
    title: 'touch me',
    height: 32,
    width: 120,
    top: 120
});

// win←viewに部品を追加します
view.add(label1);
view.add(button1);
win.add(view);

// ボタンクリック時のイベント
button1.addEventListener('click', function(){
    Titanium.UI.createAlertDialog({
        title:   'タイトル',
        message: 'クリックされました'
    }).show();
});
```

ボタンを一つ追加し、そのクリックイベントを定義してみました。

部品の位置の指定方法はCSSでの指定に準拠しています。

幅(width)や高さ(height)を指定しないと、コンテナ領域の全体に設定されることもあるので、コントロールの大きさや位置は可能な限り明示的に指定するべきです。

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227085107.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227085107.png)

またイベントリスナの登録については（一部の例外をのぞき）次のように記述されます。
```
object.addEventListener('EVENT_NAME', function(event){
    // コールバック無名関数
});
```

まずはwin2側もjsファイル化してみて、同じようにボタンをいくつか配置してみて慣れてみましょう。

## Tinitanium MobileでサポートされているUI部品の紹介 ##
基本的にiPhone SDKのUIKitでサポートされているものがベースとなります。

そこから離れた描画などは現時点ではあまり得意ではなさそうですが、今後OpenGLへの対応がモジュール的にされそうではあります。

ともあれ、どのようなものがサポートされているかを駆け足になりますがご紹介していこうと思います。

### BaseUI - Windowを構成するTabGroup, Tab, StatusBar, NavBar, ToolBar ###
TabGroupとは次の画像で画面下部の黒背景でアイコンが並んでいる部分を総称します。

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100313/20100313205053.jpg](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100313/20100313205053.jpg)

TabGroupには複数のTabを所属させる事ができます。

Tab自体はTabGroup上のアイコンとして表現され、その実態はそれぞれのTabが保有するWindowになるという入れ子構造になっています。

上の例ではTabGroupに5つのTabがあり、そのうち一番左に位置する"Base UI"というタイトルの付いているTabが選択されており、TabGroupの上方に表示されているのは"Base UI" Tabが保有するWindowであるという状態になります。

また、一番上の電波状態や時刻などが表示されている部分がStatusbarといいます。Statusbar自体にプログラム的な制御はほとんどできません。可能なのは3種類の表示色のいずれかを選択するか、表示・非表示の制御だけです。

その他、画面の上下にボタンなどが並んでいるエリアがNavBarとToolBarです。NavBarにはLeftButton、Title、RightButtonの三つのエリアがあり、それぞれ部品を配置できます。Buttonと称していますがButtonでなくても別に構いません。


ちなみにapp.jsでTabGroupを宣言せず、いきなりWindowを生成し表示する事も可能です。
その場合は画面上にTabGroupはもちろん表示されずにWindowのみが表示されるようになります。

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190652.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190652.png)
```
//app.js
var win1 = Titanium.UI.createWindow({  
    title:'Tab 1',
    backgroundColor:'#fff'
});
var label1 = Titanium.UI.createLabel({
    color:'#999',
    text:'I am Window 1',
    font:{fontSize:20,fontFamily:'Helvetica Neue'}
});
win1.add(label1);
win1.open();
```

### BaseUI - Dialog ###
対話式のボタン選択画面としてTitanium Mobileでは２種類のDialogを持っています。

Alert Dialogはこのような表示であり、

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190653.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190653.png)

Options Dialogはこのような表示になります。

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190654.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190654.png)

それぞれclickイベントでボタンのindexを返すため処理の分岐を行う事ができます。

また、Email作成用の専用ダイアログ(Email Dialog)が別途用意されています。

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227194846.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227194846.png)

### BaseUI - Views ###
Viewは(原則的に)Windowの内側に配置される表示部です。

場合によってはViewを含む他のコントロールのコンテナ（親）になります。

### Views - CoverflowView ###
画像を左右にスクロールさせながら拡大表示するカバーフローもこのViewを利用すれば、画像の配列を渡すだけで簡単に実現できます。

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190655.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190655.png)

### Views - WebView ###
純粋にHTMLサイトを表示するためのViewです。
safariアプリで開けるサイト／情報はすべて表示できると考えてください。

また直接HTML文字列を引き渡す事も可能ですので、動的に生成したHTMLによる多彩な表現をすることができます。

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227195104.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227195104.png)
![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227195105.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227195105.png)

### Views - TableView ###
TableViewは出来る事が多岐にわたっているため、大変奥が深いものになっています。

左のような端的な行選択だけでなく、右のような各行に対するレイアウトデザインすることも可能です。

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190656.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190656.png)
![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190657.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190657.png)

また、「設定」画面のようなグループ表示もTableViewの一環としてサポートされていますので、作法もTableViewに則る必要があったりします。

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190658.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190658.png)
![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190659.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190659.png)

### Views - ScrollView ###
スクロール可能なViewです。スワイプやボタンによるアクションでスクロールさせることが可能になります。

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190700.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190700.png)

### Views - ImageView ###
画像表示が可能なViewです。画像のアニメーションもさせることができます。

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190701.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190701.png)

### Views - MapView ###
地図表示が可能なViewです。単体では下の例のようなツールバーはついていません。

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227195106.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227195106.png)

### Controls - Label ###
文字を表示するコントロールです。

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190703.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190703.png)

### Controls - Button / SystemButtons ###
ボタンを表示するコントロールです。文字表示だけではなくアイコンの併記や画像をボタン化することも可能です。

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190704.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190704.png)
![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190707.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190707.png)

一部の規定のアイコンを使用する場合はSystemBottons列挙体で宣言されている定数を利用する形になります。（右の例ではNavbarやToolbarに使用されている画像がそれにあたります）

### Controls - TextField, TextArea ###
TextFieldはテキスト入力（1行）をするためのコントロールです。多岐にわたる初期設定により随分表情の変わるコントロールだと言えるでしょう。

一方、TextAreaは複数行のテキスト入力を行うためのコントロールです。

TextFieldに比べると若干設定可能な内容は減ります。

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190705.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190705.png)
![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190706.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190706.png)

### Controls - Switch ###
ON/OFFの切り替えのみを行うコントロールです。主に設定画面で使う形に限定されるでしょう。

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190712.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190712.png)

### Controls - TabbedBar (iPhone依存) ###
こちらはON/OFFに限らない状態を切り替えるコントロールです。

他のOSやWebアプリケーションにおけるラジオボタンと同等の位置づけと考えればよいでしょう。

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190713.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190713.png)

### Controls - ButtonBar (iPhone依存) ###
見た目はTabbedBarにそっくりですが、こちらは状態を持ちません。

ボタンの集合として利用します。NavbarやToolbarとの相性がよいと思われます。

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190714.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190714.png)

### Controls - ToolBar (iPhone依存) ###
Windowの直下にあるToolbarとは別に局所的な機能としてのToolbarになります。

キーボードツールバーはTextField/TextAreaでサポートされているので、いまいち使いどころが難しいかもしれませんが。

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190715.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190715.png)

### Controls - Slider ###
数値をアナログに指定するコントロール。ボリュームや数量などの値を指定するのに利用されます。

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190717.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190717.png)

### Controls - Picker ###
コンボボックスに相当する複数の候補から項目をドラム式に選択させるコントロールです。

項目が多すぎると正直使い勝手が悪いので、そういうときはTableViewなどで外に出せないか考慮する必要があるかもしれません。

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190718.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190718.png)

### Controls - SearchBar ###
検索用のツールバーです。大体TableViewなどとセットで登場するかたちになります。

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190719.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190719.png)

### Controls - ActivityIndicator ###
現在なんらかの処理中であることを示すアイコンとメッセージを表示するコントロールです。

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190720.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190720.png)

### Controls - ProgressBar ###
進捗表示を行うコントロールです。

進捗を返すイベントリスナとセットで利用することになるでしょう。

たとえば、ダウンロードやアップロードの状態を返すイベントなどが対象になります。

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190721.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100227/20100227190721.png)

## 次の一歩は? ##
「あのコントロールはどうやって配置するのか？」とか「もっと生成時の引数に指定がいろいろできるんじゃないのか」といった疑問が出てくると思います。

そんなときは初めに触ったKitchenSinkの中身（ソースプログラム）をみるのが一番のお勉強になります。

まずはapp.jsを開き、そこから辿っていってもいいのですが、/Resources/examplesフォルダ内に各jsファイルがそれなりのキーワードで転がっていることが分かると思います。UI部品ならその部品名で見たり、あるいはcameraやnetworkといったキーワードベースで見る事もできますので、手近なコードサンプルとして積極的に活用しましょう。

APIリファレンスについては公式サイトが充実しています。

http://developer.appcelerator.com/apidoc/mobile/

分からない事があれば公式のオープンサポート掲示板を訪ねてみましょう。解決の糸口が見つかると思います。

http://developer.appcelerator.com/questions

また、Twitterのハッシュタグ #titanium という手もあります。本稿についてのご質問なども @donayama宛か #titaniumでつぶやいてください。