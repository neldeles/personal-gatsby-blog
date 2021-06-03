---
date: 2019-11-12T16:00:00Z
tags: ["google colab", "tools", "data science"]
title: "Import your own custom modules in Google Colab"
description: Google Colab is great. But you do have to wrap your head around how it handles "local files".
published: true
---

```python
# first mount your gdrive
from google.colab import drive
drive.mount('/gdrive')

# next, add the location of the file to the path:
import sys
sys.path.append('/content/drive/My Drive')

# you can then import as usual
from module_name import some_class_or_function
```

Source: comment section of [url](https://www.pingshiuanchua.com/blog/post/importing-your-own-python-module-or-python-file-in-colaboratory)
