/**
 * 利用json-server模拟后台接口第一篇
 * 2017年08月21日
 * 内内那厮_
 */

1. 全局安装`json-server`
    `npm i json-server -g`
    mac可能需要加上`sudo`，安装完成以后可是使用`json-server -v`查看版本

2. mock出.json文件
    新建一个`json_data`文件夹，然后在该文件下新建一个`db.json`的文件，并编辑该文件
    ```js
    {
        "index":{
            "success":1,
            "data":[
                {
                    "name":"ivan",
                    "age":20
                },
                {
                    "name":"elan",
                    age:30
                }
            ],
            "error":{
                "code":404,
                "message":"fail"
            }
        },
        "hotline":{
            "success":0,
            "error":{
                "code":404,
                "message":'fail'
            }
        }
    }
    ```
    其中key-value值中，key为接口路径名，value为对应的数据，且格式只能为对象

3. 启动服务器
    `json-server db.js -p 4000`
    在端口号4000下启动服务，并且支持`get/post/put/delete`等4中请求方式

4. 接下可以浏览器中访问`http://localhost:4000/index`，浏览器会显示对应数据
    当然可以在应用中ajax请求接口接口



