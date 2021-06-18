# Quick Start - Cloning a React Project
1.  Change the current working directory to the location where you want the cloned directory.
2.  Type `git clone`, and then paste the URL you copied earlier.
    ```shell
    $ git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY
    ```
3. In terminal navigate to the newly cloned folder so you can open that folder VSCode:
   ```shell
   $ code .
   ```

## Points to look out for
Context: If you're cloning a React project, these are some points you should look out for:
- remove the git configuration of the cloned application
    ```bash
    cd bloglist-frontend   // go to cloned repository
    rm -rf .git
    ```
- add the *.gitignore* file (if not already existing)
- install the dependencies
    ```bash
    npm install
    ```

- [[Quick Start - Initializing Git for a project| Initialize git for the project]]

Footer
---
Source:
Keywords: #programming #react #setup 
Related: