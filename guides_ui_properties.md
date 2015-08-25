# UIカタログ(API) - 共通プロパティ #
UI部品(View系・Control系問わず)に共通するプロパティが定義されていますので、まとめてご紹介します。

一部サポートされてないものもありますが、APIリファレンスと照らし合わせてください。

## 表示色・背景色・背景画像 ##

| **プロパティ名** | **型** | **説明** |
|:-----------|:------|:-------|
|color       |string |表示色     |
|backgroundColor|string |背景色（デフォルトは透過 ＝ transparent)|
|backgroundImage|string |背景画像    |

色名指定についてはあまり種類が豊富ではないので、X11 Colors指定するよりも16進指定するほうが無難と思われます。

ちなみにサポートされているのは以下の通りです。

> "transparent", "black", "gray", "darkgray", "lightgray", "white",
> "red","green","blue","cyan","yellow","magenta","orange","purple","brown",
> "aqua", "fuchsia", "lime", "maroon", "pink", "navy", "silver", "olive", "teal"

## テキストの位置 ##
| **プロパティ名** | **型** | **説明** |
|:-----------|:------|:-------|
|textAlign   |string |left, center, rightから指定する|

## フォント ##
フォントはfontというプロパティに対してJSONオブジェクトで指定します。

| **プロパティ名** | **型** | **説明** |
|:-----------|:------|:-------|
|font.fontSize|string |フォントサイズ。サポートしている単位はpxと指定無しのみ(cm,inなどは対応していない)|
|font.fontFamily|string |フォント名   |
|font.fontWeight|string |文字の太さ(bold or normal)|
|font.fontStyle|string |文字スタイル(italic)|

## 枠線 ##
| **プロパティ名** | **型** | **説明** |
|:-----------|:------|:-------|
|borderColor |string |枠線色     |
|borderRadius|float  |枠線の角丸径  |
|borderWidth |float  |枠の太さ    |

## その他表示制御 ##
| **プロパティ名** | **型** | **説明** |
|:-----------|:------|:-------|
|opacity     |float  |透明度 (0.0～1.0)|
|visible     |boolean|表示非表示 (boolean, デフォルト：true)|
|zIndex      |int    |ビュー内の重なりの順序を指定する|