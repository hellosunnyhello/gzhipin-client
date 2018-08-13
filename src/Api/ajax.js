import axios from 'axios';

export default function (url,data,type='GET') {
    if(type==='GET'){
        let subUrl = '';
        //Object.keys(对象)返回一个对象本身的属性名组成的数组
        Object.keys(data).forEach((key) => {
            const value = data[key]
            subUrl = `${key}=${value}&`
        })
        if(subUrl){
            subUrl = subUrl.substring(0,subUrl.length-1)
        }
        return axios.post(`${url}?${subUrl}`)
    }else if(type==='POST'){
        return axios.post(url,data)
    }
}