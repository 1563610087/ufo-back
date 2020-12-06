//该文件是写接口和数据库交互的逻辑
const { exec } = require('../database/mysql.js')

//获取所有网站数据
const allSites = () => {
    //写SQL语句
    var sql1 = `select * from website_1`;
    var sql2 = `select * from website_2`;
    var sql3 = `select * from website_3`;
    const promise1 = exec(sql1)
    const promise2 = exec(sql2)
    const promise3 = exec(sql3)

    return Promise.all([promise1, promise2, promise3])

}
//添加分类
const addClass = (data) => {
    var sql = `insert into website_1 (classify_name) values ('${data}')`

    return exec(sql).then((data) => {
        if (data.affectedRows > 0) {
            return true
        }
        return false
    })
}

const delClass = (data) => {
    var sql = `delete from website_1 where classify_id='${data}'`
    return exec(sql).then((data) => {
        if (data.affectedRows > 0) {
            return true
        }
        return false
    })
}

const updateClass = (classifyName, classifyId) => {
    var sql = `update website_1 set classify_name=('${classifyName}') where classify_id=${classifyId}`
    return exec(sql).then((data) => {
        if (data.affectedRows > 0) {
            return true
        }
        return false
    })
}

//创建2级分类
const addWeb = (name, id) => {
    var sql = `insert into website_2 (web_name,classify_id) values ('${name}','${id}')`

    return exec(sql).then((data) => {
        if (data.affectedRows > 0) {
            return true
        }
        return false
    })
}

const delWeb = (id) => {
    var sql = `delete from website_2 where website_id='${id}'`
    return exec(sql).then((data) => {
        if (data.affectedRows > 0) {
            return true
        }
        return false
    })
}

const updateWeb = (webName, websiteId) => {
    var sql = `update website_2 set web_name=('${webName}') where website_id=${websiteId}`
    return exec(sql).then((data) => {
        if (data.affectedRows > 0) {
            return true
        }
        return false
    })
}

//添加网站
const addSite = (siteName, siteUrl, websiteId,siteDescribe) => {
    var sql = `insert into website_3 (site_name,site_url,website_id,site_describe) values ('${siteName}','${siteUrl}','${websiteId}','${siteDescribe}')`

    return exec(sql).then((data) => {
        if (data.affectedRows > 0) {
            return true
        }
        return false
    })
}

const delSite = (siteId) => {
    var sql = `delete from website_3 where site_id='${siteId}'`
    return exec(sql).then((data) => {
        if (data.affectedRows > 0) {
            return true
        }
        return false
    })
}
//更新网站
const updateSite = (siteId, siteName, siteUrl,siteDescribe) => {
    var sql = `update website_3 set site_name='${siteName}', site_url='${siteUrl}', site_describe='${siteDescribe}'where site_id=${siteId}`
    return exec(sql).then((data) => {
        if (data.affectedRows > 0) {
            return true
        }
        return false
    })
}
module.exports = {
    allSites,
    addClass,
    delClass,
    updateClass,
    addWeb,
    delWeb,
    updateWeb,
    addSite,
    delSite,
    updateSite
}