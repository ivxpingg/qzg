const PROJECT_NAME = '/pqs';
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
    development: {
        origin: window.location.origin,
        ajaxUrl: PROJECT_NAME,
        staticUrl: '',
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