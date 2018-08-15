function userTargetPath(type,header) {
    let path = '/'
    if(type==='dashen'){
        path += 'dashen'
    }else {
        path += 'boss'
    }
    if(!header){
        path += 'info'
    }

    return path
}

export default userTargetPath