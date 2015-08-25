# コードリーディング - Snapost #
Appceleratorの中の人でもあるKevin Whinnery氏がTitanium Mobileを利用し開発しており、AppStore/githubに公開(Apache Public License 2.0)しているサンプルアプリケーション「Snapost」のソースを読み解いていき、実際のアプリケーション構築のテクニックを学んで行きたいと思います。

http://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=358194125&mt=8

今回題材にするソースは以下のパスにあるものを利用します。

http://github.com/kwhinnery/Snapost/tree/master/0.9.x/Snapost/

プロジェクト直下のtiapp.xmlやmanifestについては基本的な設定しかされていませんのでここでは割愛し、Resourcesフォルダにさっそく入っていきます。

## /Resourcesフォルダの中身 ##
まず /Resources フォルダ内のファイルを見てみます。(/android, /iphoneは除外しています)

  * app.js
  * appicon.png
  * chooser.js
  * config.js
  * confirm.js
  * default\_app\_logo.png
  * header.js
  * images/
  * result.js
  * snapost\_icon512.png
  * snapost\_icon57.png
  * warp.caf
  * yay.caf

総勢でこの数ですが、内訳としては以下のとおりで至ってシンプルだったりします。

  * app.js＋５つのJavaScriptスクリプト
  * AppStore申請用画像２種(57.png, 512.png)
  * appicon.png、デフォルトのTitaniumロゴpng(ゴミファイルだと思われる)
  * 音声ファイル2種(送信時に使ったりするcafファイル)

実質の処理としては６つのソースだけを見ればいいことが分かります。

ちなみに、このアプリケーションは先ほども触れましたがAppStoreでダウンロード可能です。

実際に動かしてみて画面遷移の実際を掴んでおくほうがより理解できるでしょう（ただし、iPhoneOS 3.1.3以上必要）。

## app.jsを読む ##
アプリケーションのエントリポイントにあたるapp.jsですが、先ほども触れました通り単一Windowでの動作になるため、このスクリプトのコンテキストですべてをまかなっています。
そのためパッと見た感じ、ごちゃっとなってしまっています。

ともあれソースの全文を引用します。

### app.js ###
```
Titanium.UI.setBackgroundColor('#000');

//The image we will upload to TwitPic
var theImage = null;
var theThumbnail = null;

//Include app header
Titanium.include('header.js');

//Construct main content views
Titanium.include('chooser.js'); // Creates a 'chooser' view we manipulate in the main app
Titanium.include('config.js'); // Creates a 'config' view we manipulate in the main app
Titanium.include('result.js'); // Creates a 'result' view we manipulate in the main app
Titanium.include('confirm.js'); // Creates a 'confirm' view we manipulate in the main app

//Create view container (allows us to do nice transitions)
var viewContainer = Titanium.UI.createView({
  top:60,
  width:320,
  height:420
});

//Add main content views to container
viewContainer.add(chooser);
viewContainer.add(config);
viewContainer.add(result);
viewContainer.add(confirmation);

//modify view visibility for navigation
function showConfig() {
  viewContainer.animate({view:config,transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
  chooser.visible = false;
  config.visible = true;
  result.visible = false;
  confirmation.visible = false;
}

function showChooser() {
  viewContainer.animate({view:chooser,transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
  chooser.visible = true;
  config.visible = false;
  result.visible = false;
  confirmation.visible = false;
}

function showResult() {
  viewContainer.animate({view:result,transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
  chooser.visible = false;
  config.visible = false;
  result.visible = true;
  confirmation.visible = false;
}

function showConfirmation() {
  viewContainer.animate({view:confirmation,transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
  chooser.visible = false;
  config.visible = false;
  result.visible = false;
  confirmation.visible = true;
}

//Handle navigation events
Titanium.App.addEventListener("profileClicked", function(e) {
  if (!config.visible) {
    showConfig();
  }
  else {
    showChooser();
  }
});

//Create main app window
var app = Ti.UI.createWindow({
  backgroundImage:'images/bg.png'
});
app.add(headerView);
app.add(viewContainer);
app.open({
	transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
});

//Check if we have saved Twitter info - auto-nav to credentials page if not
var storedUsername = Titanium.App.Properties.getString("un");
if (storedUsername == null || storedUsername == '') {
  showConfig();
}
else {
  username.text = storedUsername;
}

if (!Titanium.Network.online) {
  var a = Titanium.UI.createAlertDialog({ 
    title:'Network Connection Required',
    message: 'Snapost requires an internet connection to, you know, upload stuff to the internet.  Check your network connection and try again.'
  });
	a.show();
}
```

