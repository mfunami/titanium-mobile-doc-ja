# Titanium Mobile 0.9で注目に値するAPIについて #
元記事は[The Hitchhikers Guide to porting applications to Titanium 1.0](http://www.codestrong.com/timobile/changelog/0_9/)の「Notable new APIs」になります。

## 動画撮影／再生 ##
  * カスタムオーバーレイに対応
  * 動画再生時に次のイベントを追加： complete, error, preload, load, resize

## カメラ（静止画）撮影 ##
  * カスタムオーバーレイに対応
  * API追加：Ti.Media.takePicture, Ti.Media.hideCamera
  * 撮影後にカメラUIを自動的に閉じることを設定できる autohide プロパティを追加した
  * The showControls property can control whether or not the system provided chrome is shown
  * オーバーレイ表示を制御する overlay プロパティを追加した
  * KichenSinkでの実装例
    * カスタムオーバーレイ(examples/camera\_overlay.js)
    * AR(examples/camera\_ar.js)

ちなみにカメラ撮影時のコールバック関数の引数の数や中身が変わってるので0.8からの移植時には注意が必要です。

## 音声再生・録音 ##
  * 再生時のURL指定にリモートURLが指定できるようになった
  * You can now play sound from a Ti.Filesystem.getFile file blob
  * 音声再生時に次のイベントを追加： complete, interrupted, resume, error
  * KichenSinkでの実装例
    * ストリーミング再生(Ti.Media.createAudioPlayer) (examples/sound\_remote.js)
    * 録音(Ti.Media.createAudioRecorder) (examples/sound\_record.js)
  * 音声検知APIの追加
    * Ti.Media.startMicrophoneMonitor
    * Ti.Media.stopMicrophoneMonito
    * Ti.Media.peakMicrophonePower
    * Ti.Media.averageMicrophonePower

## ネットワーク ##
  * コンテンツのエンコーディング追加対応：shift-jis, windows-1250, windows-1251, windows-1253, windows-1254, x-euc
  * KichenSinkでの実装例
    * ondatastreamイベントによるファイルダウンロード進捗表示(examples/xhr\_filedownload.js)
    * onsendstreamイベントによるファイルアップロード進捗表示(examples/xhr\_fileupload.js)

## GPS/コンパス ##
  * パフォーマンスを大幅に改善した。
  * (iPhone専用) 設定「位置情報サービス」オフにしている場合、GPS機能を有効にするかどうか訊ねるダイアログを表示するようになった。
  * 方向（コンパス）・場所の変化に追従する新しいイベントリスナを追加した。
  * プロパティの追加
    * デバイス全体で位置情報サービスを有効にしているかを取得する Ti.Geolocation.locationServicesEnabled
    * 精密さを設定 Ti.Geolocation.accuracy
    * 移動イベントの発生させる「しきい値」設定 Ti.Geolocation.distanceFilter
    * 方向変化イベントの発生させる「しきい値」設定 Ti.Geolocation.headingFilter
    * 磁場干渉があった際にメッセージを表示するかどうか設定する Ti.Geolocation.showCalibation
  * メソッドの追加
    * 磁場干渉メッセージを抑制する Ti.Geolocation.dismissHeadingCalibrationDisplay
  * イベントの追加
    * 磁場干渉発生時 "calibration" イベントが発生する

## 地図表示 ##
  * 地図上の注釈を動的に変化できるようにした。 （KichenSinkでの実装例 examples/map\_view.js）
  * イベントの追加： loading, complete, error, click

## デバイスプラットフォーム ##
  * バッテリ状態に関するイベントとプロパティが追加された。[→APIガイドの記事へ](guides_device_battery.md)
    * バッテリ容量・充電状態の変化を通知するイベント
    * Ti.Platform.batteryState ... バッテリ状態を取得するプロパティ
    * Ti.Platform.batteryLevel ... バッテリ容量を取得するプロパティ

## UI ##
  * マスターUIView(メインウィンドウ)に背景色・背景画像を設定するメソッドを追加(Ti.UI.setBackgroundImage, Ti.UI.setBackgroundColor)
  * アニメーション用オブジェクト(2DMatrix, 3DMatrix)を生成するファクトリメソッドを追加(Ti.UI.create2DMatrix, Ti.UI.create3DMatrix)
  * アニメーション処理オブジェクトのファクトリメソッドを追加(Ti.UI.createAnimation)
  * デバイス方向制御関連
    * Ti.UI.setOrientation メソッドによるデバイス方向強制設定ができるようになった。
    * 横向きかを判断するプロパティ Ti.UI.isLandscape
    * 縦向きかを判断するプロパティ Ti.UI.isPortrait
    * 向き（上下も含めて）を取得するプロパティ Ti.UI.orientation
  * （重要）Composite views は不要になったのでAPIから削除されました。

## iPhone UI ##
  * プロパティの追加
    * Ti.UI.iPhone.statusBarHidden ... ステータスバーの表示切替(true/false)
    * Ti.UI.iPhone.statusBarStyle  ... ステータスバーの表示方法
    * Ti.UI.iPhone.appSupportsShakeToEdit ... 編集時のシェイクジェスチャ処理を利用するか否か

## Scroll View ##
スクロールする領域の制御が可能になりました。

（従来のページ制御などをする機能はTi.UI.createScollableViewで置き換えることになります）

詳細はKitchenSinkの examples/scroll\_views.js を確認してください。

## Web Views ##
WebViewはこれまでのCompositeViewなどとの兼ね合いのない純粋にHTMLを表示するためのものになりました。イベントとログ出力以外のTitanium APIは使えなくなりました。
これによりPDFを表示したり、タッチイベントを検知したりすることができるようになりますが、プログラミングモデルは変更する必要があります。

イベントについては Titanium.App.fireEvent と Titanium.App.addEventListener により、webviewでの送受信が可能になります。
またログについてはTitanium.API.loglevelなメソッド類を使うことができます。


## Image Views ##
ビュー内で画像のアニメーションをサポートした。

## Table Views & Group Views ##
  * GroupdViewはTableViewにAPI統合されました。
  * ヘッダ・フッタにコントロール配置するカスタム表示が可能になった。

## UI View ##
すべてのUIViewには以下の共通APIが搭載されることになりました。

### 共通プロパティ ###
CSSと同じような指定になります。

|borderColor|枠線色|
|:----------|:--|
|borderRadius|枠線の角丸径|
|borderWidth|枠の太さ|
|backgroundImage|背景画像|
|backgroundColor|背景色（デフォルトは透過 ＝ transparent)|
|center     |ビューの中心(as x,y)|
|opacity    |透明度(0.0～1.0)|
|visible    |表示非表示 (boolean, デフォルト：true)|
|anchorPoint|回転時の基準点（デフォルト：0.5,0.5（中央））|
|transform  |the view's transformation matrix|
|zIndex     |the view's zIndex relative to sibling views|

### 共通メソッド ###
|animate|viewをアニメーション表示する|
|:------|:---------------|
|addEventListener|イベントリスナを登録する    |
|removeEventListener|イベントリスナを削除する    |

### 共通イベント ###
|swipe|スワイプジェスチャ(右向きか左向きかも含めて検知)|
|:----|:------------------------|
|click|クリックジェスチャ                |
|dblclick|ダブルクリックジェスチャ             |
|singletap|一本指でのタップジェスチャ            |
|doubletap|一本指でのダブルタップジェスチャ         |
|twofingertap|二本指でのタップジェスチャ            |
|touchstart|タッチ開始                    |
|touchmove|タッチして指を移動                |
|touchend|タッチ終了                    |
|touchcancel|タッチ中止                    |