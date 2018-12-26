# package.json详细解读

最近开始尝试写一些自己的npm包,所以在这里整体了解下基础文件package.json中各个字段的意思.

```javascript
module.exports = {
  name: '',
  version: '',
  description: '',
  keywords: '',
  homepage: '',   //项目主页url
  bugs: {
    "url": '',
    "email": ''
  },
  license: '',
  main: '', //入口文件
  bin: {},
  engines: '', //指定node的工作版本
  os: '', //指定模块运行的操作系统
  private: true/false, //如果你在包的package.json中设置"private": true，则npm会拒绝发布它。
}
```

## `name`

1. 包名及其规则
2. @scope/packagename

## `version`

1. 包内容和包版本应该同步更新

## `main`

1. 指定模块的入口程序文件
   
  如果你的模块叫'tf',用户安装了它,当调用`require('tf')`时候,那么这个main字段指定文件的导出对象就会被返回.

2. 一个相对包根目录的模块标识

## `bin`

当需要制作命令行工具时,那么需要配置bin字段,它是一个命令名和本地文件名的的映射.

在安装时,如果是全局安装,npm将会使用符号链接把这些文件链接到prefix/bin中,如果是本地安装,会链接到./node_modules/.bin

```javascript

{
  bin: {
    "tf": "./bin/tf.js"
  }
}

```

## 总结

整体看了下,需要注意的关键的字段和规范不是太多,除了自动生成的字段以外,我们需要额外注意的字段就差不多只有main和bin字段了.


