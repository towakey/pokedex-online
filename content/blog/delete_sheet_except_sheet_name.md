---
title: 指定したシート名以外のシートを削除する
description: ブック内の、あらかじめ指定したシート名以外のシートを削除するマクロ
category: VBA
---
```vb
Sub sheetDelete()
    Dim wsArray()
    Dim ws
    Dim flg
    Dim sys

    wsArray = Array("main", "history")
    For Each ws In Worksheets
        flg = True
        For Each sys In wsArray
            If ws.name = sys Then
                flg = False
            End If
        Next sys
        If flg Then
            'MsgBox ws.name & ":削除"
            ws.Delete
        End If
    Next ws
End Sub
```