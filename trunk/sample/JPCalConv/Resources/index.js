/*
 * 参考資料
 * http://www.benricho.org/nenrei/sei-wa-conv.html
 * https://center.umin.ac.jp/cgi-open-bin/nengou.cgi/
 */
window.onload = function(){
    // 西暦年を１２で割った時の剰余は 4が子年
    var eto = ['申', '酉 ', '戌', '亥', '子', '丑',
               '寅', '卯', '辰', '巳', '午', '未'];
    // 西暦を10で割った時の剰余で恵方が決まる
    var eho = [
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
    var dataJPYear = [
	{name: '明治', from: 1868 , max: 45},
	{name: '大正', from: 1912 , max: 15},
	{name: '昭和', from: 1926 , max: 64},
	{name: '平成', from: 1989 , max: 99}
    ];
    var columnJPYear = {width:80, data:[
	{title: '明治'},
	{title: '大正'},
	{title: '昭和'},
	{title: '平成', selected: true}
      ]};
    var generateYears = function(maxYear){
	var answer = [{html: '<div>元年</div>', selected: true}];
	for(var i = 2; i <= maxYear; i++){
	    answer.push({html: '<div>' + i + '年</div>'});
	}
	return answer;
    };
    var columnYear = {width: 100, data: generateYears(99)};
 
    var data = [];
    data.push(columnJPYear);
    data.push(columnYear);
 
    var picker = Titanium.UI.createPicker({
	id:'picker',
	data:data,
	selectionIndicator:true
    });
    var lastSelectedValue0 = -1;
    var eho_compass = 0;
    picker.addEventListener('change', function(e){	
	if(lastSelectedValue0 != e.selectedValue[0]){
	    lastSelectedValue0 = e.selectedValue[0];
	    picker.setColumnData(1, generateYears(dataJPYear[e.selectedValue[0]].max));	
	}
	var yyyy = dataJPYear[e.selectedValue[0]].from + e.selectedValue[1];
	$('#result').html('西暦 ' +  yyyy + '年 (' + eho[yyyy % 10].name + eto[yyyy % 12] + ')');
	$('#eho').html(eho[yyyy % 10].compassName);
	eho_compass = eho[yyyy % 10].compass;
    });

    // 今年にフォーカス!!
    picker.selectRow((2000 + ((new Date()).getYear() % 100) - dataJPYear[3].from), 1, {animated:true});

    // コンパス機能がついていれば恵方チェックを行います。
    if (Titanium.Geolocation.hasCompass){
	Titanium.Geolocation.watchHeading(
	    function(pos){
		var x = 0 + eho_compass - eval(pos.trueHeading);
		if(x > -3 && x < 3){
		    $('#direction').html('だいたい合ってる');
		}
		else if(x < -3){
		    $('#direction').html('左回転しる');		    
		}
		else{
		    $('#direction').html('右回転しる');
		}
	    },
	    function(e){
	    }
	);   
    }
};