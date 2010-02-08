/*
 * 参考資料
 * http://www.benricho.org/nenrei/sei-wa-conv.html
 * https://center.umin.ac.jp/cgi-open-bin/nengou.cgi/
 */
window.onload = function(){

    // 西暦年を１２で割った時の剰余は 4が子年
    var eto = ['申', '酉 ', '戌', '亥', '子', '丑',
               '寅', '卯', '辰', '巳', '午', '未'];
    var dataJPYear = [
	{name: '明治', from: 1868 , max: 45, magic :67},
	{name: '大正', from: 1912 , max: 15, magic :11},
	{name: '昭和', from: 1926 , max: 64, magic :25},
	{name: '平成', from: 1989 , max: 99, magic :88}
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
    var lastSelectedValue0 = 3;
    picker.addEventListener('change', function(e){	
	if(lastSelectedValue0 != e.selectedValue[0]){
	    lastSelectedValue0 = e.selectedValue[0];
	    picker.setColumnData(1, generateYears(dataJPYear[e.selectedValue[0]].max));	
	}
	var yyyy = dataJPYear[e.selectedValue[0]].from + e.selectedValue[1];
	$('#result').html('西暦 ' +  yyyy + '年 (' + eto[yyyy % 12] + ')');
   });
};