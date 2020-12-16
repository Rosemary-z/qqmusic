import request from '../utils/request';
export const getSingerCategory = function () {
    return request.get('/hehe/singer/category')
}
export const getSingerList = function (area = -100, genre = -100, sex = -100) {
    return request.get(`/hehe/singer/list?area=${area}&genre=${genre}&sex=${sex}`)
}
export const getSongs = function (mid) {
    return request.get(`/hehe/singer/songs?singermid=${mid}`)
}
export const getSongUrl = function (songid) { //请求歌曲播放链接
    return request.get(`/hehe/song/urls?id=${songid}`)
    // return axios.post(`https://api.qq.jsososo.com/song/urls`,{
    //   id:songid
    // })
}
export const getAlbum = function (albummid) { //请求歌曲播放链接
    return request.get(`/hehe/album?albummid=${albummid}`)
    // return axios.post(`https://api.qq.jsososo.com/song/urls`,{
    //   id:songid
    // })
}
export const getLrc = (songid) => { //请求歌词
    return request.get(`/hehe/lyric?songmid=${songid}`)
}