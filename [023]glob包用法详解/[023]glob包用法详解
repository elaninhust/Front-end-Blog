## 用法

```javascript
const glob = require('glob')

//  参数options是可选的
glob("**/*.js", options, function(err, files){
  //  files是一个包含返回结果文件路径的数组
  //  如果options里的nonull参数被设置为true,并且返回结果为空时,那么files的值就是匹配规则本身"**/*.js"
  //  err是一个错误对象,无错误时为null
})
```

## globs模型

> "globs"就是模型,类似你在命令行里输入`ls *.js`,或者在`.gitignore`里写的`build/*`

在解析路径模型的时候, 大括号里用多个逗号隔开的内容会被展开, 里面的部分也可以包含"/" ,比如  a{/b/c, bcd}  会被展开成 a/b/c 和 abcd 

以下特性,在path里面使用会有一些很神奇的效果:
1. `*`: 匹配路径中某部分0个或这多个字符

```javascript
glob("./*.js", function(err, files){
  console.log(files)
})
//  匹配路径下js后缀的文件(不包含已.开头的文件)
```

2. `?`: 匹配路径中0个或者1个字符

```javascript
glob("./?.js", function(err, files){
  console.log(files)
})
//  匹配路径下文件名字只有一个字符的文件
```

3. `[...]`: 匹配一个范围的字符,类似正则表达的范围,如果范围里的第一个字符是`^`或者`!`,那么匹配的是排除范围中字符的其他所有字符

```javascript
glob("./a[0-3].js", function(err, files){
  console.log(files)
})
//  匹配路径下文件名为a0.js、a1.js、a2.js,不包含a3.js的文件
```

4. `!(pattern|pattern|pattern)`: 匹配任何不符合给定规则的文件

```javascript
glob("./!(a|b).js", function(err, files){
  console.log(files)
})
//  带有a或者b的,都排除
```

5. `*(pattern|pattern|pattern)`: 匹配括号中多个模型的0个或多个或任意个的组合

```javascript
glob("./!(a|b|c).js", function(err, files){
  console.log(files)
})
//  匹配带有a.js或者b.js后者c.js文件,并且匹配这几个字符的组合,比如ab.js文件
```

6. `?(pattern|pattern|pattern)`:  精确匹配多个模型中的0个或任意1个

```javascript
glob("./?(a|b|c).js", function(err, files){
  console.log(files)
})
//  精确匹配模型,不可以组合,匹配a.js或者b.js或者c.js文件
```

7. `+(pattern|pattern|pattern)`: 匹配多个模型中的1个或多个,为空不匹配

```javascript
glob("./+(a|b|c).js", function(err, files){
  console.log(files)
})
//  匹配带有a.js或者b.js后者c.js文件,并且匹配这几个字符的组合,比如ab.js文件
```

8. `@(pattern|pattern|pattern)`: 匹配多个模型中的任意1个,精确匹配模型,不可以组合.和?的区别就是不可以为空.必须要是其中的一个

9. `**`: 和 1 一样,可以匹配任何内容,但**不仅匹配路径中的某一段,而且可以匹配 'a/b/c' 这样带有'/'的内容,所以,它还可以匹配子文件夹下的文件

```javascript
glob("./**/@(a|b|c).js", function(err, files){
  console.log(files)
})
//  不是一个单独的路径中的某部分,而是可以带有'/',所以所有当前文件夹和子文件夹下都进行匹配
```

## glob.sync()同步获取