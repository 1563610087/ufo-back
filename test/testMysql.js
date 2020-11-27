//该文件是连接MySQL数据库
const mysql = require('mysql')

//创建链接对象
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'ufo-nav'
})

//开始链接
connection.connect()

var sql = 'SELECT * FROM website_classify';
//查
connection.query(sql, function (err, result) {
    if (err) {
        console.log('[SELECT ERROR] - ', err.message);
        return;
    }

    console.log('--------------------------SELECT----------------------------');
    console.log(result);
    console.log('------------------------------------------------------------\n\n');
});

connection.end();