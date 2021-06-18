---
date: 2020-09-02T16:00:00Z
tags: ["python", "osx", "pipenv"]
title: "Troubleshooting Pipenv Install on OSX"
description: User installation of pipenv.
published: true
---

I was able to successfully install pip env via `pip3 install --user pipenv.`

However, when I run the command pipenv install in a fresh root project directory I receive the following message: `-bash: pipenv: command not found.`

To fix, need to follow the official instructions found [here](https://pipenv.pypa.io/en/latest/install/#installing-pipenv).

The exact commands I used were:

    PYTHON_BIN_PATH="$(python3 -m site --user-base)/bin"
    PATH="$PATH:$PYTHON_BIN_PATH"

However, you will need to always run those commands whenever opening a new Terminal window. To make the change permanent, you can add the path to `/etc/paths`.

First, identify the path via: `python3 -m site --user-base`. Then append `/bin` to that path. This is the path you will add to the `/etc/paths` file.

Proceed w the following steps as found [here](https://www.architectryan.com/2012/10/02/add-to-the-path-on-mac-os-x-mountain-lion/#.Uydjga1dXDg):

- Open up Terminal.
- Run the following command:

      sudo nano /etc/paths

- Enter your password, when prompted.
- Go to the bottom of the file, and enter the path you wish to add.
- Hit control-x to quit.
- Enter “Y” to save the modified buffer.
- That’s it! To test it, in _new_ terminal window, type:

      echo $PATH

You should see something similar to this (including the path you’ve added!):

    MacMini:~ ryan$ echo $PATH
    /usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin:/usr/local/share/npm/bin

Sources:

[https://stackoverflow.com/questions/46391721/pipenv-command-not-found](https://stackoverflow.com/questions/46391721/pipenv-command-not-found "https://stackoverflow.com/questions/46391721/pipenv-command-not-found")

[https://stackoverflow.com/questions/22465332/setting-path-environment-variable-in-osx-permanently](https://stackoverflow.com/questions/22465332/setting-path-environment-variable-in-osx-permanently "https://stackoverflow.com/questions/22465332/setting-path-environment-variable-in-osx-permanently")
