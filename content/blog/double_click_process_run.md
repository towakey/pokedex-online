---
title: 特定のセルをダブルクリックした時だけ処理を実行する
description: 設定した特性のセルをダブルクリックした時だけ処理を実行する
category: VBA
---
```vb
Private Sub Worksheet_BeforeDoubleClick(ByVal Target As Range, Cancel As Boolean)

    ' ダブルクリックしたセルがB3からB101の間かチェックする
    If Target.Column = 2 And Target.Row >= 3 And Target.Row <= 101 Then
    
        ' ダブルクリックしたセルの値をB1にコピーする
        Cells(1, 2).Value = Target.Value
    End If

End Sub
```