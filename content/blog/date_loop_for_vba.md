---
title: 二つの日付の差だけ処理を繰り返す
description: 二つの日付の差の分だけ処理を繰り返すテンプレート
slug: 二つの日付の差だけ処理を繰り返す
category: VBA
---
```vb
start_date = ThisWorkbook.Worksheets("Sheet1").Cells(1, 1).Value
end_date = ThisWorkbook.Worksheets("Sheet1").Cells(1, 2).Value

Dim diff
diff = DateDiff("d", start_date, end_date)

For i = 0 To diff
  ' ここに処理を書く
Next i
```