# app内嵌页调试
- 安卓内嵌页调试
- iOS内嵌页调试

## 安卓内嵌页调试

安卓的内嵌页调试,需要使用chrome的inspect功能,具体不在如下:

1. 安装一个debug版本的应用包
1. 打开手机的开发者调试选项
2. 在chrome中打开`chrome://inspect/#devices`
3. 选择对应的手机即可

有时候点击`inspect`后直接显示404,这是因为墙的原因,有时候可以访问谷歌后也还是直接404,可以配置一下hosts文件

```bash
# 安卓调试
61.91.161.217 chrome-devtools-frontend.appspot.com
61.91.161.217 chrometophone.appspot.com

```

## iOS内嵌页调试

iOS内嵌页调试直接利用safari的开发选项调试即可

