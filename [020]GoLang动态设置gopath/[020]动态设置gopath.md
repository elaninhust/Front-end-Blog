## 动态设置gopath

Gopher们经常会遇到在多个$GOPATH来回切换工作的场景，每次切换都有手动修改$GOPATH才能编译运行当前项目，很是不方便！！那么有没有自动修改$GOPATH的方法呢？

将下面代码拷贝到 `~/.zshrc` 文件中，并保存.

```bash
function setgopath() {
currpath=`pwd`
gopath=${currpath%/src*}
if [[ $currpath != $gopath ]];then
    if [[ $gopath != $GOPATH ]];then
        export GOPATH=$gopath
        echo '$GOPATH:'$GOPATH
    fi
fi
}
setgopath

function cd_and_setgopath() {
cd $1
setgopath
}
alias cd='cd_and_setgopath'
```

使配置生效:

```bash
source ~/.zshrc
```