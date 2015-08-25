# Titanium Mobile開発中の最新版ビルドについて #

（参照）https://github.com/appcelerator/titanium_documentation/blob/master/source/en/continuous_builds.md

Titaniumのオープンソースレポジトリから自動的にビルドされた最新版(Continuous Builds)の使用方法について説明します。

リリース版ではないため、不安定であったり予期しない動きをする事がありますが、AppceleratorではContinuous Buildsで発生した問題については一切サポートしません。

ただ、最新版を触れたかったり、リリース版を待たずにバグフィックスを得たりすることを目的とするのならば、これが一番よい方法となります。（あるいはリリース版がバグを抱えているケース（Mobile SDK 1.4.1のように :-P）も）

## 入手方法 ##

http://build.appcelerator.net/ にアクセスし取得してください。

![http://img.skitch.com/20101106-b6uba4fdnw17cn12ppcnr45d6p.jpg](http://img.skitch.com/20101106-b6uba4fdnw17cn12ppcnr45d6p.jpg)

masterとそれ以外のブランチがある場合、任意のブランチを選択する必要があります。

上記の例ではmasterブランチが(1.5.x系)の開発ラインとなっているため、1.4.x系となるブランチを選択しています。選択変更すると自動的に対象となるビルド一覧が挿しかわります。

そして、基本的にビルドナンバーの新しいものでご使用のプラットフォームのファイルをダウンロードします。（iOS系の場合はOSXの一択になります）

## インストール ##
ダウンロードしたZIPファイルから展開したものを以下の場所にコピー先の基準となります。（Titanium Developerやデバイスのエミュレータを終了させてから実行してください）

|**OSX**|`/Library/Application Support/Titanium` もしくは `~/Library/Application Support/Titanium`|
|:------|:------------------------------------------------------------------------------------|
|**Linux**|`~/.titanium`                                                                        |
|**Windows**|`C:\\ProgramData\\Titanium` (Vista, 7) `C:\\Documents and Settings\\All Users\\Application Data\\Titanium` (XP)|

上記のフォルダの配下にバージョン番号が振られたフォルダを上書き、もしくは追加します。

上記例でmobile sdk 1.4.2をインストールする場合では、`/Users/username/Library/Application Support/Titanium/mobilesdk/osx/`がなければまずこれを作成し、さらにここに`1.4.2`フォルダがなければ作成します。

すでにフォルダがある場合、その中身をすべて上書きしてください。

コピー完了後、Titanium Developerを（再度）起動し、プロジェクトのEditタブにて導入したSDKのバージョンが表示されているかどうか確認してください。


---

原著作者表示：[Appcelerator, Inc http://www.appcelerator.com/]