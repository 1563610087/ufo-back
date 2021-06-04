let axios = require('axios')

let getWebIcon = function (url) {
    return new Promise((resolve, reject) => {
        const website=url.split('/').slice(0,3).join('/')
        const protocol=website.includes('https')?'https:':'http:'
        console.log(url)
        axios.get(url).then((res) => {    
            console.log(res)
            if (res.status === 200) {
                const html = res.data
                //匹配规则1
                let reg = /href.*?\.ico/gi
                let iconUrl = html.match(reg)
                console.log(iconUrl,1)
                if (iconUrl) {
                    let result = iconUrl[0].split('=').pop().substr(1)
                    console.log(result,222)
                    if (result.includes('http')) {
                        resolve(result)
                    } else if(result.includes('//')){
                        resolve(protocol+result)
                    }
                    else {
                        if(result[0]==='/'){
                            resolve(website+result)
                        }else {
                            resolve(website+'/'+result) 
                        }
                        
                    }
                }else {
                    //匹配规则2     
                    let reg2=/rel=.*?\.png/gi
                    let result2= html.match(reg2)
                    console.log(result2,2)
                    if(result2){
                        let iconUrl=result2[0].split("href=").pop().substr(1)
                        if(iconUrl.includes('http')){
                            resolve(iconUrl)
                        }else if(iconUrl.includes('//')){
                            resolve(protocol+iconUrl) 
                        }else{
                            if(iconUrl[0]==='/'){
                                resolve(website+iconUrl)
                            }else {
                                resolve(website+'/'+iconUrl)
                            }
                            
                        }
                    }else{
                        resolve(website+'/favicon.ico')
                    }                   
                }
            } else {
                console.log(22)
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