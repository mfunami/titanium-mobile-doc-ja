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

var win = Titanium.UI.currentWindow;
var view = Ti.UI.createView();
var labelCompassName = Ti.UI.createLabel({
    top:60,
    text : '今年の恵方は' + eho.compassName
});
view.add(labelCompassName);

var labelDirection = Ti.UI.createLabel({
    top: 180,
    text : ''
});
view.add(labelDirection);

var buttonAbout = Ti.UI.createButton({
    title: '恵方サブについて',
    height: 32,
    width: 200,
    top: 300
});
buttonAbout.addEventListener('click', function(){
    Titanium.Platform.openURL('http://www.831lab.com/ehouSub.html');
});
view.add(buttonAbout);

win.add(view);
win.title = '恵方サブ支援';

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
