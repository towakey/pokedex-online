---
title: 連想配列を使って重複しないキーを取得する(Dictionary)
description: 
category: bat
---

```

@echo off

:LOOP

if "%~1"=="" (goto EOF)

rem echo "%~1"
rem echo "%~dp1%~nx1"
rem pause 


mkdir "%~dp1%~n1"

move "%~1" "%~dp1%~n1"


echo "%~n1"
echo "%~nx1"
rename "%~n1" "%~nx1"

shift
goto LOOP

:EOF

```