---
title: 列のアルファベットを取得する
description: 列のアルファベットを取得する
category: VBA
---
```vb
MsgBox Split(ThisWorkbook.Worksheets("Sheet1").Cells(1, 100).Address, "$")(1)
```