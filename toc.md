# 目次 #

## Appcelerator Titanium MobileではじめるJavaScriptによるiPhone/Androidアプリケーション開発 ##

> ※日々更新していっていますが、2010年3月14日版のこのパートのまとめを[PDF](http://titanium-mobile-doc-ja.googlecode.com/files/20100314.pdf)化しています。

> ※内容が古いままになっている箇所があります。ご注意ください。

### はじめに ###

  * [Titanium Mobileについて](about_titanium_mobile.md)

### 1st Step : はじめの一歩 ###

  * [Titanium MobileでiPhoneアプリ開発を始めよう!!](get_started.md)（単体でも成立するよう「はじめに」と「UIカタログ」と内容が一部重複しています）

### 2nd Step : UIカタログ ###

  * [ユーザインタフェイス概説](guides_ui_iphone_abstruct.md)
  * Window編
    * [Window](Window.md)
      * [StatusBar](StatusBar.md)
      * [NavBar](NavBar.md)
      * [ToolBar](ToolBar.md)
    * [TabGroup](TabGroup.md)
    * [ダイアログ](guides_ui_dialog.md)
    * [NavigationGroup](guides_ui_navigation_group.md) (iPhoneのみ)
  * View編
    * [View(共通)](Views.md)
    * [WebView](WebView.md)
    * [ImageView](ImageView.md)
    * [CoverFlowView](CoverFlowView.md)
    * [MapView](MapView.md)
    * [TableView](TableView.md)
    * [ScrollView](ScrollView.md)
    * [ScrollableView](ScrollableView.md)
    * [DashboardView](DashboardView.md)
    * [VirticalLayout](guides_ui_verticallayout.md)
    * [HorizontalLayout](guides_ui_horizontallayout.md)
    * [SplitWindow](SplitWindow.md) (iPadのみ)
    * [Popover](Popover.md) (iPadのみ)
  * Control編
    * [Label](Label.md)
    * [Button](Button.md)
      * [システムボタンアイコンの使い方](howto_button_icon.md)
      * [ボタン形状の指定](howto_button_style.md)
    * [TextField](TextField.md)
    * [TextArea](TextArea.md)
    * [Switch](Switch.md)
    * [Slider](Slider.md)
    * [Picker](Picker.md)
    * [ButtonBar](ButtonBar.md) (iPhoneのみ)
    * [TabbedBar](TabbedBar.md) (iPhoneのみ)
    * [SearchBar](SearchBar.md)
    * [ActivityIndicator](ActivityIndicator.md)
    * [ProgressBar](ProgressBar.md)
  * [共通プロパティ](guides_ui_properties.md)
  * [アニメーション](guides_ui_animation.md)

### 3rd Step : APIカタログ ###
  * Titanium Mobile APIの全体像を俯瞰する
  * アプリケーション編
    * アプリケーションイベント [KS](https://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/app_events.js)
    * [アプリケーションプロパティ](guides_app_properties.md)
    * [カスタムイベント](guides_app_custom_event.md)
    * [アプリケーションバッジ](guides_platform_appbadge.md)
  * ネットワーク編
    * [ネットワークの状態](guides_device_network.md)
    * [HTTPClientによる通信](guides_network_httpclient.md)
    * (追記予定) [TCPSocketによる通信](guides_network_tcpsocket.md)
    * (追記予定) 外部サービスMashUp API
      * Twitter
      * Forsquare
      * FaceBook
      * Yahoo(YQL)
    * (追記予定) BonjourBrowser / BonjourService [KS](http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/bonjour.js)
  * I/O編
    * [ファイルシステム](guides_filesystem.md)
    * [データベース](guides_database.md)
    * (追記予定) 連絡先データベース(Contacts)
  * メディア編
    * [カメラ撮影・フォトギャラリーからの取得/保存・スクリーンショット・カスタムオーバーレイ](guides_media_camera.md)
    * [動画再生・録画](guides_media_video.md)
    * [音声(音楽)再生・録音](guides_media_audio.md)
  * デバイスハードウェア編
    * [電源状態](guides_device_battery.md)
    * [振動（バイブレーション）](guides_device_vibration.md)
    * [加速度センサ・デバイス回転](guides_device_accelerometer.md)
    * [位置測定・電子コンパス](guides_device_geolocation.md)
  * プラットフォーム編
    * [環境情報取得](guides_platform_information.md)
    * [他アプリケーション連携(OpenURL)](guides_platform_openurl.md)
    * [クリップボード制御](guides_platform_clipboard.md)
    * iOS
      * Background Service
      * Local Notification
      * (追記予定) PushNotifications [KS](http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/push_notification.js)
  * ユーティリティ編
    * [ログ出力](guides_app_log.md)
    * [タイマー処理](guides_embeded_timer.md)
    * [ライブラリ取込](guides_embeded_include.md)
    * [XML DOM Parser](guides_xml_dom.md)
    * [文字列処理　編集(Format)・変換(BASE64, MD5)・ローカライズ](guides_util_string.md)

### 4th Step : アプリケーション詳細設定と公開・配布 ###
  * (追記予定) [アプリケーションフォルダ構造と詳細設定](app_structure.md)
    * [tiapp.xml, manifestファイルについて](tiapp_xml.md)
    * [起動時画像(スプラッシュスクリーン)の変更方法](howto_change_splashscreen.md)
  * (追記予定) Xcodeでのビルド
  * (追記予定) 実デバイスでの動作検証
  * [βテスタへのアプリケーション配布](guides_distributing_app_to_beta_testers.md)
  * (追記予定) AppStoreでの公開

### 5th Step : コードリーディング ###
  * [AppStoreに登録されているアプリケーション"Snapost"のコードを読む](codereading_snapost.md)
  * (追記予定) KitchenSinkのTableView関連サンプルを読み解く

### Appendix ###
  * (追記予定) コラム：実践！Xib2Jsを用いた高速モックアップ作成
  * (追記予定) Objective-CによるTitanium Mobile独自モジュール開発
    * http://developer.appcelerator.com/doc/mobile/iphone/module_sdk の和訳ベース
  * (追記予定) Android向けアプリケーション開発の「はじめの一歩」
  * (追記予定) Android Marketへの公開手順