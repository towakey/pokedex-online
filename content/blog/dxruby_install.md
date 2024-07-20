---
title: DXRubyの導入
description: Windows10でのDXRubyの導入方法
category: ruby
---
# Rubyのインストール
2021年に公開されたv1.4.7から64bit対応がなされました。
しかしRubyの一部のバージョンでしか動作しないようです。
v3の場合v3.0.0でしか動作しませんでした。
http://blawat2015.no-ip.com/~mieki256/diary/202108132.html

下記から3.0.0をインストールする
https://rubyinstaller.org/downloads/archives/

# dxrubyをインストール
```
gem install dxruby
```

# d3dx9_40.dllの追加
Windows10からはこのDLLを追加しないとDXRubyは動かないらしいです。
下記からダウンロード。
https://www.microsoft.com/en-us/download/details.aspx?id=8109
解凍後、下記のcabファイルをダブルクリックして開く。
64bit:Nov2008_d3dx9_40_x64.cab
32bit:Nov2008_d3dx9_40_x86.cab

その中にあるd3dx9_40.dllをコピー。
その後Rubyのbinフォルダにペースト。

※Windowsのシステムフォルダに追加する必要があるのかはいまいち不明。
64bit:C:\Windows\System32へペースト
32bit:C:\Windows\SysWOW64へペースト


# 動作確認
下記をファイルに保存して動作確認
```ruby
require 'dxruby'

Window.loop do
end
```
