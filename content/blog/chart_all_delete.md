---
title: シート内のチャートを全削除
description: シート内にあるチャートオブジェクトをすべて削除するマクロ
category: VBA
---

```vb
Sub DeleteAllCharts()
    Dim chtObj As ChartObject
    For Each chtObj In graphSheet.ChartObjects
        chtObj.Delete
    Next chtObj
End Sub
```