１行目は背景色を黒に設定しています。

画面構成的に背景画像を配置するので、便宜的な設定といってもいいでしょう。

```
Titanium.UI.setBackgroundColor('#000');
```

つづいてグローバルで使われる変数の宣言をしています。

次のブロックで出てくる各スクリプトからもこの変数のアクセスは同じスコープでできるため、便利といえば便利ですが、バグの温床にもなりがち。

注意したいところです。

```
//The image we will upload to TwitPic
var theImage = null;
var theThumbnail = null;
```

そしてここがSnapostコードの一番ややこしいところでもあるのですが、app.js以外のスクリプトをすべてTi.includeで読み込んでいます。

Ti.includeはCの#includeとかと同じでソースをそのままそこに置き換えるプラグマのように動き、さらにそのタイミングで評価されます。それぞれの中身についてはあとで見ていきますが、それぞれ普通に「 var xxx = ～」といったことが宣言されており、つまりapp.jsのスコープにxxxという変数が生成されているということなのだと理解しておいてください。

```
//Include app header
Titanium.include('header.js');

//Construct main content views
Titanium.include('chooser.js'); // Creates a 'chooser' view we manipulate in the main app
Titanium.include('config.js'); // Creates a 'config' view we manipulate in the main app
Titanium.include('result.js'); // Creates a 'result' view we manipulate in the main app
Titanium.include('confirm.js'); // Creates a 'confirm' view we manipulate in the main app
```

viewContainerというviewを生成しています。

コメントには「nice transitions」するためだと書いていますが、まあその通りです。

上記のincludeにより各スクリプトで宣言されていた個々のViewをviewContainerにaddすることにより、animate演出しやすくすることを目的にしているからです。

位置としてtop:60になっているのは上記includeのheader.jsで設定されているヘッダ部の高さが60あるためで、その分をずらしてるわけです。（合計すると320x480になりますね）

```
//Create view container (allows us to do nice transitions)
var viewContainer = Titanium.UI.createView({
  top:60,
  width:320,
  height:420
});

//Add main content views to container
viewContainer.add(chooser);
viewContainer.add(config);
viewContainer.add(result);
viewContainer.add(confirmation);
```

先ほど追加したviewContainer上のviewを表示するためのfunctionを個別に設定しています。

viewContainer.animateで画面切り替えを指示し、それぞれ次のviewとTransitionアニメーションを指定しています。

その後、次のviewのみvisible = trueとし、それ以外をfalseにする処理をしています。

