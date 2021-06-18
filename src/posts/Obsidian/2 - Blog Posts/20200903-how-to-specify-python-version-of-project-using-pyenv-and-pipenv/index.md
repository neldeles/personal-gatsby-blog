---
date: 2020-09-03T14:00:00Z
tags: ["django"]
title: "How to specify Python version of project using PyEnv and Pipenv"
published: true
description: Title is self-explanatory.
---

I'm now trying to use Pipenv instead of Conda for my Django projects, as it's better suited for Web Development. One roadblock I've come across is how to specify the Python version of the virtual environment. In Conda it's straightforward, I just need to `conda create -n my_project python=3.8.0`.

I thought it was as straightforward for Pipenv. I tried `pipenv install --python 3.8.0` but it spat out the error: `ERROR: Could not find a version that satisfies the requirement python`

The answer [here](https://stackoverflow.com/a/53801331/3626340) sparked the light bulb moment. I needed a way to install and manage multiple versions of Python in my system, such that pipenv can reference that version of Python. Enter PyEnv.

I installed via the ff:

```bash
$ git clone https://github.com/pyenv/pyenv.git ~/.pyenv
$ echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bash_profile
$ echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bash_profile
$ echo -e 'if command -v pyenv 1>/dev/null 2>&1; then\n  eval "$(pyenv init -)"\nfi' >> bash_profile
# check if it's installed
$ pyenv
$ pyenv install 3.8.0
# check versions installed
$ pyenv versions
```

Next is to use that Python version for my pipenv project. [This](https://hackernoon.com/reaching-python-development-nirvana-bb5692adf30c) helped me in figuring that out.

```bash
# navigate to project folder
$ cd project
# check current python version
$ python --version
# install python to the directory so that when you
# navigate to it it will use the python 3.8.0 interpeter
$ pyenv local 3.8.0
$ python --version
$ pipenv install django~=3.1.0
```

Additional source: [https://dev.to/writingcode/the-python-virtual-environment-with-pyenv-pipenv-3mlo](https://dev.to/writingcode/the-python-virtual-environment-with-pyenv-pipenv-3mlo)
