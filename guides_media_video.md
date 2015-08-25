# APIカタログ(メディア編) - 動画再生・録画 #

## 動画再生 ##
```
var video = Titanium.Media.createVideoPlayer({
    movieControlMode:Titanium.Media.VIDEO_CONTROL_DEFAULT,
    scalingMode:Titanium.Media.VIDEO_SCALING_ASPECT_FILL,
    //contentURL:movieFile.nativePath
    media:movieFile // note you can use either contentURL to nativePath or the file object
});
video.play();
```

### 再生時のアスペクト比の指定 ###
| **VIDEO\_SCALING\_ASPECT\_FILL** |constant for video aspect where the movie will be scaled until the movie fills the entire screen. Content at the edges of the larger of the two dimensions is clipped so that the other dimension fits the screen exactly. The aspect ratio of the movie is preserved.|
|:---------------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **VIDEO\_SCALING\_ASPECT\_FIT**  |constant for video aspect fit where the movie will be scaled until one dimension fits on the screen exactly. In the other dimension, the region between the edge of the movie and the edge of the screen is filled with a black bar. The aspect ratio of the movie is preserved.|
| **VIDEO\_SCALING\_MODE\_FILL**   |constant for video aspect where the movie will be scaled until both dimensions fit the screen exactly. The aspect ratio of the movie is not preserved.                                                                                                                |
| **VIDEO\_SCALING\_NONE**         |constant for video scaling where the scaling is turn off. The movie will not be scaled.                                                                                                                                                                               |

## 動画ストリーミング再生 ##
```
var video = Titanium.Media.createVideoPlayer({
    // リモート再生も可能です
    // 	contentURL:'http://movies.apple.com/media/us/ipad/2010/tours/apple-ipad-video-us-20100127_r848-9cie.mov'
    contentURL : "movie.mp4"
});
video.addEventListener("complete", function() {
    video.removeEventListener('complete', listenerId);
    var dialog = Titanium.UI.createAlertDialog({
        'title' : '再生終了',
        'message' : 'video completed',
        'buttonNames' : [ 'OK' ]
    });
    dialog.show();
});
video.play();
```

## 録画 ##
静止画撮影同様にTitanium.Media.showCameraを用いますが、引数で `mediaTypes: Titanium.Media.MEDIA_TYPE_VIDEO`と指定する点が異なります。
```
Titanium.Media.showCamera({
    success: function(event){
        var video = event.media;
        movieFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'mymovie.mov');
        movieFile.write(video);
    },
    cancel:function(){
    },
    error:function(error){
        // create alert
        var a = Titanium.UI.createAlertDialog({title:'Video'});

        // set message
        if (error.code == Titanium.Media.NO_VIDEO){
            a.setMessage('Device does not have video recording capabilities');
        }
        else{
            a.setMessage('Unexpected error: ' + error.code);
        }
        a.show();
    },
    mediaTypes: Titanium.Media.MEDIA_TYPE_VIDEO,
    videoMaximumDuration:10000,
    videoQuality:Titanium.Media.QUALITY_HIGH
});
```

録画した内容をフォトギャラリーから取得する場合は次のようになります。
```
Titanium.Media.showCamera({
    success:function(event){
        var video = event.media;
        Titanium.Media.saveToPhotoGallery(video);
        
        Titanium.UI.createAlertDialog({title:'Photo Gallery',message:'Check your photo gallery'}).show();		
    
    },
    cancel:function(){
    },
    error:function(error){
        // create alert
        var a = Titanium.UI.createAlertDialog({title:'Video'});

        // set message
        if (error.code == Titanium.Media.NO_VIDEO){
            a.setMessage('Device does not have video recording capabilities');
        }
        else{
            a.setMessage('Unexpected error: ' + error.code);
        }

        // show alert
            a.show();
    },
    mediaTypes: Titanium.Media.MEDIA_TYPE_VIDEO,
    videoMaximumDuration:10000,
    videoQuality:Titanium.Media.QUALITY_HIGH
});
```

### 録画品質 ###
| **QUALITY\_HIGH** |media type constant to use high-quality video recording. Recorded files are suitable for on-device playback and for wired transfer to the Desktop using Image Capture; they are likely to be too large for transfer using Wi-Fi.|
|:------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **QUALITY\_LOW**  |media type constant to use use low-quality video recording. Recorded files can usually be transferred over the cellular network.                                                                                                |
| **QUALITY\_MEDIUM** |media type constant to use medium-quality video recording. Recorded files can usually be transferred using Wi-Fi. This is the default video quality setting.                                                                    |

## 関連するKitchenSinkソース ##

  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/movie_local.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/movie_embed.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/movie_remote.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/movie_remote2.js

## 関連するAPIドキュメント ##
  * http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.Media-module


---

原著作者表示：[Appcelerator, Inc](http://www.appcelerator.com/)