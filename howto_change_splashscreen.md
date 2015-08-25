# 起動時画像(スプラッシュスクリーン)の変更方法 #

参考文献：[HowTo: Changing the Splash Screen](http://www.codestrong.com/timobile/howto/change-the-splash-screen/)

プロジェクト生成時にも少し触れましたが、project/Resorces/iphoneフォルダにあるDefault.pngというファイルが起動時にされる画像になります。お好きな画像に差し替えると気分が変わりますし…そもそもブランディングの観点からも差替えないとだめだと思います(^^;

ちなみに画面中央部にはローディングインジケータが表示されるので干渉しないような画像にしておくと少し幸せになれると思いますよ。

![http://img.skitch.com/20090709-mh4nupgp213pn2se12fa6tpyn.jpg](http://img.skitch.com/20090709-mh4nupgp213pn2se12fa6tpyn.jpg)

ちなみにこのファイルを消すとどうなるのかというと、真っ暗な画面にローディングインジケータが表示されます。

一度でもデフォルトの画像がある状態でコンパイルしていると、/build/iPhone/Resources/Default.pngが残ってしまうので、意図的にこうしたい場合は削除する必要があります。

## iPadの場合 ##
project/Resorces/iphoneにDefault-Landscape.png, Default-Portrait.pngを用意することによりiPadの解像度に適した起動時画像に差し替わります。

ただし、Default.pngと異なり、ステータスバー分を差し引いたサイズである必要があるので注意してください。

|**ファイル名**|**タテ**|**ヨコ**|
|:--------|:-----|:-----|
|Default-Landscape.png|768   |1004  |
|Default-Portrait.png|1024  |748   |


---

本ドキュメントは [Creative Commons Attribution License, Version 3](http://creativecommons.org/licenses/by/3.0/deed.ja) に基づいて和訳・編集し、公開しています。
原著作者表示：[Appcelerator, Inc](http://www.appcelerator.com/)