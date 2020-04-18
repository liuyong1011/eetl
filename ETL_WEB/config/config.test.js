export default{
    define:{
         "process.env.apiUrl": 'http://10.16.1.137:8081/'
        //  "process.env.apiUrl": 'http://10.16.0.109:8081/' //测试
        //  "process.env.apiUrl": 'http://10.16.128.91:8081/' //uat
        // "process.env.apiUrl":"http://10.16.0.109:7070/etl-service/"
    },

    //测试环境部署配置目录参数
    base: '/dev/',
    publicPath: '/dev/', 
     

    // base: '/test/',
    // publicPath: '/test/',

    exportStatic:{},
    
}