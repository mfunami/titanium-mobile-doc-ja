# サンプルソース解説 - JPCalConv #

(Ver.0.8系の解説になります)

単画面のユーティリティアプリケーションの例として、次のパスのソースをベースに解説していきます。

http://code.google.com/p/titanium-mobile-doc-ja/source/browse/trunk/sample/JPCalConv


モノとしては非常に単純なシロモノで、「和暦＋年をPickerで選択すると、西暦年と干支が表示される」というただそれだけのものです。

それだけではちょっと寂しいので、節分でおなじみの恵方の判定をして、ついでに3GSから搭載されている電子コンパス機能で向きの判定まで追加してみました。
変数が定義されていません: それだけではちょっと寂しいので、節分でおなじみの恵方の判定をして、ついでに3GSから搭載されている電子コンパス機能で向きの判定まで追加してみました。

## ソース構成 ##
単画面の場合、次のようなシンプルな構成になります。

（他にもデフォルトのファイルがありますが割愛しておきます）

  * /tiapp.xml
  * /Resources
    * index.html
    * index.css
    * index.js

## /tiapp.xml ##
アプリケーション定義ファイルです。(Titanium Mobile 0.8系まで)
`<windows>`要素内の`<window>`要素がひとつしかありません。

これにより（副作用として）Tab Barの自動発生が防げるようになります。


その他の項目はこれまでと大差ありません。
```
<?xml version="1.0" encoding="UTF-8"?>
<ti:app xmlns:ti="http://ti.appcelerator.org">
  <id>jp.hsj.iphone.jpcalconv</id>
  <name>JPCalConv</name>
  <version>1.0</version>
  <icon>appicon.png</icon>
  <persistent-wifi>false</persistent-wifi>
  <prerendered-icon>false</prerendered-icon>
  <statusbar-style>opaque</statusbar-style>
  <windows>
    <window>
      <id>index</id>
      <url>index.html</url>
      <backgroundColor>#111</backgroundColor>
      <barColor>#000</barColor>
      <fullscreen>false</fullscreen>
    </window>
  </windows>
  <guid>baea5414-7958-46e2-872c-003d11383e70</guid>
</ti:app>
```

## /Resources/index.html ##
前半の`div#result`と`div#result_eho`の部分がWebView、後半の`div#picker`にPickerコントロールを配置することを企図したデザインになっています。

若干めんどくさくなって直接style指定してしまっています。
```
<html>
  <head>
    <script type="text/javascript" src="jquery-1.3.2.js"></script>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/> 
    <title>和暦→西暦変換</title>
    <script type="text/javascript" src="index.js"></script>
    <link href="index.css" rel="stylesheet" type="text/css"/>
  </head>
  <body>
    <div id="result" style="color: white; font-size:200%;text-align:center;">
    </div>
    <div id="result_eho" style="border:white thin solid; color: white; font-size:100%;">
      恵方：<span id="eho"></span> <span id="direction"></span>
    </div>
    <div id="picker"></div>
  </body>
</html>
```

### /Resources/index.css ###
bodyに`margin:0; padding:0;`を足しておきました。

これにより端の隙間を排除できます。
```
body{
    margin:0;
    padding:0;
    background-color:#111;
    color:#bbb;
    font-family:sans-serif;
}

h1,h2{
    color:#900;
}

p{
    margin-bottom:20px;
}
```

## /Resources/index.js ##
縦に長いメソッドにしてしまったので`windows.onload`ハンドラの内容を分割してみます。

まずは干支とか恵方とか、和暦関連のデータを定義するだけの部分です。
あんまり目新しいところはないですね。

和暦の定義部分ぐらいはsqliteのテーブルに置き換えてもいいかもしれません。

```
    // 西暦年を１２で割った時の剰余は 4が子年
    var eto = ['申', '酉', '戌', '亥', '子', '丑',
               '寅', '卯', '辰', '巳', '午', '未'];
    // 西暦を10で割った時の剰余で恵方が決まる
    var eho = [
        {name : '庚', compass : 255, compassName: '西南西微西'},
        {name : '辛', compass : 165, compassName: '南南東微南'},
        {name : '壬', compass : 345, compassName: '北北西微北'},
        {name : '庚', compass : 165, compassName: '南南東微南'},
        {name : '甲', compass :  75, compassName: '東北東微東'},
        {name : '乙', compass : 255, compassName: '西南西微西'},
        {name : '丙', compass : 165, compassName: '南南東微南'},
        {name : '丁', compass : 345, compassName: '北北西微北'},
        {name : '戊', compass : 165, compassName: '南南東微南'},
        {name : '己', compass :  75, compassName: '東北東微東'}
    ];
    var dataJPYear = [
        {name: '明治', from: 1868 , max: 45},
        {name: '大正', from: 1912 , max: 15},
        {name: '昭和', from: 1926 , max: 64},
        {name: '平成', from: 1989 , max: 99}
    ];
```

