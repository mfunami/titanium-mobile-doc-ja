$(function(){
    var areaView = null;
    var prefView = null;
    var shopView = null;
    var mapView  = null;
    var forwardAnimeParam = {
	animated:true,
	animationStyle:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT,
	animationDuration:500
    };
    var backAnimeParam = {
	animated:true,
	animationStyle:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT,
	animationDuration:500
    };
    var backView = [];
    var backNaviButton = Titanium.UI.createButton({
	title:'戻る',
	style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
    });
    backNaviButton.addEventListener('click', function(){
	Titanium.UI.currentWindow.showView(backView.pop(), backAnimeParam);
	if(backView.length == 0){
	    Titanium.UI.currentWindow.setLeftNavButton(null);	    
	}
    });

    function selectArea(){
	var db = Titanium.Database.open('mydb');
	var areaRows = db.execute('SELECT DISTINCT AREA FROM SHOPLIST ORDER BY ROWNO');
	var areaData = [];
	while (areaRows.isValidRow()) {
	    areaData.push({
		title : areaRows.field(0),
		hasChild : true
	    });
	    areaRows.next();
	}
	areaRows.close();
	return areaData;
    }

    function selectPref(key){
	var db = Titanium.Database.open('mydb');
	var prefRows = 	db.execute("SELECT PREF, COUNT(*) CNT FROM SHOPLIST WHERE AREA = ? GROUP BY PREF ORDER BY MIN(ROWNO)", key);
	var prefData = [];
	while (prefRows.isValidRow()) {
	    prefData.push({
		title : prefRows.field(0),
		hasChild : true
	    });
	    prefRows.next();
	}
	prefRows.close();
	return prefData;
    }

    function selectShop(key){
	var db = Titanium.Database.open('mydb');
	var rows = db.execute("SELECT SHOPID, SHOPNAME FROM SHOPLIST WHERE PREF = ? ORDER BY ROWNO", key);
	var data = [];
	while (rows.isValidRow()) {
	    data.push({
		title : rows.field(1),
		description: rows.field(0),
		hasDetail : true
	    });
	    rows.next();
	}
	rows.close();
	return data;
    }

    function showMap(key){
	var win = Titanium.UI.createWindow({url :'map.html'});
	var mapview = null;
	var detailview = null;
	var db = Titanium.Database.open('mydb');
	var rows = db.execute("SELECT SHOPNAME, ADDRESS, LAT, LNG, PHONE, TOAST, MORNING, MISC FROM SHOPLIST WHERE SHOPID = ?", key);
	var shopdata = {};
	if(rows.isValidRow()) {
	    shopdata = {
		SHOPNAME: rows.field(0),
		ADDRESS:  rows.field(1),
		LAT:      rows.field(2),
		LNG:      rows.field(3),
		PHONE:    rows.field(4),
		MISC:     rows.field(7)
	    };
	}
	rows.close();
	if(shopdata.SHOPNAME != null){
	    mapview = Titanium.Map.createView({
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
	    /*
	    var dialog_param = {
		'title' : shopdata.SHOPNAME,
		'message': shopdata.ADDRESS + "\n" + shopdata.PHONE + "\n" + shopdata.MISC,
		'buttonNames': [ 'OK' ]
	    };
	    mapview.addEventListener('click',function(evt) {
		var dialog = Titanium.UI.createAlertDialog(dialog_param);
		dialog.show();
	    });
            */ 

	    detailview = Titanium.UI.createTableView({
		data:[
		    {html:'<div>' + shopdata.SHOPNAME + '</div>', header:'店名'},
		    {html:'<div>' + shopdata.ADDRESS  + '</div>', header:'住所'},
		    {html:'<div>' + shopdata.MISC     + '</div>', header:'営業時間'},
		    {html:'<div>' + shopdata.PHONE    + '</div>', header:'電話番号'}
		]
	    },function(eventObject){
	    });
	}

	var tabbar = Titanium.UI.createTabbedBar({
	    labels:['地図', '詳細'],
	    index:0
	});
	tabbar.addEventListener('click', function(e){
	    if(e.index == 0){
		win.showView(mapview);
	    }
	    else if(e.index == 1){
		win.showView(detailview);
	    }
	});
	win.setTitleControl(tabbar);

	win.addView(mapview);
	win.addView(detailview);
	win.showView(mapview);
	win.open({animated:true});   
    }

    function reloadArea(){
	if(areaView == null){
	    areaView = Titanium.UI.createTableView({
		data: selectArea(),
		title: '地域選択'
	    }, function(eventObject){
		var prefData = selectPref(eventObject.rowData.title);
		if(prefView == null){
		    prefView = Titanium.UI.createTableView({
			data: prefData,
			title: '都道府県選択'
		    }, function(eventObjectPref){
			var shopData = selectShop(eventObjectPref.rowData.title);
			if(shopView == null){
			    shopView = Titanium.UI.createTableView({
				data: shopData,
				title: '店舗選択'
			    }, function(eventObjectShop){
				showMap(eventObjectShop.rowData.description);
			    });
			    Titanium.UI.currentWindow.addView(shopView);
			}
			else{
			    shopView.setData(shopData);
			}
			backView.push(prefView);
			Titanium.UI.currentWindow.setLeftNavButton(backNaviButton);
			Titanium.UI.currentWindow.showView(shopView, forwardAnimeParam);
		    });
		    Titanium.UI.currentWindow.addView(prefView);
		}
		else{
		    prefView.setData(prefData);
		}
		backView.push(areaView);
		Titanium.UI.currentWindow.setLeftNavButton(backNaviButton);
		Titanium.UI.currentWindow.showView(prefView, forwardAnimeParam);
		//Titanium.UI.currentWindow.setTitle('都道府県選択');
	    });	
	    Titanium.UI.currentWindow.addView(areaView);
	    Titanium.UI.currentWindow.showView(areaView);
	    //Titanium.UI.currentWindow.setTitle('地域選択');
	}
    }
    reloadArea();
});