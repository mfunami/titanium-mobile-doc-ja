//--------------------------------------
// 共通処理読込
//--------------------------------------
// twitter関連/ＤＢの共通処理を取り込みます。
Titanium.include('twlib.js', 'shopdb.js');

//--------------------------------------
// 変数定義部
//--------------------------------------
// アプリケーション設定から既存情報を取得する。
var username = Titanium.App.Properties.getString("tw_username");
var password = Titanium.App.Properties.getString("tw_password");

//--------------------------------------
// UI定義部
//--------------------------------------
var sections = [
    Ti.UI.createTableViewSection({
        headerTitle:'Twitterアカウント'
    }),
    Ti.UI.createTableViewSection({
        headerTitle:'店舗情報',
        footerTitle:'作成されていないと表示できません'
    })
];
var btnCreateShopList = Ti.UI.createButton({
    title:'データベース再作成',
    left:0,
    top:0,
    width:300
});

// 認証情報のID/PWテキストフィールド,認証ボタン
var tfTwitterID = Titanium.UI.createTextField({
    value: username,
    color:'#336699',
    backgroundColor:'#eeeeee',
    enableReturnKey:false,
    autocorrect:false,
    textAlign:'left',
    hintText:'ログインIDを入力してください',
    keyboardType:Titanium.UI.KEYBOARD_EMAIL_ADDRESS,
    returnKeyType: Titanium.UI.RETURNKEY_DONE,
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
    clearButtonMode:Titanium.UI.INPUT_BUTTONMODE_ALWAYS,
    width:300,
    height:30,
    right:0
});
var tfTwitterPW = Titanium.UI.createTextField({
    value: password,
    color:'#336699',
    backgroundColor:'#eeeeee',
    enableReturnKey:false,
    autocorrect:false,
    textAlign:'left',
    passwordMask:true,
    hintText:'パスワードを入力してください',    
    keyboardType:Titanium.UI.KEYBOARD_EMAIL_ASCII,
    returnKeyType: Titanium.UI.RETURNKEY_DONE,
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
    clearButtonMode:Titanium.UI.INPUT_BUTTONMODE_ALWAYS,
    width:300,
    height:30,
    right:0
});
var btnAuth    = Titanium.UI.createButton({
    title : '認証＆保存',
    width:300,
    height:30
});

var row00 = Ti.UI.createTableViewRow({height:'auto'});
row00.add(btnCreateShopList);
sections[1].add(row00);

var row10 = Ti.UI.createTableViewRow({height:'auto'});
var row11 = Ti.UI.createTableViewRow({height:'auto'});
var row12 = Ti.UI.createTableViewRow({height:'auto'});
row10.add(Ti.UI.createLabel({left:40, top:5, text:'ID'}));
row10.add(tfTwitterID);
row11.add(Ti.UI.createLabel({left:40, top:5, text:'PW'}));
row11.add(tfTwitterPW);
row12.add(btnAuth);
sections[0].add(row10);
sections[0].add(row11);
sections[0].add(row12);
var tableView = Ti.UI.createTableView({
    data: sections,
    style: Ti.UI.iPhone.TableViewStyle.GROUPED,
    headerTitle:'　',
    footerTitle:'　'
});
Ti.UI.currentWindow.add(tableView);    

var actInd = Titanium.UI.createActivityIndicator({
    bottom:10, 
    height:50,
    width:10,
    style:Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN
});
Ti.UI.currentWindow.add(actInd);

//--------------------------------------
// イベントハンドラ定義部
//--------------------------------------
btnCreateShopList.addEventListener('click', function(e){
    actInd.style = Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN;
    actInd.font = {fontFamily:'Helvetica Neue', fontSize:15,fontWeight:'bold'};
    actInd.color = 'white';
    actInd.message = 'Loading...';
    actInd.width = 210;
    actInd.show();
    // Google Spreadsheets上に書いたサンプルデータベースを
    // CSVデータとして取り込む例です。
    // (セル内で改行したり","のあるデータを入れるとダメ...
    //  という簡易処理しかしてません)    
    var xhr = Titanium.Network.createHTTPClient();
    xhr.onload = function(){
        shopdb.recreateFromCSV(this.responseText);
        actInd.hide();
    };
    xhr.open('GET', 'http://spreadsheets.google.com/pub?key=tVnz_5BvJQBxbt9IUMdQqBw&single=true&gid=0&output=csv');
    xhr.send();
});

btnAuth.addEventListener('click', function(e){
    var username = tfTwitterID.value;
    var password = tfTwitterPW.value;
    if (username === '' || password === '') {
	var dialog = Titanium.UI.createAlertDialog({
 	    title: 'エラー',
 	    message: 'IDとパスワードを入力してください。'
	});
	dialog.show();
	return;
    }
    twitter.verify_credentials(username, password, function(){
	Titanium.App.Properties.setString("tw_username", username);
	Titanium.App.Properties.setString("tw_password", password);
        Titanium.UI.createAlertDialog({
 	    title: '認証完了',
 	    message: 'IDとパスワードを保存しました。'
	}).show();
    },function(){
        Titanium.UI.createAlertDialog({
 	    title: 'エラー',
 	    message: 'IDかパスワードのいずれかが間違えています。'
	}).show();
    });
});
