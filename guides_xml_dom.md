# APIカタログ(ユーティリティ編) - XML DOM Parser #
XMLドキュメントはHTTPClientのresponseXMLとして取得するか、Ti.XML.parseString(str)することでDOMオブジェクトとして操作することができます。

一般的なDOMオブジェクトとしての操作が可能です。

https://developer.mozilla.org/ja/Gecko_DOM_Reference

```
var xmlstr2 = "<?xml version=\"1.0\" encoding=\"utf-8\"?>"+
"<FooBarResponse>"+
"<FooBarResult>"+
"<ResponseStatus>"+
"<Status>"+
"<PassFail>Pass</PassFail>"+
"<ErrorCode />"+
"<MessageDetail />"+
"</Status>"+
"</ResponseStatus>"+
"<FooBar>true</FooBar>"+
"</FooBarResult>"+
"</FooBarResponse>";

var xml2 = Ti.XML.parseString(xmlstr2);

fooBarList = xml2.documentElement.getElementsByTagName("FooBar");
result = fooBarList!=null && fooBarList.length == 1 && fooBarList.item(0).text=="true";
result = result && fooBarList.item(0).nodeName=="FooBar";

if (xml2.evaluate) {
	// test XPath against Document
	result2 = xml2.evaluate("//FooBar/text()");
	result = result && result2.item(0).nodeValue == "true";
	
	// test XPath against Element
	result2 = xml2.documentElement.evaluate("//FooBar/text()");
	result = result && result2.item(0).text == "true";
	
	// test XPath against Element
	result2 = fooBarList.item(0).evaluate("text()");
	result = result && result2.item(0).text == "true";
} else {
	result = false;
}
```


## 関連するKitchenSinkソース ##
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/xml_dom.js
  * http://github.com/appcelerator/KitchenSink/blob/master/KitchenSink/Resources/examples/xml_rss.js

## 関連するAPIドキュメント ##
  * http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.XML-module
  * http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.XML.DOMDocument-object.html


---

原著作者表示：[Appcelerator, Inc](http://www.appcelerator.com/)