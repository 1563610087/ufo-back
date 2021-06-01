let axios = require('axios')

let getWebIcon = function (url) {
    return new Promise((resolve, reject) => {
        axios.get(url).then((res) => {
            const website=url.split('/').slice(0,3).join('/')
            if (res.status === 200) {
                const html = res.data
                let reg = /href.*?favicon\.ico/gi
                let iconUrl = html.match(reg)
                if (iconUrl) {
                    let result = (iconUrl[0].split('=')[1]).substr(1)
                    if (result.includes('http')) {
                        resolve(result)
                    } else {
                        resolve(website+result)
                    }
                }else {
                    reject('获取图标失败')
                }
                resolve(html)
            } else {
                reject('请求网站失败')
            }
        }).catch(err => {
            reject(err)
        })
    })

}

module.exports = {
    getWebIcon
}