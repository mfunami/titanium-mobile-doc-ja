//--------------------------------------
// 共通処理読込
//--------------------------------------
// twitter関連の共通処理を取り込みます。
Titanium.include('twlib.js');

//--------------------------------------
// 変数宣言部
//--------------------------------------
var forUploadImage        = null;

//--------------------------------------
// UI定義部
//--------------------------------------
var win = Titanium.UI.currentWindow;
win.title = 'New Tweet';
var btnClear = Titanium.UI.createButton({
    systemButton: Titanium.UI.iPhone.SystemButton.TRASH,
    title : 'clear'
});
var btnCamera = Titanium.UI.createButton({
    systemButton: Titanium.UI.iPhone.SystemButton.CAMERA,
    title       : 'camera'
});
var btnTweet = Titanium.UI.createButton({
    systemButton: Titanium.UI.iPhone.SystemButton.ACTION
});
var flexSpace = Titanium.UI.createButton({
    systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});
var fixSpace = Titanium.UI.createButton({
    systemButton:Titanium.UI.iPhone.SystemButton.FIXED_SPACE,
    width:20
});
var taText = Titanium.UI.createTextArea({
    value: ' #subwayjp',
    height:160,
    width:320,
    top:0,
    bgcolor:'#fff',
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE,
    keyboardToolbar:[btnClear,flexSpace,btnCamera,fixSpace,btnTweet],
    keyboardToolbarHeight: 40,
    autocorrect: false,
    autocapitalization : Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE
});
Ti.UI.currentWindow.add(taText);
var indUpload = Titanium.UI.createProgressBar({
    width:200,
    height:50,
    min:0,
    max:1,
    value:0,
    style:Titanium.UI.iPhone.ProgressBarStyle.PLAIN,
    top:100,
    message:'Uploading Image',
    font:{fontSize:12, fontWeight:'bold'},
    color:'#666'
});
Ti.UI.currentWindow.add(indUpload);


//--------------------------------------
// 関数宣言部
//--------------------------------------
function clearEntry(closeThisWindow){
    taText.setValue('');
    forUploadImage = null;
    if(closeThisWindow){
        win.close();
    }
}

// 画像をムリクリ640x480にする(cameraからだとNGっぽい？)
function resizeImage(blobImage){
    var width = eval(blobImage.width);
    var height = eval(blobImage.height);
    if(width > 640 || height > 640){
        if(width < height){
            width  = 640 * (width / height);
            height = 640;
        }
        else{
            height = 640 * (height / width);
            width  = 640;
        }
        return blobImage.imageAsResized(width, height);
    }
    return blobImage;
}

//--------------------------------------
// イベントハンドラ定義部
//--------------------------------------

// クリアボタンのクリック時の処理
btnClear.addEventListener('click', function(){
    clearEntry(false);
});

// カメラボタンのクリック時の処理（処理選択ダイアログによる分岐）
btnCamera.addEventListener('click', function(){
    var dialog = Titanium.UI.createOptionDialog();
    if(forUploadImage != null){
	dialog.setTitle('すでに選択されています。上書きしない場合はキャンセルしてください。');
    }
    dialog.setOptions(['写真を撮る', '既存の項目を選択', 'キャンセル']);
    dialog.setCancel(2);
    // 処理選択後の分岐
    dialog.addEventListener('click', function(event){
	if(event.index == 0){
	    // カメラ撮影	
            Titanium.Media.showCamera({
		success:function(e){
                    // forUploadImage = resizeImage(e.media);
                    forUploadImage = e.media;
		},
		cancel:function(){
		    taText.focus();
		},
		error:function(error){
		    taText.focus();
		},
                allowImageEditing:false
	    });
	}
	else if(event.index == 1){
	    // カメラロールから取得
	    Titanium.Media.openPhotoGallery({
		success: function(e) {
                    forUploadImage = resizeImage(e.media);
		    taText.focus();
		},
		cancel: function() {
		    taText.focus();
		},
		error: function(error) {
		    taText.focus();
		},
                allowImageEditing:false
	    });
	}
    });
    // ダイアログを表示します。
    dialog.show();
});

// テキスト入力内容変更時のイベント
taText.addEventListener('change',function(e){
    var lc    = 140 - taText.value.length;
    win.title = 'New Tweet (' + lc + ')';
    if(lc < 0){
	taText.color = '#f00';
    }else{
	taText.color = '#000';
    }
});

// Tweetボタンクリック時のイベント
btnTweet.addEventListener('click', function(){
    // アプリケーションプロパティから読み出す
    var username = Titanium.App.Properties.getString("tw_username");
    var password = Titanium.App.Properties.getString("tw_password");

    // 画像の有無によって処理を分岐
    if(forUploadImage != null){
        // 画像のアップロード後tweetする
        twitter.uploadImage(username, password, forUploadImage, indUpload, function(xml){
	    var imageurl = xml.documentElement.getElementsByTagName("mediaurl")
                .item(0).nodeValue;
            twitter.tweet(username, password, taText.value + " " + imageurl, function(){
                clearEntry(true);
            });
        });
    }
    else{
        // 普通のtweetのみ
        twitter.tweet(username, password, taText.value, function(){
            clearEntry(true);
        });
    }
});

//--------------------------------------
// ロード時処理
//--------------------------------------
taText.focus();