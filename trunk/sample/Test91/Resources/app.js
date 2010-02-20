//----------------------------------------------------
// app.jsはアプリケーションのエントリポイントです。
//----------------------------------------------------

// 最上位UIとして"マスタUIView"が存在する。そこに対する背景色設定。
Titanium.UI.setBackgroundColor('#fff');

// タブグループを作成し、
// これに対してそれぞれのタブ＋ルートウィンドウを放り込んでいきます。
var tabGroup = Titanium.UI.createTabGroup();

// #1. タイムラインタブ(tweet表示と新規tweet)
var win1 = Titanium.UI.createWindow({
    title:'タイムライン',
    backgroundColor:'#fff',
    url: 'index.js'
});
var tab1 = Titanium.UI.createTab({  
    icon:'./images/09-chat2.png',
    title:'タイムライン',
    window:win1
});

// #2. ギャラリー(twitpicのカバーフロー表示)
var win2 = Titanium.UI.createWindow({  
    title:'ギャラリー',
    backgroundColor:'#fff',
    url : 'coverflow.js'
});
var tab2 = Titanium.UI.createTab({  
    icon:'./images/42-photos.png',
    title:'ギャラリー',
    window:win2
});

// #3. 店舗情報(地域単位で階層化された店舗情報と地図表示)
var win3 = Titanium.UI.createWindow({  
    title:'店舗情報',
    backgroundColor:'#fff',
    url : 'shoplist.js'
});
var tab3 = Titanium.UI.createTab({  
    icon:'./images/07-map-marker.png',
    title:'店舗情報',
    window:win3
});

// #4. その他
var win4 = Titanium.UI.createWindow({  
    title:'その他',
    backgroundColor:'#fff',
    url : 'misc.js'
});
var tab4 = Titanium.UI.createTab({  
    icon:'./images/48-fork-and-knife.png',
    title:'その他',
    window:win4
});

// #5. 設定
var win5 = Titanium.UI.createWindow({  
    title:'設定',
    backgroundColor:'#fff',
    url : 'config.js'
});
var tab5 = Titanium.UI.createTab({  
    icon:'./images/20-gear2.png',
    title:'設定',
    window:win5
});

// #1〜#5のタブを追加し、グループとして表示→アプリケーション起動
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);
tabGroup.addTab(tab3);
tabGroup.addTab(tab4);
tabGroup.addTab(tab5);  
tabGroup.open({
    transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
});
