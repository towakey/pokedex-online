---
title: ログを出力するモジュール
description: ファイル名とログ内容を引数と渡してログ出力する関数
category: python
---
```python
# -*- coding: utf-8 -*-

import os
import datetime

mypath = os.getcwd()

def add(filename, text):
    """
    指定されたファイルにテキストを追記します。ファイルが存在しない場合は作成します。

    Args:
        filename: ファイル名 (文字列)。
        text: 追記するテキスト (文字列)。
    """
    filefullname = mypath+"/log/"+filename+".log"
    try:
        with open(filefullname, "a", encoding="utf-8") as f:  # "a" モードで開く
            f.write("["+datetime.datetime.now().strftime("%Y/%m/%d %H:%M:%S")+"]\n")
            f.write(text+"\n")
        # print(f"テキストを {filename} に追記しました。")

    except Exception as e:
        print(f"エラーが発生しました: {e}")
```