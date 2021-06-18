---
aliases:
tags: ['bash']
references:
- 'https://unix.stackexchange.com/questions/219991/how-do-i-create-a-directory-for-every-file-in-a-parent-directory'
---

# Create folder with file name and move file to folder
1. Create a *.sh*  script
```bash
#!/bin/bash
cd src && cd posts
for file in ./*.mdx; do
  mkdir "${file%.*}" && mv "$file" "${file%.*}"
done
```
2. In your terminal, make the script executable 
```bash
$ chmod +x <script_name>
```
3. Execute your script
```bash
$ ./script_name
```






# Footer
---
Related: 