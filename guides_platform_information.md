# APIカタログ(プラットフォーム編) - 環境情報取得 #

デバイスのOSや解像度などの情報は Titanium.Platform のプロパティとして取得できます。

| **プロパティ名** | **型** | **説明** |
|:-----------|:------|:-------|
|address     |string |IPアドレス  |
|architecture|string |CPUのアーキテクチャ(ARMなど)|
|availableMemory|double |使用可能なメモリ|
|batteryLevel|float  |バッテリレベル→[詳細](guides_device_battery.md)|
|batteryMonitoring|boolean|バッテリ監視状態→[詳細](guides_device_battery.md)|
|batteryState|int    |バッテリ状態→[詳細](guides_device_battery.md)|
|displayCaps.density|string |the density property of the display device.|
|displayCaps.dpi|int    |ディスプレイのDPI|
|displayCaps.platformHeight|float  |スクリーンの高さ|
|displayCaps.platformWidth|float  |スクリーンの幅 |
|id          |string |the unique id of the device|
|locale      |string |ユーザが設定している言語|
|macaddress  |string |MACアドレス |
|model       |string |デバイスのモデル(iPhone 3Gとか3GSとか)|
|name        |string |デバイス名(iPhoneとか)|
|osname      |string |OS名(iPhoneなら"iPhone", iPadなら"iPad", Androidなら"android")|
|ostype      |string |OSのアーキテクチャ(32bitなど)|
|processorCount|int    |プロセッサ数  |
|username    |string |デバイスに設定されているユーザ名|
|version     |string |デバイスプラットフォームのバージョン(3.1.3など)|

またアプリケーションに関する情報は`Titanium.App`のプロパティとして取得できます。

| **プロパティ名** | **型** | **説明** |
|:-----------|:------|:-------|
|copyright   |string |著作権者    |
|description |string |アプリケーションの説明|
|guid        |string |GUID    |
|id          |string |アプリケーションID|
|idleTimerDisabled|boolean|property for controlling whether the phone screen will be locked on idle time. Can be set to true to disable the timer|
|name        |string |アプリケーション名|
|proximityDetection|boolean|a boolean to indicate whether proximity detection is enabled|
|proximityState|int    |the state of the device's proximity detector|
|publisher   |string |アプリケーションの発行者|
|url         |string |アプリケーションに関するURL|
|version     |string |アプリケーションのバージョン|

## 関連するKitchenSinkソース ##

  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/platform.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/properties.js


## 関連するAPIドキュメント ##
  * http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.Platform-module
  * http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.App-module


---

原著作者表示：[Appcelerator, Inc](http://www.appcelerator.com/)