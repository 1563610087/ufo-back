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

//统一执行SQL函数

function exec(sql) {
  const promise = new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err)
        return
      }
      resolve(result)
    })
  })
  return promise

}


module.exports = {
  exec,
  escape: mysql.escape
}