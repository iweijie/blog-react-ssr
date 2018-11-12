var menu = [{
        isEnter: false,
        name: '文章列表',
        path: "/article",
        childrens: [{
                isEnter: false,
                name: 'articlelist',
                path: "/articlelist/node",
            },
            {
                isEnter:false,
                name: 'path模块',
                path: "/node/path",
            }
        ]
    }, {
        isEnter: false,
        name: 'javascript',
        path: "/javascript",
        childrens: [{
            isEnter:true,
            name: "Array",
            path: "/javascript/array"
        }, {
            isEnter:false,
            name: "ES6语法",
            path: "/javascript/es6"
        }]
    }, {
        isEnter: false,
        name: '编辑',
        path: "/edit",
        childrens: [{
            isEnter: false,
            name: "新增文章",
            path: "/addArticle"
        },{
            isEnter: false,
            name: "查看文章",
            path: "/articleDetail/5aec7ac463ba28126c8fbf86" 
        }, ]
    }, {
        isEnter: false,
        name: '配置目录',
        path: "/config",
        childrens: [{
            isEnter: false,
            name: "文章配置目录",
            path: "/config/articleConfig"
        },{
            isEnter: false,
            name: "菜单配置项",
            path: "/config/menu"
        }]
    }

]

export default menu