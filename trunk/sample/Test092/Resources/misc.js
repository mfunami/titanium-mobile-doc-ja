// 西暦を10で割った時の剰余で恵方が決まる
var ehodb = [
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
var eho  = ehodb[(2000 + ((new Date()).getYear() % 100)) % 10];


//--------------------------------------
// UI定義部
//--------------------------------------
var win = Titanium.UI.currentWindow;
var ehoView = Ti.UI.createView();
var aboutView = Ti.UI.createView();
var scrollView = Titanium.UI.createScrollableView({
    views:[ehoView, aboutView],
    showPagingControl:true,
    pagingControlHeight:30,
    maxZoomScale:2.0
});
var labelCompassName = Ti.UI.createLabel({
    top:60,
    height:30,
    width:240,    
    textAlign:'center',
    text : '今年の恵方は' + eho.compassName
});
ehoView.add(labelCompassName);
var labelDirection = Ti.UI.createLabel({
    top: 120,
    height:30,
    width:240,
    textAlign:'center',
    text : ''
});
ehoView.add(labelDirection);
var buttonAbout = Ti.UI.createButton({
    title: '恵方サブについて',
    height: 32,
    width: 200,
    top: 200
});
ehoView.add(buttonAbout);
var labelAbout1 = Ti.UI.createLabel({
    top: 60,
    height:32,
    width: 300,
    text: 'Titanium Mobile 0.9.1 Sample Application'
});
var labelAbout2 = Ti.UI.createLabel({
    top: 120,
    height:32,
    width: 300,
    textAlign:'center',
    text: 'Created by @donayama'
});
var buttonAuthor = Ti.UI.createButton({
    top: 200,
    width:180,
    height:32,
    title: 'Twitterで連絡する'
});
aboutView.add(labelAbout1);
aboutView.add(labelAbout2);
aboutView.add(buttonAuthor);
win.add(scrollView);
win.title = '恵方サブ支援';

//--------------------------------------
// イベントハンドラ部
//--------------------------------------
// コンパス機能がついていれば恵方チェックを行います。
if (Titanium.Geolocation.hasCompass){
    Titanium.Geolocation.addEventListener('heading', function(e){
        var p = 0 + eho.compass - eval(e.heading.trueHeading);
        if(p > -3 && p < 3){
            labelDirection.text = 'だいたい合ってる';
        }
        else if(p < -3){
            labelDirection.text = '左旋回しる';
        }
        else{
            labelDirection.text = '右旋回しる';
        }
    });
}
buttonAbout.addEventListener('click', function(){
    Titanium.Platform.openURL('http://www.831lab.com/ehouSub.html');
});
buttonAuthor.addEventListener('click', function(){
    Titanium.Platform.openURL('http://twitter.com/donayama/');
});
scrollView.addEventListener('scroll', function(e){
    if(e.currentPage == 0){
        win.title = '恵方サブ支援';
    }
    else{
        win.title = 'About';
    }
});