Pickerコントロールで和暦年を選択させるためのデータ生成部です。

元年とする処理がないのなら、特段function化する必要はなかったかもしれませんね。


ここでは各要素に`html`という値を渡しています。

これによりそれぞれのPickerのセルにHTMLで記述された表現が表示されるようになるわけです。

```
    var generateYears = function(maxYear){
        var answer = [{html: '<div>元年</div>', selected: true}];
        for(var i = 2; i <= maxYear; i++){
            answer.push({html: '<div>' + i + '年</div>'});
        }
        return answer;
    };
```

次にPickerコントロールを生成する部分を見てみましょう。

```
    var coldef = [];
    coldef.push({
        width:80,
        data:[
            {title: '明治'},
            {title: '大正'},
            {title: '昭和'},
            {title: '平成', selected: true}
        ]
    });
    coldef.push({
        width: 100,
        data:  generateYears(99)
    });
    var picker = Titanium.UI.createPicker({
        id:   'picker',
        data: coldef,
        selectionIndicator:true
    });
```

まず`coldef`という配列に二つのPickerカラム定義を設定しています。
一つ目は元号で２つ目は和暦年なのは見ていただいたら分かるかと。

`width`はその名のとおり、列幅をPixel単位で指定する形です。
`data`はそれぞれの列のデータになります。

ここで「大正とか選んだら年数１５年までにしないといけないじゃん」となると思います。
その辺はPickerの`change`イベントで反映するロジックを組み入れていますので、それはもう少し後で触れます。

そして、先ほど作った`coldef`を引数にした`Titanium.UI.createPicker`でPickerコントロールを生成します。

引数のidがindex.html上の`div#picker`の部分になります。ここにNative UIを配置するという形になります。

どのNativeUIでもこのような連想配列形式でコントロールの初期化を行います。snippet形式で持っておいたほうがいいかもしれませんね。


続いて、Pickerの値を変更したときに発生する`change`イベントの処理についてみてみます。

```
    // 選択イベント用
    var lastSelectedValue0 = -1;
    var eho_compass = 0;
    picker.addEventListener('change', function(e){      
        if(lastSelectedValue0 != e.selectedValue[0]){
            lastSelectedValue0 = e.selectedValue[0];
            picker.setColumnData(1, generateYears(dataJPYear[e.selectedValue[0]].max)); 
        }
        var yyyy = dataJPYear[e.selectedValue[0]].from + e.selectedValue[1];
        $('#result').html('西暦 ' +  yyyy + '年 (' + eho[yyyy % 10].name + eto[yyyy % 12] + ')');
        $('#eho').html(eho[yyyy % 10].compassName);
        eho_compass = eho[yyyy % 10].compass;
    });
    // 今年にフォーカス!!
    picker.selectRow((2000 + ((new Date()).getYear() % 100) - dataJPYear[3].from), 1, {animated:true});
```


`change`イベントの引数には`selectedValue[n]`というプロパティがあります。
添え字に指定した列（０オリジン）を指定すると、変更後の選択した値が返ります。
例えば、元号の現状の値を取得するには`selectedValue[0]`と指定します。

このイベントは年号でも年でもどちらでも変更した際に発生するため、毎回２列目（～年）を差替えるのはムダになります。
そこで最終の元号選択値を`lastSelectedValue0`として保持しておき、元号が切り替わるタイミングだけで最大年までで２列目を差し替える動きにしています。
元号が変わったタイミングでバッファを更新し、２列目のデータを差替える`setColumnData`メソッドを実行します。
第１引数は列番号（０オリジンなので２列目が１になる）、第２引数が列の値になります。

それらの有無に関わらず、選択値の西暦年は切り替わるので、`{yyyy`として計算します。
西暦年から干支や恵方がはじき出せるので、それらをjQueryで置き換えています。

あと`eho_compass`変数の値を上書きします。恵方の方角（角度）を保存するために用います。
恵方判定は次のロジックで行っています。

```
    // コンパス機能がついていれば恵方チェックを行います。
    if (Titanium.Geolocation.hasCompass){
        Titanium.Geolocation.watchHeading(
            function(pos){
                var x = 0 + eho_compass - eval(pos.trueHeading);
                if(x > -3 && x < 3){
                    $('#direction').html('だいたい合ってる');
                }
                else if(x < -3){
                    $('#direction').html('左回転しる');                  
                }
                else{
                    $('#direction').html('右回転しる');
                }
            },
            function(e){
            }
        );   
    }
```

`Titanium.Geolocation.watchHeading`はその瞬間だけではなく、状況を監視し続ける動きをします。
第一引数はコンパスからのデータ検知成功時の処理を指定します。
ここではPickerを変更するたびにセットされるeho\_compassの値と現状の角度を都度計算し、±３度内であることを確認しています。