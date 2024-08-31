---
title: フルアドレスからファイル名を取り出す
description: 
category: VBA
---

```

fulladdress="C:\work\sample.txt"
splt=split(fulladdress,"\")
msgbox splt(ubound(splt))


```
