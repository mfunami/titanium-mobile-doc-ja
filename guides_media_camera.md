# APIカタログ(メディア編) - カメラ撮影・フォトギャラリーからの取得・スクリーンショット #

※ここではカメラロールのことをフォトギャラリーと総称しています。

## 写真データの取得・操作 ##

カメラでの撮影、フォトギャラリーからのデータ取得はいずれも非同期に行われるため、コールバック関数によって取得するかたちになります。そこで引き渡される画像・サムネイルのデータ、補助情報を利用し、プレビューしたりアップロードしたりします。

ちなみに allowEditing プロパティをtrueと指定した場合は拡大や移動をするための画面を一段挟み、その結果がsuccuessプロパティで呼び出される関数に引き渡されます。

### カメラ撮影 ###
```
btnCamera.addEventListener('click', function(){

Titanium.Media.showCamera({
    // JSON形式の引数です
    success:function(event){
        // cropRectにはx,y,height,widthといったデータがはいる。
        var cropRect = event.cropRect;
        var image    = event.media;

        // 撮影されたデータが写真ならばImageViewとしてWindowに貼り付ける
        if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO){
            var imageView = Ti.UI.createImageView({
                width:win.width,
                height:win.height,
                image:event.media
            });
            win.add(imageView);  
        }
    },
    cancel:function(){
        // ...
    },
    error:function(error){
        // errorとしてカメラがデバイスにないようなケース(iPod touchなどがそうでしょうか)では
        // error.code が Titanium.Media.NO_CAMERA として返ります。
    },
    // 撮影データのフォトギャラリーへの保存
    saveToPhotoGallery:true,
    // 撮影直後に拡大縮小移動をするか否かのフラグ
    allowEditing:true,
    // 撮影可能なメディア種別を配列で指定
    mediaTypes:[Ti.Media.MEDIA_TYPE_VIDEO,Ti.Media.MEDIA_TYPE_PHOTO],

    });
});

```

撮影成功時に本体フォトギャラリーに画像を保存するだけの場合は、showCameraの引数として saveToPhotoGalleryを trueとして設定するだけです。

ファイルへの書き出しをする場合、succuess内で次のように出力処理を記述します。
```
// アプリケーションデータディレクトリに camera_photo.png として出力する。
var f = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'camera_photo.png');
f.write(event.image);

// 現在のウィンドウ背景画像としてそのまま使う場合は次のようにする
Titanium.UI.currentWindow.backgroundImage = f.nativePath;
```

### フォトギャラリー側から写真選択 ###
撮影済みのデータから処理対象を選択する場合、次のように記述します。

結果がevent.mediaとして返ってくるので、それをアップロードしたりする感じになります。

```
Titanium.Media.openPhotoGallery({
    success: function(event) {
        // カメラロールで写真を選択した時の挙動(カメラと同様)
    },
    error: function(error) {
        // notify(e.message);
    },
    cancel: function() {
        // キャンセル時の挙動
    },
    // 選択直後に拡大縮小移動をするか否かのフラグ
    allowEditing: true
    // 選択可能なメディア種別を配列で指定
    mediaTypes:[Ti.Media.MEDIA_TYPE_VIDEO,Ti.Media.MEDIA_TYPE_PHOTO],
});
```

また、iPad向けに引数としてpopoverView, arrowDirectionがあります。


### スクリーンショットの取得 ###
使いどころが難しいのですが、デバイス画面をカメラ同様に取得することができます。

```
Titanium.Media.takeScreenshot(function(event){
    var image = event.media;
    var imageView = Ti.UI.createImageView({image:event.media});
    Ti.UI.currentWindow.add(imageView);
});
```

## カメラのカスタムオーバーレイ ##
カメラ撮影時の標準ファインダー表示とは別に指定したViewの内容を重ね合わせるカスタムオーバーレイと呼ばれる機能があります。

指定方法はいたって簡単で、Titanium.Media.showCameraの引数にoverlayプロパティを追加し、そこに各種Viewやコントロールを配置したViewを設定するだけです。

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100327/20100327105012.jpg](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100327/20100327105012.jpg)

透明なViewを重ね合わせる形になるので、背景色の設定などをしないと見づらいという点を気をつける以外はさほど難しくないと思います。

