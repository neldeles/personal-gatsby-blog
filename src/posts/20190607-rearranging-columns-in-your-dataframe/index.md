---
date: "2019-06-07T12:00:00+00:00"
tags: ["Pandas"]
title: "Re-arranging Columns in your Dataframe"
published: true
description: How to re-arrange the columns in your Dataframe
---

1. Print out the column labels of your Dataframe `print(df.columns())`
2. Copy the printed list and re-arrange as you like. Store it in a var `foo`. For example, my columns are: ` ['shipper_id',``_shipper' 'period'] ` and I will re-arrange it to: `foo = ['shipper_id','period','shipper']`
3. Replace it in your df: `df = df[foo]`
