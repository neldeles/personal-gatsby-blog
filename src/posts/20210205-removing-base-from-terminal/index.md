---
date: 2021-02-05T23:00:00Z
tags: ["conda"]
title: "Removing base from Terminal"
published: true
---

By default, `auto_activate_base` is set to `True` when installing anaconda. To check this, run:

    $ conda config --show | grep auto_activate_base
    auto_activate_base: True

To set it `False`

    conda config --set auto_activate_base False

and vice-versa.

Note, if `changeps1` is kept `False`, it will hide `(env)` completely, and in case you want to show `(env)` only when it's activated, you can set `changeps1` to `True`:

    conda config --set changeps1 True

> Setting `changeps1` to `False` will hide `(env)` even if the `env` is activated and will keep hiding `(base)` even after `auto_activate_base` is set to `True`.

Source: [https://stackoverflow.com/questions/55171696/how-to-remove-base-from-terminal-prompt-after-updating-conda](https://stackoverflow.com/questions/55171696/how-to-remove-base-from-terminal-prompt-after-updating-conda "https://stackoverflow.com/questions/55171696/how-to-remove-base-from-terminal-prompt-after-updating-conda")