```
var win = Titanium.UI.currentWindow;

//-------------------------------------------------------------------
// オーバーレイViewを構成する部品を宣言します
//-------------------------------------------------------------------
var scanner = Titanium.UI.createView({
	width:260,
	height:200,
	borderColor:'red',
	borderWidth:5,
	borderRadius:15
});

var button = Titanium.UI.createButton({
	color:'#fff',
	backgroundImage:'../images/BUTT_grn_on.png',
	backgroundSelectedImage:'../images/BUTT_grn_off.png',
	backgroundDisabledImage: '../images/BUTT_gry_on.png',
	bottom:10,
	width:301,
	height:57,
	font:{fontSize:20,fontWeight:'bold',fontFamily:'Helvetica Neue'},
	title:'Take Picture'
});

var messageView = Titanium.UI.createView({
	height:30,
	width:250,
	visible:false
});

var indView = Titanium.UI.createView({
	height:30,
	width:250,
	backgroundColor:'#000',
	borderRadius:10,
	opacity:0.7
});
messageView.add(indView);

// message
var message = Titanium.UI.createLabel({
	text:'Picture Taken',
	color:'#fff',
	font:{fontSize:20,fontWeight:'bold',fontFamily:'Helvetica Neue'},
	width:'auto',
	height:'auto'
});
messageView.add(message);

//-------------------------------------------------------------------
// 上記で宣言したコントロール・Viewを
// オーバーレイ用Viewに追加します
//-------------------------------------------------------------------
var overlayView = Titanium.UI.createView();
overlayView.add(scanner);
overlayView.add(button);
overlayView.add(messageView);

// ボタンクリック時のイベント
button.addEventListener('click',function(){
	scanner.borderColor = 'blue';
	Ti.Media.takePicture();
	messageView.animate({visible:true});
	setTimeout(function(){
		scanner.borderColor = 'red';
		messageView.animate({visible:false});
	},500);
});


Titanium.Media.showCamera({
	success:function(event){
		Ti.API.debug("写真撮影された");
		
		// 撮影された写真をImageViewに反映し、現在のWindowに表示する。
		var imageView = Ti.UI.createImageView({image:event.media});
		win.add(imageView);
		
		// 表示中のカメラファインダーを隠す（プログラム的に）
		Ti.Media.hideCamera();
	},
	cancel:function(){
	},
	error:function(error){
		// エラー発生時のアラート表示
		var a = Titanium.UI.createAlertDialog({title:'Camera'});
		if (error.code == Titanium.Media.NO_CAMERA){
			a.setMessage('Please run this test on device');
		}
		else{
			a.setMessage('Unexpected error: ' + error.code);
		}
		a.show();
	},
	// カスタムオーバーレイViewを指定する
	overlay: overlayView,
	// 標準のカメラ撮影用コントロールを表示しない
	showControls: false,
	// カメラ撮影モード
	mediaTypes: Ti.Media.MEDIA_TYPE_PHOTO,
	// 撮影後に自動的にファインダーを閉じない
	autohide: false
});
```

応用として、GPS＋電子コンパス機能と組み合わせることによりARっぽいことを実現できます。
```
// オーバーレイ用のViewをあらかじめ用意しているとする

// GPS関連のイベントリスナ
Titanium.Geolocation.addEventListener('location',function(e){
	var longitude = e.coords.longitude;
	var latitude = e.coords.latitude;
	gps = Math.round(longitude)+' x '+Math.round(latitude);
});

Titanium.Geolocation.addEventListener('heading',function(e){
	if (e.error){
		updatedHeading.text = 'error: ' + e.error;
		return;
	}
	heading = e.heading.magneticHeading;
});

Titanium.Media.showCamera({
	// 撮影をしないので何も記述しない
	success:function(event){
	},
	cancel:function(){
	},
	error:function(error){
		var a = Titanium.UI.createAlertDialog({title:'Camera'});
		if (error.code == Titanium.Media.NO_CAMERA){
			a.setMessage('Please run this test on device');
		}
		else{
			a.setMessage('Unexpected error: ' + error.code);
		}
		a.show();
	},
	overlay: overlayView,
	showControls: false,
	mediaTypes: Ti.Media.MEDIA_TYPE_PHOTO,
	autohide:false
});
```


## 関連するKitchenSinkソース ##
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/photo_gallery.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/camera_basic.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/camera_overlay.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/camera_overlay_webview.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/camera_ar.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/camera_gallery.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/camera_file.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/camera_video.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/screenshot.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/photo_gallery_file.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/photo_gallery_xhr.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/photo_gallery_bgimage.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/photo_gallery_camera.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/photo_gallery_video.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/record_video.js

## 関連するAPIドキュメント ##
  * http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.Media-module
  * http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.Media.openPhotoGallery-method.html
  * http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.Media.saveToPhotoGallery-method.html
  * http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.Media.showCamera-method.html
  * http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.Media.takePicture-method.html
  * http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.Media.takeScreenshot-method.html


---

原著作者表示：[Appcelerator, Inc](http://www.appcelerator.com/)