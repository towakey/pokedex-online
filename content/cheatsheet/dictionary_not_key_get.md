---
title: 連想配列を使って重複しないキーを取得する(Dictionary)
description: 
category: VBA
---

```

Dim i
Dim dict As Object
Set dict = CreateObject("Scripting.Dictionary")
For i = 2 To Cells(Rows.Count, 1).End(xlUp).row
    If dict.exists(Cells(i, 1).Value) = False Then
        dict.Add Cells(i, 1).Value, ""
    End If
Next i


```