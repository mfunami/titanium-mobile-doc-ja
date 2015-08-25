# APIカタログ(メディア編) - 動画再生・音声再生 #

## 動画ストリーミング再生 ##
Titaniumではアプリケーション内動画再生ができます。使いどころが難しいような気がしないでもありませんが(^^;
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
## 音声再生 ##
ループ再生とかボリュームコントロールなどもAPIもありますが、とりあえず再生機能のサンプルをどうぞ。
```
var sound = Titanium.Media.createSound({
    // リモートURLも指定できます
    // url : "http://www.nch.com.au/acm/8kmp38.wav"
    url: '../cricket.wav'
});
sound.addEventListener('complete', function() {
    sound.removeEventListener('complete', listenerId);
    var dialog = Titanium.UI.createAlertDialog({
        'title' : 'Sound Complete',
        'message' : 'sound completed',
        'buttonNames' : [ 'OK' ]
    });
    dialog.show();
});
sound.play();
```

## 音声ストリーム再生 ##
音声のストリーミング再生の場合はstartメソッドでの実行となります。
```
// 適当な位置に進捗ラベルを表示します(^^;
var progressLabel = Titanium.UI.createLabel();
Ti.UI.currentWindow.add(progressLabel);

var stream = Titanium.Media.createSound({
    url: 'http://202.6.74.107:8060/triplej.mp3'
});
stream.addEventListener('progress', function(e) {
    progressLabel.text = 'Time Played: ' + Math.round(e.progress) + ' seconds';
});
sound.start();
```

## 関連するAPIドキュメント ##
  * https://developer.appcelerator.com/apidoc/mobile/1.0/Titanium.Media


---

原著作者表示：[Appcelerator, Inc](http://www.appcelerator.com/)