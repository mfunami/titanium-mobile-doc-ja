# APIカタログ(メディア編) - 音声再生・録音 #

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

var stream = Titanium.Media.createAudioPlayer({
    url: 'http://202.6.74.107:8060/triplej.mp3'
});
stream.addEventListener('progress', function(e) {
    progressLabel.text = 'Time Played: ' + Math.round(e.progress) + ' seconds';
});
stream.start();
```

## 録音(作業中) ##
```
var recording = Ti.Media.createAudioRecorder();
var file = null;

// default compression is Ti.Media.AUDIO_FORMAT_LINEAR_PCM
// default format is Ti.Media.AUDIO_FILEFORMAT_CAF
recording.compression = Ti.Media.AUDIO_FORMAT_ULAW;
recording.format = Ti.Media.AUDIO_FILEFORMAT_WAVE;

// 5秒間の録音
recording.start();
Ti.Media.startMicrophoneMonitor();
setTimeout(function(e){
    file = recording.stop();
    Ti.Media.stopMicrophoneMonitor();
    
    var sound = Titanium.Media.createSound({sound:file});
    sound.addEventListener('complete', function()	{
        sound = null;
    });
    sound.play();
}, 5000);
```

### 音声ファイルのフォーマット ###
  * AUDIO\_FILEFORMAT\_3GP2
  * AUDIO\_FILEFORMAT\_3GPP
  * AUDIO\_FILEFORMAT\_AIFF
  * AUDIO\_FILEFORMAT\_AMR
  * AUDIO\_FILEFORMAT\_CAF
  * AUDIO\_FILEFORMAT\_MP3
  * AUDIO\_FILEFORMAT\_MP4
  * AUDIO\_FILEFORMAT\_MP4A
  * AUDIO\_FILEFORMAT\_WAVE

### 圧縮形式 ###
  * AUDIO\_FORMAT\_AAC
  * AUDIO\_FORMAT\_ALAW
  * AUDIO\_FORMAT\_APPLE\_LOSSLESS
  * AUDIO\_FORMAT\_ILBC
  * AUDIO\_FORMAT\_IMA4
  * AUDIO\_FORMAT\_LINEAR\_PCM
  * AUDIO\_FORMAT\_ULAW

### ボリューム・録音レベルに関するプロパティ ###

  * Ti.Media.volume
  * Ti.Media.peakMicrophonePower
  * Ti.Media.averageMicrophonePower

### ToDo ###

  * Titanium.App.idleTimerDisabled

## 関連するKitchenSinkソース ##
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/sound_local.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/sound_file.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/sound_file_url.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/sound_remote_url.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/sound_remote.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/sound_record.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/sound_session_mode.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/sound_bg.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/music.js

## 関連するAPIドキュメント ##
  * http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.Media-module


---

原著作者表示：[Appcelerator, Inc](http://www.appcelerator.com/)