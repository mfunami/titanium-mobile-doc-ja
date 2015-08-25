# APIカタログ(メディア編) - カメラのカスタムオーバーレイ・AR #
カメラ撮影時のファインダー表示として指定したViewの内容を重ね合わせるカスタムオーバーレイ機能があります。

指定方法はいたって簡単で、Titanium.Media.showCameraの引数にoverlayプロパティを追加し、そこに各種Viewやコントロールを配置したViewを設定するだけです。

透明なViewを重ね合わせる形になるので、背景色の設定などをしないと見づらいという点を気をつける以外はさほど難しくないと思います。

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100327/20100327105012.jpg](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100327/20100327105012.jpg)

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

## AR(仮想現実) ##
カスタムオーバーレイとGPS＋コンパス機能を応用する事によりARっぽいことを実現できます。
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

## 関連するAPIドキュメント ##
  * https://developer.appcelerator.com/apidoc/mobile/latest/Titanium.Media


---

原著作者表示：[Appcelerator, Inc](http://www.appcelerator.com/)