---
title: 折れ線グラフ作成テンプレート
description: 単純な折れ線グラフをマクロで作成するテンプレート
category: VBA
---
```vb
Sub createGraph()

    Dim title
    title = "タイトル"

    Dim chartObj As ChartObject

    Set chartObj = ChartObjects.Add(Left:=0, Top:=0, Width:=900, Height:=500)

    chartObj.Chart.HasTitle = True
    chartObj.Chart.ChartTitle.Text = title

    Dim rngX As Range, rngY As Range
        
    chartObj.Chart.ChartType = xlLine

    Set rngX = Range(Cells(2, 3), Cells(2, 33))
    Set rngY = Range(Cells(3, 3), Cells(3, 33))

    With chartObj.Chart.SeriesCollection.NewSeries
        .XValues = rngX
        .Values = rngY
        .Name = "系列1"
    End With

End Sub
```