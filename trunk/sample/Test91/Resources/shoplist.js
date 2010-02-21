//--------------------------------------
// 共通処理読込
//--------------------------------------
// ＤＢの共通処理を取り込みます。
Titanium.include('shopdb.js');

//--------------------------------------
// 関数定義部
//--------------------------------------
function selectArea(){
    var data = [];
    shopdb.loadAreas(function(row){
	data.push({
	    title : row.field(0),
	    hasChild : true
	});
    });
    return data;
}

function selectPref(key){
    var data = [];
    shopdb.loadPrefs(key, function(row){
	data.push({
	    title : row.field(0),
	    hasChild : true
	});
    });
    return data;
}

function selectShop(key){
    var data = [];
    shopdb.loadShops(key, function(row){
	data.push({
	    title : row.field(1),
	    shopid: row.field(0),
	    hasDetail : true
	});
    });
    return data;
}

function showShopMapAndData(key){
    // 変数宣言部
    var shopdata = {};
    shopdb.loadShop(key, function(rows){
	shopdata = {
	    SHOPNAME: rows.field(0),
	    ADDRESS:  rows.field(1),
	    LAT:      rows.field(2),
	    LNG:      rows.field(3),
	    PHONE:    rows.field(4),
	    MISC:     rows.field(7)
	};
    });
    if(shopdata.SHOPNAME == null){
        return;
    }

    // UI 宣言部
    var shopWindow = Titanium.UI.createWindow();
    
    var tabbar = Titanium.UI.createTabbedBar({
	labels:['地図', '詳細'],
	index:0,
        style:Titanium.UI.iPhone.SystemButtonStyle.BAR
    });
    shopWindow.setRightNavButton(tabbar);

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
    btnZoomIn.addEventListener('click', function(){
        mapviewCore.zoom(1);
    });
    btnZoomOut.addEventListener('click', function(){
        mapviewCore.zoom(-1);
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
    // イベントハンドラ定義部
    tabbar.addEventListener('click', function(e){
	if(e.index == 0){
	    shopWindow.animate({view: mapview, transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT});
	}
	else if(e.index == 1){
            shopWindow.animate({view: detailview, transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
	}
    });
    shopWindow.title = '店舗情報';
    Titanium.UI.currentTab.open(shopWindow,{animated:true});    
}

//--------------------------------------
// UI宣言部
//--------------------------------------
try{
    var areaView = Titanium.UI.createTableView({
        data: selectArea(),
        title: '地域'
    });
    //--------------------------------------
    // イベントハンドラ定義部
    //--------------------------------------
    areaView.addEventListener('click', function(areaViewEventObject){
        var prefData = selectPref(areaViewEventObject.rowData.title); 
        var prefWin = Titanium.UI.createWindow({
            backgroundColor:'#000'
        });
        var prefView =  Titanium.UI.createTableView({
	    data: prefData
        });
        prefView.addEventListener('click', function(prefViewEventObject){
	    var shopData = selectShop(prefViewEventObject.rowData.title);
            var shopWin = Titanium.UI.createWindow({
                backgroundColor:'#000'
            });
            var shopView = Titanium.UI.createTableView({
	        data: shopData
	    });
            shopView.addEventListener('click', function(shopViewEventObject){
                showShopMapAndData(shopViewEventObject.rowData.shopid);
	    });
            shopWin.add(shopView);
            shopWin.title = '店舗選択';
            Titanium.UI.currentTab.open(shopWin,{animated:true});
        });
        prefWin.add(prefView);
        prefWin.title = '都道府県選択';    
        Titanium.UI.currentTab.open(prefWin,{animated:true});
    });	
    Titanium.UI.currentWindow.add(areaView);
    Titanium.UI.currentWindow.title = '地域選択';
}
catch(e){
    // おそらくデータベースがないので、タブを切り替える
    Titanium.UI.currentWindow.tabGroup.setActiveTab(4);
}

