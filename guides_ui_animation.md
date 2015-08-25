# UIカタログ(API) - アニメーション #
Window, View, Controlなどの各オブジェクトには`animate`という関数が用意されており、対象となるオブジェクトに対するアニメーション描画を行うことができます。

その際に引き渡される引数が`Titanium.UI.Animation`オブジェクトになり、次のような多くのパラメータとなるプロパティを持っています。

| **名前** | **型** | **説明** |
|:-------|:------|:-------|
|autoreverse|boolean|アニメーション完了後に元に戻るかどうかを指定|
|backgroundColor|string |色アニメーション：背景色|
|bottom  |float  |移動アニメーション：bottom位置|
|center  |object |移動アニメーション：対象オブジェクトの中心座標|
|color   |string |色アニメーション：表示色|
|curve   |int    |変形アニメーション：曲線の状態を指定。Ti.UI.ANIMATION\_CURVE\_EASE\_IN, Ti.UI.ANIMATION\_CURVE\_EASE\_IN\_OUT, Ti.UI.ANIMATION\_CURVE\_EASE\_OUT, Ti.UI.ANIMATION\_CURVE\_LINEAR|
|delay   |float  |開始まで遅延時間（単位：ミリ秒）|
|duration|float  |アニメーションに掛ける時を（単位：ミリ秒）|
|height  |float  |変形アニメーション：高さ|
|left    |float  |変形アニメーション：left位置|
|opacity |float  |色アニメーション：透過度|
|opaque  |boolean|色アニメーション：透過・非透過の切替アニメーション|
|repeat  |int    |アニメーション回数|
|right   |float  |変形アニメーション：right位置|
|top     |float  |変形アニメーション：top位置|
|transform|object |2DMatrix, 3DMatrixの値を設定し、変形アニメーション指定をする|
|transition|int    |規定のパターンに基づくアニメーション|
|visible |boolean|表示・非表示の切替アニメーション|
|width   |float  |変形アニメーション：幅|
|zIndex  |int    |移動アニメーション：zIndex|

例えば次のようなコードが例ですが、もともと赤い背景色が1000ms(1秒)かけて黒にフェイドしていき、その後、さらに1秒かけてオレンジ色に変化していくというものになります。

```
var view = Titanium.UI.createView({
   backgroundColor:'red'
});
// イベントリスナに登録するため、変数化している。
// 実際にはJSON形式で渡す省略記法もある（後述）
var animation = Titanium.UI.createAnimation();
animation.backgroundColor = 'black';
animation.duration = 1000;
animation.addEventListener('complete',function(){
    animation.removeEventListener('complete',this);
    animation.backgroundColor = 'orange';
    view.animate(animation);
});
// Viewに対してアニメーションを指示している。
view.animate(animation);
```

またanimateにはAnimationオブジェクトに続いて、完了後のコールバック関数も引数にすることができます。

次の例は4段階にアニメーションが変化していくというものです。

```
// 枠線によって円形にしているViewを配置し、
// これに対するアニメーションを指示する、というものです。
var circle = Titanium.UI.createView({
    height:100,
    width:100,
    borderRadius:50,
    backgroundColor:'#336699',
    top:10
});

//
// ここではTitanium.UI.Animationではなく、JSON形式で直接指示している。
//
// STEP 1. 中心座標(100, 100)に移動
circle.animate({center:{x:100,y:100},curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,duration:1000}, function(){
    // STEP 2. 中心座標(0, 200)に移動
    circle.animate({center:{x:0,y:200},duration:1000}, function(){
        // STEP 3. 中心座標(300, 300)に移動
        circle.animate({center:{x:300,y:300},duration:1000},function(){
            // STEP 4. 元の位置である中心座標(150, 60)に戻る
            circle.animate({center:{x:150,y:60, duration:1000}});
        });
    })
});
```

## Transitionアニメーション ##
WindowやViewに対してフリップ移動やカールするアニメーションがありますが、ああいうことを行うための指定がtransitionアニメーションになります。

指定できるのは次のとおり５つです。

  * `Ti.UI.iPhone.AnimationStyle.CURL_UP`
  * `Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT`
  * `Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT`
  * `Ti.UI.iPhone.AnimationStyle.CURL_DOWN`
  * `Ti.UI.iPhone.AnimationStyle.NONE`

```
var button = Titanium.UI.createButton({
    title:'Animate Me', 
    width:300,
    height:40,
    top:10
});
button.addEventListener('click', function(){
    button.animate({
        transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
    });
});
```

http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.UI.iPhone.AnimationStyle-object.html

