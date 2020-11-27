var a = [
    {
        fid: 1,
        text: 'ss'
    },
    {
        fid: 3,
        text: 'ads'
    }
]

var b = [
    {
        id: 11,
        fid: 1,
        text: 'sad'

    },
    {
        id: 12,
        fid: 3,
        text: 'dsa'
    }
]
var c = [{
    id: 111,
    fid: 1
}]
a.forEach((item) => {
    item.list = []
    b.forEach((data) => {
        if (item.fid === data.fid) {
            item.list.push(data)
        }
    })

})

var c = [3, 4, 5]
var [x, z, t] = c
console.log(x, z, t)