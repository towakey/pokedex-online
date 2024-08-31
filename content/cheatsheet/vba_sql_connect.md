---
title: VBAでSQLに接続してデータを読み込む
description: 
category: VBA
---

```

Const DB_HOST As String = "HOST"
Const DB_NAME As String = "NAME"
Const DB_USER As String = "USER"
Const DB_PASS As String = "PASS"
Const DB_PORT As String = "5432"

Dim cnn As Object
Dim rs As Object
Set cnn = CreateObject("ADODB.Connection")
Set rs = CreateObject("ADODB.Recordset")

cnn.Open "Provider=MSDASQL;Driver=PostgreSQL Unicode;UID=postgres;port=" & DB_PORT & ";Server=" & DB_HOST & ";Database=" & DB_NAME & ";PWD=" & DB_PASS & ";"

Dim sql
sql = "ここにSQLを記述"

rs.Open sql, cnn, adOpenForwardOnly, adLockReadOnly

'列数を取得
Dim cnt
cnt = rs.Fields.Count
Dim i
'取得したデータを1行ずつ追記していく
Do Until rs.EOF
    For i = 0 To cnt - 1
        Cells(rcnt, i + 1).Value = RTrim(rs.Fields(i))
    Next i
    rs.MoveNext
Loop
rs.Close

Set rs = Nothing
Set cnn = Nothing

```