なんというか非常に泥臭いソースですね(^^;

```
//modify view visibility for navigation
function showConfig() {
  viewContainer.animate({view:config,transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
  chooser.visible = false;
  config.visible = true;
  result.visible = false;
  confirmation.visible = false;
}

function showChooser() {
  viewContainer.animate({view:chooser,transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
  chooser.visible = true;
  config.visible = false;
  result.visible = false;
  confirmation.visible = false;
}

function showResult() {
  viewContainer.animate({view:result,transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
  chooser.visible = false;
  config.visible = false;
  result.visible = true;
  confirmation.visible = false;
}

function showConfirmation() {
  viewContainer.animate({view:confirmation,transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
  chooser.visible = false;
  config.visible = false;
  result.visible = false;
  confirmation.visible = true;
}
```

ヘッダ部にあるprofile表記をクリックされたときのためのカスタムイベント「profileClicked」をグローバルに設定しています。

今回のSnapostのような単一スコープのアプリケーションでは旨味はあまりありませんが、複数のWindowでコンテキストが分割されるとき、グローバルファンクションとして多大な威力を発揮します。（KitchenSinkのapp.jsを見れば分かりますよ！）

```
//Handle navigation events
Titanium.App.addEventListener("profileClicked", function(e) {
  if (!config.visible) {
    showConfig();
  }
  else {
    showChooser();
  }
});
```

そしてアプリケーションの本体になるWindow "app"を生成します。背景画像はimagesフォルダの中のリソースですね。

あとはheader.jsで宣言されているheaderViewと先ほどのviewContainerをappに追加し、これまたFLIP\_FROM\_LEFTのTransitionアニメーションで表示しています。

その後、アプリケーションプロパティ"un"の設定の有無を確認し、なければ自動的にconfigViewを表示する動きになります。
あればその内容を画面に表示する...という流れです。

```
//Create main app window
var app = Ti.UI.createWindow({
  backgroundImage:'images/bg.png'
});
app.add(headerView);
app.add(viewContainer);
app.open({
	transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
});

//Check if we have saved Twitter info - auto-nav to credentials page if not
var storedUsername = Titanium.App.Properties.getString("un");
if (storedUsername == null || storedUsername == '') {
  showConfig();
}
else {
  username.text = storedUsername;
}
```

app.jsとしては最後のパートです。ここはオフライン状態だと警告を表示するというもの。

twitpicへのアップロードが目的のアプリケーションなので、こういった制御をしておく必要があるわけです。

```
if (!Titanium.Network.online) {
  var a = Titanium.UI.createAlertDialog({ 
    title:'Network Connection Required',
    message: 'Snapost requires an internet connection to, you know, upload stuff to the internet.  Check your network connection and try again.'
  });
	a.show();
}
```
以上がapp.jsの中身でした。
画面の切り替えなどのアプリケーションデザインに注力したコードになっていることが分かるのではないでしょうか。


続いてapp.jsからincludeされていたスクリプトファイルを順番に見ていきます。

本来は処理順に見ていったほうが分かりやすいのですが、includeされた順番で見ていきます。

## header.js ##
```
//Construct main app header
var headerView = Titanium.UI.createView({
  backgroundColor:'#252f30',
  top:0,
  left:0,
  height:60,
  width:320,
  opacity:0.85
});

var logo = Titanium.UI.createImageView({
	url:'images/snapost-small.png',
	width:109,
	height:50,
	left:10,
	bottom:5,
	opacity:1
});
headerView.add(logo);

var profile = Titanium.UI.createButton({
	backgroundImage:'images/profile-button.png',
	width:33,
	height:35,
	right:10,
	bottom:5,
	opacity:1
});
headerView.add(profile);

var username = Titanium.UI.createLabel({
	color:'#92c0c3',
	text:'',
	textAlign:'right',
	height:'auto',
	font:{fontSize:16,fontWeight:'bold'},
	right:45,
	bottom:10
});
headerView.add(username);

profile.addEventListener("click",function(e) {
  Titanium.App.fireEvent("profileClicked");
});
```
headerViewを構成するUI部品を載せていって、最後にひとつだけイベント処理を追加しているだけというシンプルなスクリプトです。

headerView自体はapp.jsに追加されるため、ここで記載されているtop, leftの位置はWindowに対するそれになります。

それ以外のコントロール(logo, profile, username)についてはheaderView内での位置を定義している点に気をつけましょう。

最後のprofileのclickイベント定義ですが、中で使用しているTitanium.App.fireEventがミソです。app.js上で宣言したprofileClickedカスタムイベントを呼び出しています。fireEventは引数も付けられるため、グローバル関数的に用いることができます。便利なんですが、使い方を誤るとえらいことになります。要所要所に絞って使うべき処理であるでしょう。

## chooser.js ##
フォトギャラリー、もしくはカメラによる撮影でアップロードする写真を選択するViewを定義します。

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100317/20100317223552.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100317/20100317223552.png)
![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100317/20100317223553.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100317/20100317223553.png)

まずはソース全体を引用します。

