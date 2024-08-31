---
title: マクロ高速化対策
description: 
category: VBA
---

```

'画面の更新を停止
Application.ScreenUpdating = False
'再計算を停止
Application.Calculation = xlCalculationManual

'～～～ここに処理～～～

Application.Calculation = xlCalculationAutomatic
Application.ScreenUpdating = True

```
