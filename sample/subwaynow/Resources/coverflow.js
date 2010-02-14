$(function(){
    var url = 'http://search.twitter.com/search.json?q=%23subwayjp%20twitpic%20-RT';
    var xhr = Titanium.Network.createHTTPClient();
    xhr.open('GET', url);
    xhr.onload = function(){
	// JSONパースエラー対策のため、\nを振り落としています。
	var json = eval('(' + this.responseText.replace(/\\n/g, '') + ');');
	var images = [];
	var larges = [];
	$.each(json.results, function(i, v){
	    var picid = v.text;
	    picid = picid.replace(/.*(http\:\/\/twitpic\.com\/(\w+)).*/i, "$2");
	    if(i < 20){
		images.push('http://twitpic.com/show/thumb/' + picid);
		larges.push('http://twitpic.com/show/large/' + picid);
	    }
    	});

	var view = Titanium.UI.createCoverFlowView({
	    images:images,
	    backgroundColor:'#000'
	});
	view.addEventListener('click', function(e){
	    var largeview = Titanium.UI.currentWindow.getViewByName('large');
	    if(largeview == null){

		largeview = Titanium.UI.createWebView({url: larges[e.index], name:'large'});
		Titanium.UI.currentWindow.addView(largeview);
	    }
	    else{
		largeview.setURL(larges[e.index]);
	    }
	    
	    var b = Titanium.UI.createButton({
		systemButton:Titanium.UI.iPhone.SystemButton.CANCEL
	    });	
	    Titanium.UI.currentWindow.setLeftNavButton(b);
	    b.addEventListener('click', function(e){
		Titanium.UI.currentWindow.showView(view, {
		    animated:true,
		    animationStyle:Titanium.UI.iPhone.AnimationStyle.CURL_DOWN,
		    animationDuration:400
		}); 
		Titanium.UI.currentWindow.setTitle('Gallery of #subwayjp');
		Titanium.UI.currentWindow.setLeftNavButton(null);
	    });
 	    Titanium.UI.currentWindow.showView(largeview, {
		animated:true,
		animationStyle:Titanium.UI.iPhone.AnimationStyle.CURL_UP,
		animationDuration:200
	    }); 
	});
	Titanium.UI.currentWindow.addView(view);
	Titanium.UI.currentWindow.showView(view);	
    };
    xhr.send();
});