---
title: Bundlerの基礎
description: 
category: ruby
---
任意のフォルダに初期化コマンド。
実行後Gemfileが作成される。
```
bundler init
```

作成されたGemfileに必要なgemファイルを追加する。
```
# gem "rails"
gem "dxruby","1.4.7"    # dxrubyというgemのver1.4.7を指定

```

Gemfileに追加したgemをインストールする
```
bundle install --path vendor/bundle
```

bundle installしたgemファイルをrequireで読み込む
```
require "bundler/setup"
require "dxruby"
```

実行
```
bundle exec ruby main.rb
```
