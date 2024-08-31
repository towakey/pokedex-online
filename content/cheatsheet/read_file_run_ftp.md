---
title: batファイルでコマンドを記述したファイルを読み取りFTPを実行する
description: 
category: bat
---

send.bat
```

@echo off
set SCRIPT_FILE=send.txt

ftp -s:%SCRIPT_FILE%

```

send.txt
```

open ftp_server
user
password
binary
cd www

put /from/file/test.zip /to/file/test.zip

quit


```
