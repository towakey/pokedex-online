---
title: ある小数点桁の数字を取得
description: 
category: VBA
---

```

num=0.123456789
'小数点一桁
dec_set=1
result = val(Mid(Abs(num - Fix(num)), dec_set + 2, 1))

'指数表示を解除して取得する
num=0.123456789
'小数点一桁
dec_set=1
result = val(Mid(Format(Abs(num - Fix(num)), "0.0000000000000000"), dec_set + 2, 1))

```
