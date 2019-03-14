const PROJECT_NAME = '/ao';
// const PROJECT_NAME = '';
if (!window.location.origin) {
    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
}
export default {
    env: process.env.NODE_ENV,
    /**
     * @description token在Cookie中存储的天数，默认1天
     */
    cookieExpires: 1,
    password_key: '1wzgfYWEvc3JZibJ',  // 用于拼接在明文密码后面在进行MD5加密
    loginUrl: 'http://110.86.21.246:8090/names.nsf?Login',
    // loginUrl: 'http://10.100.12.33',  // 登陆地址
    development: {
        origin: window.location.origin,
        ajaxUrl: PROJECT_NAME,
        cookiePath: '/',
        actionUrl: window.location.origin + PROJECT_NAME + '/file/upload',  // 文件上传路径
        filePath: window.location.origin + PROJECT_NAME + '/'               // 文件路径前缀
    },
    production: {
        origin: window.location.origin,
        ajaxUrl: PROJECT_NAME,
        staticUrl: '',
        cookiePath: '/',
        actionUrl: window.location.origin + PROJECT_NAME + '/file/upload',  // 文件上传路径
        filePath: window.location.origin + PROJECT_NAME + '/'               // 文件路径前缀
    }
}