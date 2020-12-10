import request from '../utils/request';
export const getSingerCategory = function () {
    return request.get('/hehe/singer/category')
}
export const getSingerList = function (area = -100, genre = -100, sex = -100) {
    return request.get(`/hehe/singer/list?area=${area}&genre=${genre}&sex=${sex}`)
}