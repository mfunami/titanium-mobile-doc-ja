# ユーザインターフェイス概説 #
Titanium Mobileはイメージ的にObjective-Cへのプリプロセッサとして動きます。

オブジェクトの作成や解放、各種オブジェクトの抽象化(iPhone/Android間)したところで、実際のユーザインタフェイスの構造までは抽象化できません。

親亀となるオブジェクトコンテナ（WindowやView）を作って、その上に子亀となるオブジェクト（ViewやControl）を載せるということをする必要があるわけです。

そのためにはどういうものでUIが構成されているのかを知る必要があります。

## 部品の名前と役割 ##

それぞれの部品をなんというかというところについては次の画像を見ていただくのが一番早いと思います。

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100313/20100313205053.jpg](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100313/20100313205053.jpg)

### 画面を構成する表示領域 ###
| **Window** |すべてのUI部品やViewを格納する親オブジェクト|
|:-----------|:------------------------|
| **View**   |コンテンツ表示部の総称。いろいろな種類がある。  |
| **StatusBar** |デバイスの表示部最上方にある表示領域       |
| **NavBar** |Status Barの直下にある表示領域     |
| **ToolBar** |画面下部に配置される表示領域           |
| **TabGroup**|(図では`TabBar`)最下部に配置される特殊な表示領域。複数のWindowを切り替える操作をする機能を持つ|

表示部には次のような階層構造になってると考えれば（オブジェクトアクセス的にも）いいでしょう。

  * Application全体(tiapp.xml含む)
    * Window(s)
      * StatusBar
      * NavBar
        * Control(s)
      * View(s)
        * View(s)/Control(s)...
      * ToolBar
        * Control(s)
    * TabBar

### 代表的なView ###
| **[WebView](WebView.md)** |HTML部品を表示するためのView。NativeUIを使わずにHTML+Javascript+CSSでアプリケーションを開発する場合でもこのViewが配置されている寸法になります。|
|:--------------------------|:------------------------------------------------------------------------------------------|
| **[TableView](TableView.md)** |縦１列にデータが並んでいる形式です。Safariのブックマークなどが代表になるでしょうか。「設定」アプリケーションのような表組みもこちらにあたります。                |
| **[ImageView](ImageView.md)** |画像表示を行うためのView。CoverflowのためにはCoverFlowViewという別のものがあります。                                    |
| **[MapView](MapView.md)** |地図表示を行うためのView。「マップ」アプリケーションの地図表示部を想像すればいいかと。                                              |

### 代表的なControl ###
| **[Label](Label.md)** |ラベル。文字を表示するだけの部品。|
|:----------------------|:----------------|
| **[Button](Button.md)** |ボタン。いろんなところで出番があります。|
| **[TextField](TextField.md)** |一行入力のテキストボックス。非常にオプションが多いです。|
| **[TextArea](TextArea.md)** |複数行入力可能なテキスト入力部品。|

ViewにもControlにもその他大勢の種類があるのでUIカタログ内でどういうものがあるのかを見ていこうと思います。


---

原著作者表示：[Appcelerator, Inc](http://www.appcelerator.com/)