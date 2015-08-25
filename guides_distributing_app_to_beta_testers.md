# βテスタへのアプリケーション配布 #
(原文) https://github.com/appcelerator/titanium_documentation/blob/master/source/en/ios.md

## iOS(iPhone/iPad)の場合 ##
Titanium Mobile 1.3以降では、Titanium Mobileから生成されたXcodeプロジェクト（`build/iphone`に配置されている）を用いて「iOSの正規の手順」でAd-Hoc配布を行う事ができますが、「iOSの正規の手順」ではなくTitanium Developerによるアプリケーション配布手順をこちらでは説明します。

### Provisioning Profile ###
テストアプリケーションを提供するデバイスIDを含む開発用Provisioning Profileを作成します。

### バイナリの圧縮 ###
アプリケーションのビルド結果`build/iphone/build`のフォルダをzip圧縮します。

![http://img.skitch.com/20100526-8idhej948myb6jnn3mc88krahj.png](http://img.skitch.com/20100526-8idhej948myb6jnn3mc88krahj.png)

### zipファイルと`.mobileprovision`ファイルの送付 ###
βテスタに対して、アプリケーションのzipファイルと生成したprovisioning profileをメールなどで送付します。

#### Macユーザの場合 ####
βテスタはまず `.mobileprovision` ファイルをiTunesアイコンにドラッグ＆ドロップし、インストールします。つづいて、同様にiTunesにzipファイルを展開したアプリケーションファイル `.app` をドラッグ＆ドロップします。その後、デバイスと同期をすることにより実機にインストールされます。

#### Windowsユーザの場合 ####
iPhone構成ユーティリティ ( http://support.apple.com/kb/DL926?viewlocale=ja_JP ) をインストールしたのち、zipファイルから展開した`.app`フォルダと`.mobileprovision`ファイルを同時に選択した状態でドラッグ＆ドロップすると、実機に直接インストールされます。

## TODO ##
https://github.com/appcelerator/titanium_documentation/blob/master/source/en/android.md の訳出


---

原著作者表示：[Appcelerator, Inc](http://www.appcelerator.com/)