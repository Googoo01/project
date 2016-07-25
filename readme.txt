https://github.com/Googoo01/project.git



本地新建目录首次与远程目录关联：

git init

git remote add origin https://github.com/Googoo01/project.git

git push -u origin master

之后会提示输入用户名密码


然后那些用  git add   和 git commit 操作过（曾被添加到本地仓库）得文件就会被提交到远程仓库



git add 文件夹  可以直接将文件夹和其子文件同时提交


git rm  文件名     删除文件   然后再使用 git commit 提交即可