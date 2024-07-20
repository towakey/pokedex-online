---
title: 指定したフォルダ内にあるテキストファイルをスクリプトと同じファイルにまとめるスクリプト
description: 指定したフォルダ内にあるファイルを読み込み、実行スクリプトと同じ階層にファイルを作成し、その中にテキストファイルの中身を書き込むスクリプト
category: ruby
---
```ruby
require 'fileutils'

# テキストファイルのリストを作成する
files = Dir.glob("scripts/*.txt")

# テキストファイルごとに処理する
files.each do |file|

  # テキストファイルを開く
  f = File.open(file)

  # テキストファイルのタイトルを取得する
  #   title = f.readline.strip
  title = file

  # テキストファイルの内容を取得する
  content = f.read.strip

  # テキストファイルの内容をテキストファイルに書き込む
  File.open("texts.txt", "a") do |f|
    f.puts "Title: #{title}"
    f.puts "Content: #{content}"
    f.puts
  end

  f.close
end
```