```
var chooser = Titanium.UI.createView({
  top:60,
  width:320,
  height:420,
  opacity:1
});

var chooserLabel = Ti.UI.createLabel({
  text: 'Choose an image:',
  textAlign:'center',
  font:{
    fontSize:24,
    fontFamily:'Trebuchet MS',
    fontWeight:'bold',
    fontStyle:'italic'
  },
  height:'auto',
  width:'auto',
  color:'#fff',
  top:5
});

chooser.add(chooserLabel);

//Add image upload/capture buttons
var imageControls = Titanium.UI.createView({
  top:70,
  height:90,
  width:230
});

var ind = Titanium.UI.createProgressBar({
	width:200,
	height:50,
	min:0,
	max:1,
	value:0,
	bottom:10,
	message:'Uploading Image',
	font:{fontSize:14},
	color:'#fff',
	style:Titanium.UI.iPhone.ProgressBarStyle.BAR
});

chooser.add(ind);

var gallery = Titanium.UI.createButton({
	backgroundImage:'images/albums-button.png',
	top:0,
	width:229,
	height:42
});

imageControls.add(gallery);

var camera = Titanium.UI.createButton({
	backgroundImage:'images/camera-button.png',
	width:229,
	height:46,
	top:43
});

imageControls.add(camera);

chooser.add(imageControls);

function handleImageEvent(event) {
  theImage = event.media;
  theThumbnail = event.thumbnail;
  Titanium.App.fireEvent("photoChosen");
  showConfirmation();
}

gallery.addEventListener("click", function(e) {
  Titanium.Media.openPhotoGallery({
  	success:function(event) {
  	  handleImageEvent(event);
  	},
  	cancel:function() {},
  	error:function(error){
  	  var a = Titanium.UI.createAlertDialog({ 
  	    title:'Uh Oh...',
  	    message: 'We had a problem reading from your photo gallery - please try again'
  	  });
  		a.show();
  	},
  	allowImageEditing:true
  });
});

camera.addEventListener("click", function(e) {
  Titanium.Media.showCamera({
  	success:function(event) {
  	  handleImageEvent(event);
  	},
  	cancel:function() {},
  	error:function(error) {
  		var a = Titanium.UI.createAlertDialog({ title:'Uh Oh...'});
  		if (error.code == Titanium.Media.NO_CAMERA) {
  			a.setMessage('Sorry, this device does not have a camera - you knew that, right?');
  		}
  		else {
  			a.setMessage('Unexpected error: ' + error.code);
  		}
  		a.show();
  	},
  	allowImageEditing:true
  });
});
```

前半はViewと構成するUI部品の定義に終始しています。

ちょっと違うのはimageControlsというViewを定義している点でしょうか。galleryとcameraという二つのボタンを収納する事を目的としたコンテナです。

別段それぞれchooserに直接配置しても問題ないのですが、おそらくこういう風にしている意図としてはレイアウト調整の手間を減らすためであると思われます。

galleryとcameraのボタンはひとかたまりに移動するべきデザインになっており、それなら土台となるViewの配下とすることで調整の手間をViewの移動のみで済ませる事ができるからです。

完成形となるデザインが見えてるからこその細かいテクニックではありますが、有用なので見習って行きたいところです。

一方で残念ながら、おそらくデッドコードになっていると思われるのが次のパートです。

テストの名残だと思うのですが、こういったコードが残っていると可読性が悪くなり、また同じindという変数が後に出てきたりするため混乱の元になりますので、気をつけたいところです。

```
var ind = Titanium.UI.createProgressBar({
	width:200,
	height:50,
	min:0,
	max:1,
	value:0,
	bottom:10,
	message:'Uploading Image',
	font:{fontSize:14},
	color:'#fff',
	style:Titanium.UI.iPhone.ProgressBarStyle.BAR
});
chooser.add(ind);
```

続いて宣言されているのが、フォトギャラリー・カメラによる写真決定処理に関する部分です。該当部分のみを抜粋します。

```
function handleImageEvent(event) {
  theImage = event.media;
  theThumbnail = event.thumbnail;
  Titanium.App.fireEvent("photoChosen");
  showConfirmation();
}

gallery.addEventListener("click", function(e) {
  Titanium.Media.openPhotoGallery({
  	success:function(event) {
  	  handleImageEvent(event);
  	},
  	cancel:function() {},
  	error:function(error){
  	  var a = Titanium.UI.createAlertDialog({ 
  	    title:'Uh Oh...',
  	    message: 'We had a problem reading from your photo gallery - please try again'
  	  });
  		a.show();
  	},
  	allowImageEditing:true
  });
});

camera.addEventListener("click", function(e) {
  Titanium.Media.showCamera({
  	success:function(event) {
  	  handleImageEvent(event);
  	},
  	cancel:function() {},
  	error:function(error) {
  		var a = Titanium.UI.createAlertDialog({ title:'Uh Oh...'});
  		if (error.code == Titanium.Media.NO_CAMERA) {
  			a.setMessage('Sorry, this device does not have a camera - you knew that, right?');
  		}
  		else {
  			a.setMessage('Unexpected error: ' + error.code);
  		}
  		a.show();
  	},
  	allowImageEditing:true
  });
});
```

