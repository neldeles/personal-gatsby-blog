---
date: 2020-09-21T23:00:00Z
tags: ["pandas", "django"]
title: "Reading uploaded CSV in Pandas using Django"
description: Open user-uploaded CSV in Pandas using Django.
published: true
---

```py
import pandas as pd
from ..models import InputCsv
  def calc_net():
      model = InputCsv
      qs = model.objects.filter(attempted_for_processing=False)
      for object in qs:
        df = pd.read_csv(object.csv.path)
        print(df)
        print(df.columns)
        df["net_profit"] = df["bought"] - df["sold"]
        object.output_csv = df.to_csv("output.csv")
        object.save()
  calc_net()
```

Sources:

- [https://stackoverflow.com/questions/47316478/django-read-uploaded-csv-file-using-filefield-instance](https://stackoverflow.com/questions/47316478/django-read-uploaded-csv-file-using-filefield-instance "https://stackoverflow.com/questions/47316478/django-read-uploaded-csv-file-using-filefield-instance")
- [https://stackoverflow.com/questions/5769678/django-accessing-model-attributes](https://stackoverflow.com/questions/5769678/django-accessing-model-attributes "https://stackoverflow.com/questions/5769678/django-accessing-model-attributes")
