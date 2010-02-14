$(function(){
    // アプリケーション設定から既存情報を取得する。
    var username = Titanium.App.Properties.getString("tw_username");
    var password = Titanium.App.Properties.getString("tw_password");

    //--------------------------------------------------------------------------
    //  UI定義
    //--------------------------------------------------------------------------

    // 店舗情報
    var buttonSection = Titanium.UI.iPhone.createGroupedSection({
	header:'店舗情報',
	footer:'作成されていないと表示できません。',
	type:'button',
	data:[
	    {title:'データベース再作成'}
	]
    });
    buttonSection.addEventListener('click', function(e){
	// Google Spreadsheets上に書いたサンプルデータベースをCSVデータとして取り込む例です。
	// (セル内で改行したり,のあるデータを入れるとダメという簡易処理しかしてません)
	var url = 'http://spreadsheets.google.com/pub?key=tVnz_5BvJQBxbt9IUMdQqBw&single=true&gid=0&output=csv';
	$.get(url, function(data){
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
	    $.each(data.split(/\n/), function(i, v){
		if(i > 0){
		    var field = v.split(",");
		    db.execute('INSERT INTO SHOPLIST VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
			       field[0], field[1], field[2], field[3], field[4], 
			       field[5], field[6], field[7], field[8], field[9], 
			       field[10], field[11]);
		}
	    });
	});
    });
    
    // 認証情報のID/PWテキストフィールド,認証ボタン
    var tfTwitterID = Titanium.UI.createTextField({
        value:username,
        color:'#336699',
        backgroundColor:'#eeeeee',
        enableReturnKey:false,
        autocorrect:false,
        textAlign:'left',
	keyboardType:Titanium.UI.KEYBOARD_EMAIL_ADDRESS,
	returnKeyType: Titanium.UI.RETURNKEY_DONE,
        borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        clearButtonMode:Titanium.UI.INPUT_BUTTONMODE_ALWAYS,
	width:200,
        height:30
    });
    var tfTwitterPW = Titanium.UI.createTextField({
        value:password,
        color:'#336699',
        backgroundColor:'#eeeeee',
        enableReturnKey:false,
        autocorrect:false,
        textAlign:'left',
	passwordMask:true,
	keyboardType:Titanium.UI.KEYBOARD_EMAIL_ASCII,
	returnKeyType: Titanium.UI.RETURNKEY_DONE,
        borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        clearButtonMode:Titanium.UI.INPUT_BUTTONMODE_ALWAYS,
	width:200,
        height:30
    });
    var btAuth    = Titanium.UI.createButton({
	title : '認証＆保存',
	width:200,
        height:30
    });
    btAuth.addEventListener('click', function(){
	var username = tfTwitterID.value;
	var password = tfTwitterPW.value;
	var httpexec = function(url, method, param, loadEventHandler, errorEventHandler){
	    var xhr = Titanium.Network.createHTTPClient();
	    if(loadEventHandler != null){
		xhr.onload = function(){
		    loadEventHandler(this.responseText, this.status);
		};
	    }
	    if(errorEventHandler != null){
		xhr.onerror = function(){
		    errorEventHandler(this.responseText, this.status);
		};
	    }
	    xhr.open(method, url);
	    xhr.send(param);
	};
	if (username === '' || password === '') {
	    var dialog = Titanium.UI.createAlertDialog({
 		title: 'エラー',
 		message: 'IDとパスワードを入力してください。'
	    });
	    dialog.show();
	    return;
	}
	var url = "https://" + username + ":" + password + "@twitter.com/account/verify_credentials.json";
	httpexec(url, 'GET', null, function(data, status){
	    var json = eval('(' + data + ')');
	    var dialog = null;
	    if(json.error != null){
		dialog = Titanium.UI.createAlertDialog({
 		    title: 'エラー',
 		    message: 'IDかパスワードのいずれかが間違えています。'
		});
	    }
	    else{
		Titanium.App.Properties.setString("tw_username", username);
		Titanium.App.Properties.setString("tw_password", password);
		dialog = Titanium.UI.createAlertDialog({
 		    title: '認証完了',
 		    message: 'IDとパスワードを保存しました。'
		});
	    }
	    dialog.show();
	});
    });
    // 入力セクション（認証情報）
    var inputSection1 = Titanium.UI.iPhone.createGroupedSection({
	header:'Twitterアカウント',
	type:'input',
	data:[
	    {title:'ID', input:tfTwitterID},
	    {title:'PW', input:tfTwitterPW},
	    {input:btAuth}
	]
    });

    /*
    var inputSection2 = Titanium.UI.iPhone.createGroupedSection({
	header:'タイムラインの検索設定',
	type:'input',
	data:[
	    {title:'検索語', input:tfHashtag}
	]
    });
    var optionSection = Titanium.UI.iPhone.createGroupedSection({
	header: 'タイムラインの件数',
	type:   'option',
	data:[
	    {title:'25件', selected:true},
	    {title:'50件'},
	    {title:'100件'}  
	]
    });
    optionSection.addEventListener('click',function(e){
	alert(e.index);
    });
    */

    var groupedView = Titanium.UI.iPhone.createGroupedView();
    groupedView.addSection(buttonSection);
    groupedView.addSection(inputSection1);
    Titanium.UI.currentWindow.addView(groupedView);
    Titanium.UI.currentWindow.showView(groupedView);

    // create a DONE button
    var btnDone = Titanium.UI.createButton({
	title:'Done',
	style:Titanium.UI.iPhone.SystemButtonStyle.DONE
    });
    btnDone.addEventListener('click', function(){
	$.each([tfHashtag, tfTwitterID, tfTwitterPW], function(i,v){
	    v.blur();
	});
    });
    Titanium.UI.currentWindow.setRightNavButton(btnDone);
    Titanium.UI.currentWindow.setTitle('設定');
});