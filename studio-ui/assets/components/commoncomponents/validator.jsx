/**
 * @file Desciption:
 * @author huanghaiping(huanghaiping02@baidu.com)
 * Created on 17/6/9
 */


/**
 * data validator
 *
 * @param {value} p1 the value which need be verified
 * @return {Json Object} the result ,like {flag:true or false,message:'information ...'}
 */
export var isNumber = (value, message = 'please input number') => {
    let regex = /^\+?[1-9][0-9]*$/;
    const result = {
        flag: regex.test(value),
        message: message
    }
    return result;
}

export var isNull = (value, message = 'Please enter a value') => {
    let flag = true;
    if (value === '' || value === null || value === undefined) {
        flag = false;
    }
    const result = {
        flag: flag,
        message: message
    }
    return result;
}

export var isIp = (value, message = 'Please enter a host,like x.x.x.x') => {
    let regex = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
    const result = {
        flag: regex.test(value),
        message: message
    }
    return result;
}