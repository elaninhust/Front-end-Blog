node开发汇总遇到的问题汇总

## 创建多层文件夹时候必须嵌套创建文件夹,否则会报错

### 场景还原

我想在当前目录下创建一个这样的目录: `dist/video/`,最开始的代码如下:

```javascript
fs.mkdirSync('dist/video/')
```

但是,直接报错,`no such file or directory`,查阅资料才发现`fs.mkdirSync`不能创建嵌套文件夹,必须一层一层的创建(一脸懵逼)

所以只能这样创建:

```javascript
fs.mkdirSync('dist')
fs.mkdirSync('dist/video')
```
ok了!!!