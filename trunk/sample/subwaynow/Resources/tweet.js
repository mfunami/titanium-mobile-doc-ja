$(function(){
    var forUploadImage        = null;
    var forUploadImageDetails = null;

    var btnClear = Titanium.UI.createButton({
	systemButton: Titanium.UI.iPhone.SystemButton.TRASH,
	title : 'clear'
    });
    var btnCamera = Titanium.UI.createButton({
	systemButton: Titanium.UI.iPhone.SystemButton.CAMERA,
	title       : 'camera'
    });
    var btnCount = Titanium.UI.createButton({
	title:'140?',
	style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
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

    btnClear.addEventListener('click', function(){
	taText.setValue('');
	forUploadImage = null;
	forUploadImageDetails = null;
    });

    btnCamera.addEventListener('click', function(){
	var dialogTitle = '';
	var dialogOptions = ['写真を撮る', '既存の項目を選択', 'キャンセル'];
	if(forUploadImage != null){
	    dialogTitle = 'すでに選択されています。上書きしない場合はキャンセルしてください。';
	}

	var dialog = Titanium.UI.createOptionDialog();
	dialog.setTitle(dialogTitle);
	dialog.setOptions(dialogOptions);
	dialog.setCancel(2);
	dialog.addEventListener('click', function(event){
	    if(event.index == 0){
		// カメラ撮影
		Titanium.Media.showCamera({
		    success:function(image, details){
			forUploadImage        = image;
			forUploadImageDetails = details;
		    },
		    cancel:function(){
		    },
		    error:function(error){
		    }
		});
	    }
	    else if(event.index == 1){
		// カメラロールから取得
		Titanium.Media.openPhotoGallery({
		    success: function(image, details) {
			forUploadImage        = image;
			forUploadImageDetails = details;
			taText.focus();
		    },
		    error: function(error) {
		    },
		    cancel: function() {
		    }
		});
	    }
	});
	// ダイアログを表示します。
	dialog.show();
    });
    
    var taText = Titanium.UI.createTextArea({
	id:'text', 
	value: ' #subwayjp',
	height:150,
	width:320,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE,
	keyboardToolbar:[btnClear,flexSpace,btnCamera,fixSpace,btnCount,fixSpace,btnTweet],
	keyboardToolbarColor: '#060',	
	keyboardToolbarHeight: 40
    });
    taText.addEventListener('return',function(e){
    });
    taText.addEventListener('change',function(e){
	if(e.value.length > 140){
	    $('#text').css('background-color', 'red');
	}else{
	    $('#text').css('background-color', 'white');
	}
    });
    Titanium.UI.currentWindow.addEventListener('focused',function(evt){
	//
    });
    btnCount.addEventListener('click', function(){
	var l   = taText.value.length;
	var msg = "" + l + '文字なう。(残り' + (140 - l) + '文字)';
	var d   = Titanium.UI.createAlertDialog({
	    title     : msg
	});
	d.show();
    });
    btnTweet.addEventListener('click', function(){
	var username = Titanium.App.Properties.getString("tw_username");
	var password = Titanium.App.Properties.getString("tw_password");
	var httpexec = function(url, method, param, loadEventHandler, errorEventHandler){
	    var xhr = Titanium.Network.createHTTPClient();
	    if(loadEventHandler != null){
		xhr.onload = function(){
		    loadEventHandler(this.responseText, this.status);
		};
	    }
	    if(errorEventHandler != null){
		xhr.onerror = function(){
		    errorEventHandler(this.responseText, this.status);
		};
	    }
	    xhr.open(method, url);
	    xhr.send(param);
	};

	var tweet = function(){
	    var url = "https://" + username + ":" + password + "@twitter.com/statuses/update.json";
	    httpexec(url, 'POST', "status=" + Titanium.Network.encodeURIComponent(taText.value), function(data, status){
		taText.setValue('');
	    });
	};
	if(forUploadImage == null){
	    tweet();
	}else{
	    var urlTP = 'https://twitpic.com/api/upload';
	    var param = {
		media: forUploadImage,
		username: username,
		password: password
	    };
	    httpexec(urlTP, 'POST', param, function(data, status){
		var xml = new DOMParser().parseFromString(data, "text/xml");
		var value = xml.getElementsByTagName("mediaurl")[0].textContent;
		taText.setValue(taText.value + " " + value);
		tweet();
	    });
	}
    });
});