//--------------------------------------
// UI宣言部
//--------------------------------------
var shopWindow = Ti.UI.currentWindow;
var tabbar = Titanium.UI.createTabbedBar({
    labels:['地図', '詳細'],
    index:0,
    style:Titanium.UI.iPhone.SystemButtonStyle.BAR
});
shopWindow.setRightNavButton(tabbar);

var shopdata = shopWindow.shopdata;
var shopRowData = [];
var createRowData = function(headerTitle, title){
    return {header: headerTitle, title: title};
};
shopRowData.push(createRowData('店名', shopdata.SHOPNAME));
shopRowData.push(createRowData('住所', shopdata.ADDRESS));
shopRowData.push(createRowData('営業時間・定休日', shopdata.MISC));
shopRowData.push(createRowData('電話番号', shopdata.PHONE));
var detailview =  Titanium.UI.createTableView({
    data: shopRowData,
    minRowHeight:80
});
var mapview = Ti.UI.createView();
var mapviewCore = Titanium.Map.createView({
    mapType : Titanium.Map.STANDARD_TYPE,
    region : {
	latitude : shopdata.LAT,
	longitude : shopdata.LNG,
	latitudeDelta : 0.01,
	longitudeDelta : 0.01
    },
    animate : true,
    regionFit : true,
    userLocation : true,
    annotations: [{
	latitude : shopdata.LAT,
	longitude : shopdata.LNG,
	title : shopdata.SHOPNAME,
	subtitle : shopdata.ADDRESS,
	pincolor :Titanium.Map.ANNOTATION_PURPLE,
	animate:true
    }]
});
mapview.add(mapviewCore);
// ツールバー
var flexSpace = Titanium.UI.createButton({
    systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});
var btnZoomIn = Titanium.UI.createButton({
    title: '+',
    height:33,
    width:33
});
var btnZoomOut = Titanium.UI.createButton({
    title: '-',
    height:33,
    width:33
});
var toolbar = Titanium.UI.createToolbar({
    items:[flexSpace, btnZoomIn, btnZoomOut, flexSpace],
    bottom:0,
    borderTop:true,
    borderBottom:false
});	
mapview.add(toolbar);
shopWindow.add(detailview);
shopWindow.add(mapview);


//--------------------------------------
// イベントハンドラ定義部
//--------------------------------------
tabbar.addEventListener('click', function(e){
    if(e.index == 0){
	shopWindow.animate({
            view: mapview,
            transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT
        });
    }
    else if(e.index == 1){
        shopWindow.animate({
            view: detailview,
            transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
        });
    }
});
btnZoomIn.addEventListener('click', function(){
    mapviewCore.zoom(1);
});
btnZoomOut.addEventListener('click', function(){
    mapviewCore.zoom(-1);
});