## 2DMatrix, 3DMatrixによる変形アニメーション ##

2DMatrix, 3DMatrixは変形内容の指示を構成するオブジェクトで、Animationオブジェクトに与えることを目的としています。

さっそく比較的理解しやすい平面変形をする例を見てみましょう。

```

// 画像を表示したviewを変形させます
var cloud = Titanium.UI.createView({
    backgroundImage:'../images/cloud.png',
    height:178,
    width:261,
    top:10
});
var button = Titanium.UI.createButton({
    title:'Animate',
    width:200,
    height:40,
    bottom:20
});

button.addEventListener('click', function(){
    // 先ほどの画像を変形アニメーションします。
    var t = Ti.UI.create2DMatrix();
    t = t.rotate(20);
    t = t.scale(1.5);

    var animation = Titanium.UI.createAnimation();
    animation.transform = t;
    animation.duration = 3000;
    animation.autoreverse = true;
    animation.repeat = 3;

    // 上記の設定は以下のようなものです。
    // ----------------------------------
    // 「全体的に20度右回転(t.rotate)し、1.5倍に拡大(t.scale)する」変形(transform)を
    // 3000ミリ秒(duration)かけて行い、その後同じ時間かけて元に戻す(autoreverse)
    // 処理を3回繰り返す(repeat)
    cloud.animate(animation);
```

このように2DMatrixオブジェクトにエフェクトを重ねていき、Animationオブジェクトに設定するだけで変形を行えます。

回転エフェクトをする場合、回転するUI部品のanchorPointプロパティに設定することで回転軸をどこにするか設定できます。

```
var v = Titanium.UI.createView({
    backgroundColor:'#336699',
    top:10,
    left:220,
    height:50,
    width:50,
    anchorPoint:{x:0,y:0}
});
var t = Ti.UI.create2DMatrix();
t = t.rotate(90);

var a = Titanium.UI.createAnimation();
a.transform = t;
a.duration = 1000;
a.autoreverse = true;

v.animate(a);
```

この場合、左上を中心に９０度回転します。


anchorPointプロパティはx, yで回転軸を指定します。右下が` {x:1, y:1} `となります。中心では` {x:0.5, y:0.5} `です。


つづいて、ズームインするアニメーションの例です。

```
var t = Titanium.UI.create2DMatrix().scale(0);
 
// 0倍の大きさで初期化したWindowを生成します。
var w = Titanium.UI.createWindow({
    backgroundColor:'#336699',
    borderWidth:8,
    borderColor:'#999',
    height:400,
    width:300,
    borderRadius:10,
    opacity:0.92,
    transform:t
});
 
// 通常のサイズ(1×1)にへの変形指定をします。
var t1 = Titanium.UI.create2DMatrix().scale(1.1);
 
var a = Titanium.UI.createAnimation();
a.transform = t1;
a.duration = 200;
 
// 通常サイズへのアニメーションします。
a.addEventListener('complete', function(){
    // 実際のサイズに戻すためには次のような手順もあります。
    var t2 = Titanium.UI.create2DMatrix();
    w.animate({transform:t2, duration:200});
});
w.open();
w.animate(a);
```


続いて3DMatrixによる３次元変形の例です。

```
var button = Titanium.UI.createButton({
    title:'Animate Me', 
    width:300,
    height:40,
    top:10
});
button.addEventListener('click', function(){
    var t = Titanium.UI.create3DMatrix();
    // 回転(200度、XYZのベクトル(0, 1.0, 1.0) )
    t = t.rotate(200, 0, 1.0, 1.0);
    // 拡大縮小(X軸に3倍、Y軸に等倍、Z軸に1.5倍する)
    t = t.scale(3.0, 1.0, 1.5);
    // 移動(X軸に20、Y軸に-50、Z軸に170移動する)
    t = t.translate(20, -50, 170);
    // 行列[3, 4]の位置
    t.m34 = 1.0/-2000;
    button.animate({
        transform:t,
        duration:1000,
        autoreverse:true
    });
});
```


## 関連するKitchenSinkソース ##
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/basic_animation.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/transitions.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/window_animation.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/view_animation.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/control_animation.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/2d_transform.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/3d_transform.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/anchor_point.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/image_scaling.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/animation_points.js

## 関連するAPIドキュメント ##
  * http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.UI.Animation-object
  * http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.UI.iPhone.AnimationStyle-object.html
  * http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.UI.2DMatrix-object
  * http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.UI.3DMatrix-object


---

原著作者表示：[Appcelerator, Inc](http://www.appcelerator.com/)