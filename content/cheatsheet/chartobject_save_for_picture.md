---
title: 指定したチャートオブジェクトを画像として保存する
description: 指定したチャートオブジェクトをブックと同じ場所に保存するマクロ
category: VBA
---
```vb
Sub chartImageSave()
    Dim title
    title = "test"

    Dim chartObj As ChartObject
    Set chartObj = ChartObjects(title)
        
    Dim n As Date
    n = now

    ' グラフを画像として保存する
    Dim img As Image
    chartObj.Chart.Export (ThisWorkbook.Path & "\" & title & "_" & Format(n, "yyyymmddhhmmss") & ".png")
End Sub
```