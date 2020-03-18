function debounce(callback, time) {
    let timeId = null;
    return function () {   //这个函数就是闭包
        clearTimeout(timeId)
        // 把要执行的代码放到计时器里面。
        // time时间后会调用callback函数
        timeId = setTimeout(callback, time);  //时间也不能写死
    }
}

// 暴露出去
export default debounce