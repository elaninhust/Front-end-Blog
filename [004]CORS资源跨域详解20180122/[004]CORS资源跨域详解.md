/*!
 * CORS资源跨域详解+axios和ajax的区别
 * 2018年1月24日
 * 内内那叔_
 */


前端时间项目中用到Vue，并且用到了vue官方推荐的axios来进行http请求，但是过程中就碰到了跨域方面的问题，查阅资料后解决了问题，现在此做下详细记录。

## 什么是CORS?
首先说下CORS是个啥东西。CORS是一个W3C标准，它允许浏览器向服务器发起跨域请求，可以克服AJAX的“同源”限制。
其实，处理跨域请求，重任还是主要在后端的处理方式。

## CORS跨域时，axios的配置点
1. `withCredentials` 跨域请求时是否携带cookies信息，默认为false，即跨域请求时不携带cookies信息。如果需要请求时自动携带cookies信息，则需要手动将withCredentials设置为true。
2. `params` 即将与请求一起发送的URL参数，一般get请求时采用这个参数通过地址栏URL传递参数
3. `data` 作为请求主体被发送的数据，只实用于put、post、patch这些请求方法。一般post请求时通过这种方式传递参数。

## 简单请求和非简单请求
浏览器将CORS分为2种请求：简单请求和非简单请求。

- 简单请求：同时满足一下2大条件的都是简单请求。
    + 请求方法只能是：head、get、post
    + http请求头字段信息不能超出一下几个字段：
        * `Accept`
        * `Acept-language`
        * `Content-language`
        * `Last-Event-ID`
        * `Content-type`只限于3个值：application/x-www-form-urlencoded、multipart/form-data、text/plain
- 非简单请求：简单请求之外的请求都归为非简单请求一类

### 简单请求基本流程
- 请求
    浏览器可以直接发起CORS简单请求，并且在头信息中增加`Origin`字段，记录本次请求来自哪个源（包含协议、域名以及端口等信息），服务器会根据这个字段判断是否同意这次请求。
- 响应
    正确响应的响应头中包含的字段：
    + Access-Control-Allow-Origin
        * 必须字段
        * 这个字段的值要么是请求头中Origin字段的值，要么直接是*
        * 当请求中需要携带cookies时（即`withCredentials`设置为true时），响应头中的`Access-Control-Allow-Origin`字段只能是请求头中的Origin字段对应的值，不能为*，否则请求报错。
    + Access-Control-Allow-Credentials
        * 可选字段，Boolean值，表示是否允许发送cookies
        * 一般当`withCredentials`设置为true时，响应头中的该字段设置为true
    + Access-Control-Expose-Headers
        * 可选字段
        * 指定可以拿到响应头中6个基本字段以外的字段

### 非简单请求基本流程
- 请求及响应
    非简单请求时，需先执行预检请求，当预检请求通过以后，才会放真正的请求。
    + OPTIONS预检请求
        浏览器先询问服务器，当前网页所在域名是否在服务器的许可名单下，以及可以使用哪些HTTP动词和头信息字段。另外预检请求不携带cookies信息。
    + 预检请求的响应
        包含的字段及含义如下：
        * `Access-Control-Allow-Methods`返回服务器所有支持的请求方法
        * `Access-Control-Allow-Headers`表明服务器所有支持的头信息字段
        * `Access-Control-Allow-Credentials`
        * `Access-Control-Allow-Max-Age`
            - 指定本次预检请求的有效期
            - 在此期间，不用再发出另外一条预检请求
    + 实际需要的请求
        这时候的请求响应和简单请求一致。

## axios和ajax的区别

axios和ajax的区别主要在发送post请求的比较明显，get请求时区别不大。

利用axios发起post请求时，默认的Content-Type类型为application/json,而ajax发起post请求时，默认的Content-Type类型为application/x-www-form-urlencoded。但是，如果在axios发起post请求时，手动的将Content-Type改为application/x-www-form-urlencoded,能否和ajax发起的post请求一致呢？很可惜，这是不可能滴，虽然改了Content-Type，但是数据依然不正确。

所以为了能用axios发起和ajax使用application/x-www-form-urlencoded格式完全一样的post请求，需做如下处理：

- 浏览器
    
    1. 可以使用URLSearchParams API
        
        ```javascript
        var params = new URLSearchParams();
        params.append('params','value1');
        params.append('param2','value2');
        axios.post('url',params);
        ```

        > 请注意，不是所有浏览器都支持URLSearchParams，但是有一个polyfill可用（确保polyfill全局环境）。

    2. 也可以使用qs库对数据进行编码

        ```javascript
        const qs = require('qs');
        axios.post('url',qs.stringify({username:"ivan",password:"123456"}));
        ```

- Node.js

    在node中，可以使用querystring模块：

    ```javascript
    const querystring = require('querystring');
    axios.post('url'.querystring.stringify({username:"ivan",password:"123456"}));
    ```

那么qs.srtingify()和JSON.stringify()有什么区别呢？

对于同一个json对象{username:"ivan",password:"123456"}来说，经过qs.stringify()处理后会变成"username=ivan&password=123456"，而JSON.stringify()序列化的结果是"{"a":"hehe","age":10}"，区别就显而易见了。