galleryの処理とcameraの処理がほとんど同じような構成になっています。Titanium Mobileではフォトギャラリーからのファイル選択時とカメラ撮影の処理が抽象化によりほぼ同一化されています。エラー処理における若干の差異（カメラの存在チェックなど）をそれぞれで記述していると考えればいいでしょう。

そしてsuccess時にはevent仮引数に同じ構造のデータが入ってくるので、handleImageEventという関数を先に宣言しておき、それを利用する形になっています。

写真データの本体とサムネイルをapp.jsで宣言されていたtheImageとtheThumbnailにセットし、photoChosenカスタムイベントを発動し、画面を確認画面（Confirmation）に遷移するということがまとめられています。

photoChosenなんてイベントはいまのところ出てきてませんが、ビルド前のチェックでは怒られません。カスタムイベントは宣言の有無に関わらずコンパイルが通るのでこういう時に便利ですが、typoしたときは目も当てられません...

## config.js ##
順番は前後しますが、画面の展開的にapp.js内ではアプリケーションプロパティ"un"の定義がない場合、configを表示する展開になっていましたね。

そこを司るconfig.jsを見ていきます。

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100317/20100317223555.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100317/20100317223555.png)

```
var config = Titanium.UI.createView({
  width:320,
  height:420,
  visible:false
});

var configLabel = Ti.UI.createLabel({
  text: 'Twitter Credentials:',
  textAlign:'center',
  font:{
    fontSize:24,
    fontFamily:'Trebuchet MS',
    fontWeight:'bold',
    fontStyle:'italic'
  },
  height:'auto',
  width:'auto',
  color:'#fff',
  top:60
});

config.add(configLabel);

var usernameVal = Titanium.App.Properties.getString("un");
var passwordVal = Titanium.App.Properties.getString("pw");

var unField = Titanium.UI.createTextField({
	color:'#787878',
	value:usernameVal,
	height:35,
	top:95,
	width:250,
	hintText:'Twitter Username',
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	autocorrect:false
});
unField.addEventListener('return', function() {
	unField.blur();
});
unField.addEventListener('change', function(e) {
	usernameVal = e.value;
});

config.add(unField);

var pwField = Titanium.UI.createTextField({
	color:'#787878',
	value:passwordVal,
	height:35,
	top:135,
	width:250,
	hintText:'Twitter Password',
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	autocorrect:false,
	passwordMask:true
});
pwField.addEventListener('return', function() {
	pwField.blur();
});
pwField.addEventListener('change', function(e) {
	passwordVal = e.value;
});

config.add(pwField);

var saveButton = Titanium.UI.createButton({
  top:175,
	backgroundImage:'images/save-button.png',
	width:145,
	height:53
});
config.add(saveButton);

saveButton.addEventListener("click", function(e) {
  username.text = usernameVal;
  Titanium.App.Properties.setString("un",usernameVal);
  Titanium.App.Properties.setString("pw",passwordVal);
  showChooser();
});

config.addEventListener("click", function(e) {
  unField.blur();
  pwField.blur();
});
```

画面部品の生成の途中で以下のようにしているのが、アプリケーションプロパティの取得です。app.jsでも出てきていますね。

```
var usernameVal = Titanium.App.Properties.getString("un");
var passwordVal = Titanium.App.Properties.getString("pw");
```

これらの現在の設定値をユーザネームとパスワードのそれぞのれTextFieldの初期値としてセットするため、ここで変数化しています。

そのユーザネームTextFieldであるunFieldの宣言が続いてされています。

```
var unField = Titanium.UI.createTextField({
	color:'#787878',
	value:usernameVal,
	height:35,
	top:95,
	width:250,
	hintText:'Twitter Username',
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	autocorrect:false
});
unField.addEventListener('return', function() {
	unField.blur();
});
unField.addEventListener('change', function(e) {
	usernameVal = e.value;
});
```
TextFieldは初期化時に設定できるプロパティが非常に多い部品であるため、事細かに設定すると一つの部品に対してこの程度の行数が発生する事はザラになります。ちょっと鬱陶しい感じはしますが、そういうものだとあきらめるしかありません。

