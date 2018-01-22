前端时间项目中用到Vue，并且用到了vue官方推荐的axios来进行http请求，但是过程种就碰到了跨域方面的问题，查阅资料后解决了问题，现在此做下详细记录。

## 什么是CORS?
首先说下CORS是个啥东西。CORS是一个W3C标准，它允许浏览器向服务器发起跨域请求，可以克服AJAX的“同源”限制。
其实，处理跨域请求，重任还是主要在后端的处理方式。

## CORS跨域时，axios的配置点
1. `withCredentials` 跨域请求时是否携带cookies信息，默认为false，即跨域请求时不携带cookies信息。如果需要请求时自动携带cookies信息，则需要手动将withCredentials设置为true。
2. `params` 即将与请求一起发送的URL参数，一般get请求时采用这个参数通过地址栏URL传递参数
3. `data` 作为请求主体被发送的数据，只实用于put、post、patch这些请求方法。一般post请求时通过这种方式传递参数。

## 简单请求和非简单请求
浏览器将CORS分为2中请求：简单请求和非简单请求。

- 简单请求：同时满足一下2大条件的都是简单请求。
    + 请求方法自能是：head、get、post
    + http请求头字段信息不能超出一下几个字段：
        * `Accept`
        * `Acept-language`
        * `Content-language`
        * `Last-Event-ID`
        * `Content-type`只限于3个值：application/x-www-form-urlencoded、multipart/form-data、text/plain
- 非简单请求：简单请求之外的请求都归为非简单请求一类


