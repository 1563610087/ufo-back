var express = require('express');
var router = express.Router();
const {
  allSites, addClass, delClass,
  updateClass, addWeb, delWeb,
  updateWeb, addSite, delSite, updateSite,getIcon
} = require('../dao/websites')
const { SuccessModel, ErrorModel } = require('../model/resModel.js')

//获取网站数据
router.get('/allSites', function (req, res, next) {

  const result = allSites()
  result.then((data) => {

    const obj = JSON.parse(JSON.stringify(data))

    let [obj1, obj2, obj3] = obj
    obj2.forEach((item) => {
      item.list = []
      obj3.forEach((data) => {
        if (item.website_id === data.website_id) {
          item.list.push(data)
        }
      })
    })
    obj1.forEach((item) => {
      item.list = []
      obj2.forEach((data) => {
        if (item.classify_id === data.classify_id) {
          item.list.push(data)
        }
      })
    })
    return res.send(new SuccessModel(obj1))

  })
});

//获取网站数据
router.post('/allSites', function (req, res, next) {
  const classifyId = req.body.classifyId
  const classifyType = req.body.classifyType
  const result = allSites()
  result.then((data) => {

    const obj = JSON.parse(JSON.stringify(data))

    let [obj1, obj2, obj3] = obj
    obj2.forEach((item) => {
      item.list = []
      obj3.forEach((data) => {
        if (item.website_id === data.website_id) {
          item.list.push(data)
        }
      })
    })
    obj1.forEach((item) => {
      item.list = []
      obj2.forEach((data) => {
        if (item.classify_id === data.classify_id) {
          item.list.push(data)
        }
      })
    })
    //return res.send(new SuccessModel(obj1))
    if (classifyType === "0") {
      return res.send(new SuccessModel(obj1))
    } else if (classifyType === "1") {
      obj1.find(item => {
        if(item.classify_id == classifyId){
          return res.send(new SuccessModel(item))
        }
      });
    } else if (classifyType === "2") {
      obj2.find(item => {
        if(item.classify_id == classifyId){
          return res.send(new SuccessModel(item))
        }
      });
    }else {
      res.json(new ErrorModel('数据获取失败'))
    }
  })
});

router.post('/addClass', function (req, res, next) {
  const classifyName = req.body.classifyName
  const result = addClass(classifyName)
  return result.then((data) => {
    if (data) {
      res.json(new SuccessModel())
    } else {
      res.json(new ErrorModel('添加失败'))
    }
  })

});

router.post('/delClass', function (req, res, next) {
  const classifyId = req.body.classifyId
  const result = delClass(classifyId)
  return result.then((data) => {
    if (data) {
      res.json(new SuccessModel())
    } else {
      res.json(new ErrorModel('删除失败'))
    }
  })
});


router.post('/updateClass', function (req, res, next) {
  const { classifyName, classifyId } = req.body
  const result = updateClass(classifyName, classifyId)
  return result.then((data) => {
    if (data) {
      res.json(new SuccessModel())
    } else {
      res.json(new ErrorModel('删除失败'))
    }
  })
});

//添加二级分类
router.post('/addWeb', function (req, res, next) {
  const { classify_id, web_name } = req.body
  const result = addWeb(web_name, classify_id)
  return result.then((data) => {
    if (data) {
      res.json(new SuccessModel('创建成功'))
    } else {
      res.json(new ErrorModel('创建失败'))
    }
  })
});

router.post('/delWeb', function (req, res, next) {
  const websiteId = req.body.websiteId
  const result = delWeb(websiteId)
  return result.then((data) => {
    if (data) {
      res.json(new SuccessModel())
    } else {
      res.json(new ErrorModel('删除失败'))
    }
  })
});

router.post('/updateWeb', function (req, res, next) {
  const { webName, websiteId } = req.body
  const result = updateWeb(webName, websiteId)
  return result.then((data) => {
    if (data) {
      res.json(new SuccessModel())
    } else {
      res.json(new ErrorModel('更新失败'))
    }
  }).catch(err=>{
    res.json(new ErrorModel('数据库错误'))
  })
});

//添加网站
router.post('/addSite', function (req, res, next) {
  const { siteName, siteUrl, websiteId,siteDescribe,iconUrl } = req.body
  const result = addSite(siteName, siteUrl, websiteId,siteDescribe,iconUrl)
  return result.then((data) => {
    if (data) {
      res.json(new SuccessModel())
    } else {
      res.json(new ErrorModel('添加失败'))
    }
  })

});

router.post('/delSite', function (req, res, next) {
  const siteId = req.body.siteId
  const result = delSite(siteId)
  return result.then((data) => {
    if (data) {
      res.json(new SuccessModel())
    } else {
      res.json(new ErrorModel('删除失败'))
    }
  })

});

//修改网站
router.post('/updateSite', function (req, res, next) {
  const { siteId, siteName, siteUrl,siteDescribe,iconUrl } = req.body
  const result = updateSite(siteId, siteName, siteUrl,siteDescribe,iconUrl)
  return result.then((data) => {
    if (data) {
      res.json(new SuccessModel())
    } else {
      res.json(new ErrorModel('更新失败'))
    }
  })
});

//爬取网站icon
router.post('/getIcon', function (req, res, next) {
  const siteUrl=req.body.siteUrl
  const result = getIcon(siteUrl)
  return result.then((data) => {
    if (data) {
      res.send(new SuccessModel({iconUrl:data}))
    } else {
      res.json(new ErrorModel('获取图标失败'))
    }
  }).catch(err=>{
    console.log(err)
  })
});
module.exports = router;