面白いのはreturnイベントでusernameValに値をセットするのではなく、内容変更が発生するたびにセットし直している点でしょうか。GUIの場合、Viewへのタッチなどでフォーカスアウトすることも多いため、毎回更新のコストを消費しても値を差し替える安全性をトレードオフしているものと思われます。

続いてパスワード部分の定義がされていますが、passwordMaskプロパティ以外はこれといって差がないので割愛します。

これらの入力した値をアプリケーションプロパティとして保存するのがsaveButtonです。

保存処理後、自動的にChooserに戻るように宣言しているのがsaveButtonのクリックイベントです。ちなみに1行目のusernameはヘッダ部に表示されているユーザ名です。

```
saveButton.addEventListener("click", function(e) {
  username.text = usernameVal;
  Titanium.App.Properties.setString("un",usernameVal);
  Titanium.App.Properties.setString("pw",passwordVal);
  showChooser();
});
```

最後にViewであるconfigのclickイベントとして、ユーザネームとパスワードからのフォーカス喪失を指示しています。ユーザビリティ向上の施策として有用ですね。

```
config.addEventListener("click", function(e) {
  unField.blur();
  pwField.blur();
});
```

## result.js ##
本来なら次のスクリプトから呼び出されるパートなのですが、include順に読んでいっているので、仕方なく見ていきます。

resultという名前ですが、実行＆結果表示なのでtwitpicへのアップロードの本体部にも当たります。

まずはソース全体。

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100317/20100317223556.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100317/20100317223556.png)
![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100317/20100317223557.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100317/20100317223557.png)

```
var result = Titanium.UI.createView({
  width:320,
  height:420,
  visible:false
});

var warp = Titanium.Media.createSound({url:'warp.caf'});
var yay = Titanium.Media.createSound({url:'yay.caf'});

var resultLabel = Ti.UI.createLabel({
  text: 'Magically beaming image...',
  textAlign:'center',
  font:{
    fontSize:18,
    fontFamily:'Trebuchet MS',
    fontWeight:'bold',
    fontStyle:'italic'
  },
  height:'auto',
  width:'auto',
  color:'#fff',
  top:120
});
result.add(resultLabel);

var ind = Titanium.UI.createProgressBar({
	width:200,
	height:50,
	min:0,
	max:1,
	value:0,
	style:Titanium.UI.iPhone.ProgressBarStyle.BAR,
	top:150,
	message:'Upload Progress:',
	font:{fontSize:12, fontWeight:'bold'},
	color:'#fff'
});

result.add(ind);
ind.show();

//Listen for post event
Titanium.App.addEventListener("postClicked", function(e) {
  showResult();
	ind.show();
	var xhr = Titanium.Network.createHTTPClient();
	xhr.onerror = function(e) {
	  ind.hide();
	  var a = Titanium.UI.createAlertDialog({ 
	    title:'Well, this is awkward...',
	    message: 'We had a problem posting your image - please try again'
	  });
		a.show();
		showChooser();
	};
	xhr.onload = function() {
	  ind.hide();
	  var doc = this.responseXML.documentElement;
	  var rsp = doc.getElementsByTagName("rsp").item(0);
	  /* //TODO: Need XML Attribute Support
	  if (rsp.attributes.getNamedItem("stat") == 'ok') {
	    resultLabel.text = 'Success!';
	    setTimeout(function() {
	      showChooser();
	    },1500);
	  }
	  else {
	    showChooser();
	  }
	  */
	  if (doc.getElementsByTagName("err") != null && doc.getElementsByTagName("err").length > 0) {
	    var a = Titanium.UI.createAlertDialog({ 
  	    title:'Well, this is awkward...',
  	    message: 'We had a problem posting your image - check your username and password combination and try again.'
  	  });
  		a.show();
	  }
	  else {
	    resultLabel.text = 'Upload Complete!';
  	  yay.play();
	  }
	  
	  ind.value = 0;
    setTimeout(function() {
      showChooser();
      resultLabel.text = 'Magically beaming image...';
    },2000);
	};
	xhr.onsendstream = function(e) {
		ind.value = e.progress;
	};
	xhr.open('POST','https://twitpic.com/api/uploadAndPost');
  xhr.send({
    media:theImage,
    username:Titanium.App.Properties.getString("un"),
    password:Titanium.App.Properties.getString("pw"),
    message:e.message
  });
  warp.play();
});
```

