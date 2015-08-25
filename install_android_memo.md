取り急ぎメモ。

# Android SDKが見つからない・シミュレータ実行できないとき #

Android SDK and ADV Managerで以下のPackageが入っているようにしてください。

![http://guides.appcelerator.com/assets/images/guides/getting_started/android-installed-packages.png](http://guides.appcelerator.com/assets/images/guides/getting_started/android-installed-packages.png)

続いて、adbコマンドのシンボリックリンクを作成します。

ターミナルもしくはコマンドプロンプトを立ち上げて以下のコマンドを入力してください。

## LinuxもしくはMac OSXの場合 ##
```
cd [SDK HOME]/tools
ln -s ../platform-tools/adb
```
## Windowsの場合 ##
```
cd [SDK HOME]\tools
mklink adb.exe ..\platform-tools\adb.exe
mklink AdbWinApi.dll ..\platform-tools\AdbWinApi.dll
```