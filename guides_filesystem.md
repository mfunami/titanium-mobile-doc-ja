# APIカタログ(I/O編) - ファイルシステム #
ファイルシステムの操作には今のところプロパティ取得と内容の読取りしかないので、次のような一覧表でのご紹介に留めさせていただきます。

## パス関連情報の取得 ##

| **API** | **内容** | **実行例** |
|:--------|:-------|:--------|
| **Titanium.Filesystem.resourcesDirectory** |Resources Directory|/Users/username/Library/Application Support/iPhone Simulator/User/Applications/94646704-B9B9-432F-A8CE-640A89A6B55C/KitchenSink.app|
| **Titanium.Filesystem.tempDirectory** |Temp Directory|/var/folders/fy/fyJLG5EWEcSF52GCubOqmU+++TI/-Tmp-/|
| **Titanium.Filesystem.applicationDirectory** |Application Directory|/Users/username/Library/Application Support/iPhone Simulator/User/Applications/94646704-B9B9-432F-A8CE-640A89A6B55C/Applications|
| **Titanium.Filesystem.applicationDataDirectory** |Application Data Directory|/Users/username/Library/Application Support/iPhone Simulator/User/Applications/94646704-B9B9-432F-A8CE-640A89A6B55C/Documents|
| **Titanium.Filesystem.isExteralStoragePresent** |External Storage Available |false    |
| **Titanium.Filesystem.externalStorageDirectory** |External Storage Directory|...(Androidのみ)|
| **Titanium.Filesystem.separator** |Path Separator |/        |
| **Titanium.Filesystem.lineEnding** |Line Ending |         |


## ファイル情報の取得 ##
次の処理で取得されたファイルオブジェクトのプロパティとして取得します。
```
var file = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, 'text.txt');
var contents = file.read();
```
| **API** | **内容** | **実行例** |
|:--------|:-------|:--------|
| **file** |file    |/Users/username/Library/Application Support/iPhone Simulator/User/Applications/94646704-B9B9-432F-A8CE-640A89A6B55C/KitchenSink.app/text.txt|
| **contents** |contents blob object|[TiBlob](object.md)|
| **contents.text** |contents|Hello World. this is a filesystem read test.|
| **contents.mimeType** |mime type|text/plain|
| **file.nativePath** |nativePath|/Users/username/Library/Application Support/iPhone Simulator/User/Applications/94646704-B9B9-432F-A8CE-640A89A6B55C/KitchenSink.app/text.txt|
| **file.exists()** |exists  |true     |
| **file.size** |size    |44       |
| **file.readonly** |readonly|true     |
| **file.symbolicLink** |symbolicLink|false    |
| **file.executable** |executable|false    |
| **file.hidden** |hidden  |false    |
| **file.writable** |writable|false    |
| **file.name** |name    |text.txt |
| **file.extension()** |extension|txt      |
| **file.resolve()** |resolve |/Users/username/Library/Application Support/iPhone Simulator/User/Applications/94646704-B9B9-432F-A8CE-640A89A6B55C/KitchenSink.app/text.txt|

## ディレクトリ情報の取得 ##
ファイル同様、ディレクトリオブジェクトからのプロパティ取得となります。
```
var dir = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory);

```
| **API** | **内容** | **実行例** |
|:--------|:-------|:--------|
| **dir.getDirectoryListing()** |directoryListing|cricket.wav,Default.png,default\_app\_logo.png,dependencies.map,Entitlements.plist,images,Info.plist,KitchenSink,MainWindow.nib,modules,movie.mp4,PkgInfo,pop.caf,Settings.bundle,testdb.db,text.txt|
| **dir.getParent()** |getParent|/Users/username/Library/Application Support/iPhone Simulator/User/Applications/94646704-B9B9-432F-A8CE-640A89A6B55C|
| **dir.spaceAvailable()** |spaceAvailable|true     |

## ディレクトリ・ファイルの操作 ##
作成はいずれもTitaniu,FileSystem.getFile(...)により、ファイルハンドラを取得して、作成／書き出しを行うかたちとなります。
```
// ディレクトリの作成
var newDir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'mydir');
newDir.createDirectory();

// ファイルの作成
var newFile = Titanium.Filesystem.getFile(newDir.nativePath,'newfile.txt');
newFile.write("...");
Ti.API.info('directoryListing for newDir = ' + newDir.getDirectoryListing());
Ti.API.info("newfile.txt created: " + String(new Date(newFile.createTimestamp())));
Ti.API.info("newfile.txt modified: " + String(new Date(newFile.modificationTimestamp())));	

// ファイルの削除
newFile.deleteFile();

// フォルダの削除
newDir.deleteDirectory();
```


// ディレクトリの作成
var newDir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'mydir');
newDir.createDirectory();

// ファイルの作成
var newFile = Titanium.Filesystem.getFile(newDir.nativePath,'newfile.txt');
newFile.write("...");
Ti.API.info('directoryListing for newDir = ' + newDir.getDirectoryListing());
Ti.API.info("newfile.txt created: " + String(new Date(newFile.createTimestamp())));
Ti.API.info("newfile.txt modified: " + String(new Date(newFile.modificationTimestamp())));	

// ファイルの削除
newFile.deleteFile();

// フォルダの削除
newDir.deleteDirectory();
}}}

== 関連するKitchenSinkソース ==

 * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/filesystem.js

== 関連するAPIドキュメント ==
 * http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.Filesystem-module
 * http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.Filesystem.File-object

----
原著作者表示：[http://www.appcelerator.com/ Appcelerator, Inc]```