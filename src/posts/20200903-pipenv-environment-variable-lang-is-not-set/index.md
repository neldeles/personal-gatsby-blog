---
date: 2020-09-03T11:00:00Z
tags: ["python"]
title: "Pipenv environment variable LANG is not set!"
published: true
---

When running `pipenv install` this error would pop up:

```bash
Warning: the environment variable LANG is not set!
```

My terminal is still on bash, so I had to edit the `bash_profile` file:

```bash
$sudo nano \~/.bashprofile
```

Next is to add the following to it:

```bash
export LANG="en_US.UTF-8"
export LC_ALL="en_US.UTF-8"
export LC_CTYPE="en_US.UTF-8"
```

Then I reloaded the bash profile with: `source ~/.bash_profile`

Source: https://stackoverflow.com/questions/49436922/getting-error-while-trying-to-run-this-command-pipenv-install-requests-in-ma
