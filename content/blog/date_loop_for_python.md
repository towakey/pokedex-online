---
title: 日付でループするサンプル
category: python
---


```python
import datetime

# 参考
# https://qiita.com/ground0state/items/508e479335d82728ef91
def date_range(start, stop, step = datetime.timedelta(1)):
    current = start
    while current <= stop:
        yield current
        current += step

start_date = datetime.datetime.strptime("1996-02-27 00:00:00", "%Y-%m-%d %H:%M:%S")
end_date = datetime.datetime.strptime("2024-04-01 00:00:00", "%Y-%m-%d %H:%M:%S")
for data in date_range(start_date,end_date):
    print(data)
```