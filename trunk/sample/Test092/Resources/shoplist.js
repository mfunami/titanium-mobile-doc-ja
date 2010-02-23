//--------------------------------------
// 共通処理読込
//--------------------------------------
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

function showShopData(key){
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

    var shopWindow = Titanium.UI.createWindow({
        url: 'shopdata.js',
        title:'店舗情報'
    });
    shopWindow.shopdata = shopdata;
    Titanium.UI.currentTab.open(shopWindow,{animated:true});    
}

//--------------------------------------
// UI宣言部
//--------------------------------------
try{
    var areaView = Titanium.UI.createTableView({
        data: selectArea()
    });
    //--------------------------------------
    // イベントハンドラ定義部
    //--------------------------------------
    areaView.addEventListener('click', function(areaViewEventObject){
        var prefWin = Titanium.UI.createWindow({title:'都道府県選択'});
        var prefView =  Titanium.UI.createTableView({
	    data: selectPref(areaViewEventObject.rowData.title)
        });
        prefView.addEventListener('click', function(prefViewEventObject){
            var shopWin = Titanium.UI.createWindow({title:'店舗選択'});
            var shopView = Titanium.UI.createTableView({
	        data: selectShop(prefViewEventObject.rowData.title)
	    });
            shopView.addEventListener('click', function(shopViewEventObject){
                showShopData(shopViewEventObject.rowData.shopid);
	    });
            shopWin.add(shopView);
            Titanium.UI.currentTab.open(shopWin,{animated:true});
        });
        prefWin.add(prefView);
        Titanium.UI.currentTab.open(prefWin,{animated:true});
    });	
    Titanium.UI.currentWindow.add(areaView);
    Titanium.UI.currentWindow.title = '地域選択';
}
catch(e){
    // おそらくデータベースがないので、タブを切り替える
    Titanium.UI.currentWindow.tabGroup.setActiveTab(4);
}