まずはresultという名のviewを他のスクリプト同様に作成しています。

```
var warp = Titanium.Media.createSound({url:'warp.caf'});
var yay = Titanium.Media.createSound({url:'yay.caf'});
```

ここでは送信開始時と完了時に再生されるcafフォーマットの（ムダに派手な）音声を読み込んでいます。

続くUI部品定義にてまたもやindという名のProgressBarが宣言されています。

こちらは利用されていますよ。宣言し、resultに追加した後、ind.show()をしています。

他のUI部品と異なり、指定していないときはvisible=falseとして初期化される点は覚えておくべきでしょう。

```
var ind = Titanium.UI.createProgressBar({
	width:200,
	height:50,
	min:0,
	max:1,
	value:0,
	style:Titanium.UI.iPhone.ProgressBarStyle.BAR,
	top:150,
	message:'Upload Progress:',
	font:{fontSize:12, fontWeight:'bold'},
	color:'#fff'
});
result.add(ind);
ind.show();
```

その後postClickedカスタムイベントを宣言しています。これは次に紹介するconfirm.js上で呼び出される処理です。

具体的にはapp.jsで宣言されたshowResultでこのviewを表示し、ind.show()をさらにして、そこからtwitpicへのアップロードのため、Titanium.Network.HTTPClientの処理へと移っていきます。

まずはエラー発生時のonerrorですが、単にエラー発生のアラートを表示した後にchooser画面に戻っているだけです。重要なのは前処理として表示されているindをhide()しているところぐらいでしょう。

```
xhr.onerror = function(e) {
    ind.hide();
    var a = Titanium.UI.createAlertDialog({ 
        title:'Well, this is awkward...',
        message: 'We had a problem posting your image - please try again'
    });
    a.show();
    showChooser();
};
```

つづいて本体部のonloadイベントです。

まずind.hide()した後に応答データをXMLのDOMオブジェクトdocとして取得します。

err要素があればエラー扱いとし、そうでなけば表示していたupload中の表示を「Upload Complete!」に差し替え、完了時の音声を再生しています。

そしてなぜかこのタイミングだけでind.valueを0に設定しています。本来エラー時にも0に設定しておく必要があると思うのですが、なぜかここでのみクリア処理をしています。

```
xhr.onload = function() {
	  ind.hide();
	  var doc = this.responseXML.documentElement;
	  var rsp = doc.getElementsByTagName("rsp").item(0);
	  if (doc.getElementsByTagName("err") != null && doc.getElementsByTagName("err").length > 0) {
	    var a = Titanium.UI.createAlertDialog({ 
  	        title:'Well, this is awkward...',
  	       message: 'We had a problem posting your image - check your username and password combination and try again.'
  	    });
  	  a.show();
	  }
	  else {
	    resultLabel.text = 'Upload Complete!';
  	    yay.play();
	  }
	  ind.value = 0;
          setTimeout(function() {
              showChooser();
              resultLabel.text = 'Magically beaming image...';
          },2000);
};
```

最後に2秒間そのまま表示したあと、chooser画面に戻っています。

と同時にresultLabelの表示を元に戻しています。


続くxhr.onsendstreamはアップロード(send)の進捗を表示するためによくつかわれるイベントです。e.progressが一定値単位増えるごとにイベントが発生します。

```
xhr.onsendstream = function(e) {
    ind.value = e.progress;
};
```

最後にtwitpicのAPIへのPOSTを行っています。xhr.sendにはJSON形式でPOSTデータを指定できます。

送信指示語にwarp.cafのロードと再生を行っています。

```
xhr.open('POST','https://twitpic.com/api/uploadAndPost');
xhr.send({
    media:theImage,
    username:Titanium.App.Properties.getString("un"),
    password:Titanium.App.Properties.getString("pw"),
    message:e.message
});
warp.play();
```

## confirm.js ##
最後のビューです。

