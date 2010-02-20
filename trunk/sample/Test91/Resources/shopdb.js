//--------------------------------------
// 関数宣言部
//--------------------------------------
var shopdb = {
    recreateFromCSV: function(csvdata){
        // データベースの全内容をリフレッシュするためにDROP->CREATEしています
        var db = Titanium.Database.open('mydb');
        db.execute('DROP TABLE IF EXISTS SHOPLIST');
        db.execute(
	    'CREATE TABLE IF NOT EXISTS SHOPLIST (' +
	        ' ROWNO INTEGER, AREA TEXT, PREF TEXT, SHOPID INTEGER, SHOPNAME TEXT, ' +
	        ' ADDRESS TEXT, LAT NUMERIC, LNG NUMBERIC, PHONE TEXT, ' +
	        ' TOAST INTEGER, MORNING INTEGER, MISC TEXT ' +
	        ')'
        );
        var lines = csvdata.split(/\n/);
        for(var i = 0; i < lines.length; i++){
            var v = lines[i];
	    if(i > 0){
	        var field = v.split(",");
	        db.execute('INSERT INTO SHOPLIST VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
		           field[0], field[1], field[2], field[3], field[4], 
		           field[5], field[6], field[7], field[8], field[9], 
		               field[10], field[11]);
	    }
        }
    },
    loadAreas : function(iterator){
        var db = Titanium.Database.open('mydb');
        var rows = db.execute('SELECT DISTINCT AREA FROM SHOPLIST ORDER BY ROWNO');
        while (rows.isValidRow()) {
            iterator(rows);
	    rows.next();
        }
        rows.close();
    },
    loadPrefs : function(key, iterator){
        var db = Titanium.Database.open('mydb');
        var rows = db.execute("SELECT PREF, COUNT(*) CNT FROM SHOPLIST WHERE AREA = ? GROUP BY PREF ORDER BY MIN(ROWNO)", key);
        while (rows.isValidRow()) {
            iterator(rows);
	    rows.next();
        }
        rows.close();
    },
    loadShops : function(key, iterator){
        var db = Titanium.Database.open('mydb');
        var rows = db.execute("SELECT SHOPID, SHOPNAME FROM SHOPLIST WHERE PREF = ? ORDER BY ROWNO", key);
        while (rows.isValidRow()) {
            iterator(rows);
	    rows.next();
        }
        rows.close();
    },
    loadShop: function(key, iterator){
        var db = Titanium.Database.open('mydb');
        var rows = db.execute("SELECT SHOPNAME, ADDRESS, LAT, LNG, PHONE, TOAST, MORNING, MISC FROM SHOPLIST WHERE SHOPID = ?", key);
        if(rows.isValidRow()) {
            iterator(rows);
        }
        rows.close();
    }
};