![http://f.hatena.ne.jp/images/fotolife/d/donayama/20100317/20100317223554.png](http://f.hatena.ne.jp/images/fotolife/d/donayama/20100317/20100317223554.png)

```
var confirmation = Titanium.UI.createView({
  width:320,
  height:420,
  visible:false
});

var confirmationLabel = Ti.UI.createLabel({
  text: 'Add a message:',
  textAlign:'center',
  font:{
    fontSize:24,
    fontFamily:'Trebuchet MS',
    fontWeight:'bold',
    fontStyle:'italic'
  },
  height:'auto',
  width:'auto',
  color:'#fff',
  top:60
});

confirmation.add(confirmationLabel);

var commentText = 'Just uploaded this from #Snapost';
var comment = Titanium.UI.createTextField({
	value:commentText,
	height:'35px',
	width:'300px',
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	top:95,
	clearButtonMode: Titanium.UI.INPUT_BUTTONMODE_ALWAYS
});
confirmation.add(comment);

comment.addEventListener("change", function(e) {
  commentText = e.value;
});

var thumbnailView = Titanium.UI.createImageView({
  image:theImage,
  top:150,
  height:150,
  width:150
});
confirmation.add(thumbnailView);

//Listen for event that photo has been chosen
Titanium.App.addEventListener("photoChosen", function(e) {
  thumbnailView.image = theImage;
});

var backLabel = Ti.UI.createLabel({
  text: '<< Go Back',
  textAlign:'center',
  font:{
    fontSize:14,
    fontWeight:'bold'
  },
  height:'auto',
  width:'auto',
  color:'#fff',
  top:305
});
confirmation.add(backLabel);
backLabel.addEventListener("click", function(e) {
  showChooser();
});

var post = Titanium.UI.createButton({
	backgroundImage:'images/post-button.png',
	width:148,
	height:46,
	bottom:40
});
confirmation.add(post);

post.addEventListener("click", function(e) {
  Titanium.App.fireEvent("postClicked", {
    message: commentText
  });
});
```

毎度通りのconfirmationというviewの作成後、プロンプトのLabel、コメント入力用のTextFieldを生成→confirmationへの追加をしています。

ちなみにここでもコメント入力欄のchangeイベントで変数の内容をリアルタイムに更新しています。

```
var thumbnailView = Titanium.UI.createImageView({
  image:theImage,
  top:150,
  height:150,
  width:150
});
confirmation.add(thumbnailView);

//Listen for event that photo has been chosen
Titanium.App.addEventListener("photoChosen", function(e) {
  thumbnailView.image = theImage;
});
```
続くこのパートですが、thumbnailView生成時にはtheImageは宣言時のnullのままです。

これをchooserでfireしていたphotoChosenカスタムイベントで設定し直してるのが後段の部分に当たります。

```
var backLabel = Ti.UI.createLabel({
  text: '<< Go Back',
  textAlign:'center',
  font:{
    fontSize:14,
    fontWeight:'bold'
  },
  height:'auto',
  width:'auto',
  color:'#fff',
  top:305
});
confirmation.add(backLabel);
backLabel.addEventListener("click", function(e) {
  showChooser();
});
```
Labelをボタンとして使っている事例ですね。

こういった挙動がどこまで許されるのか曖昧なのがUIガイドラインの難しいところです(^^;

そして、最後のpostボタンです。ここでresult.jsで宣言していたpostClickedをfireしています。fire時に引数としてcommentTextを渡すようにしています。互いに同じスコープだから見えるんですが、おそらく違うコンテキストでも同じように動くということを見せたいのだろうと好意的に解釈しておきましょう。

```
var post = Titanium.UI.createButton({
	backgroundImage:'images/post-button.png',
	width:148,
	height:46,
	bottom:40
});
confirmation.add(post);

post.addEventListener("click", function(e) {
  Titanium.App.fireEvent("postClicked", {
    message: commentText
  });
});
```

## 総括 ##
以上のようにみてきたのがSnapostのソースコードになります。

Viewの展開を個別のjsにわけているものの同じスコープでの処理であるため、いまいちfunctionコールとカスタムイベントの位置づけが曖昧な印象が拭えない…というのが筆者の個人的な感想です。

とはいえ、この程度のコンパクトなソースでああいうアプリケーションが動作するのだというのが見える点では上出来なサンプルであると思います。

ロジックらしいロジックのないサンプルではありますが、ぜひ参考にしてみてください。



---

原著作者表示：[Appcelerator, Inc](http://www.appcelerator.com/)