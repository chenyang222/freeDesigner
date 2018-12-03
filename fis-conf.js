/**
 * @file: 自由设计师平台 fis-conf
 * @author: lisen
 * @date: 2016-08-18
 *
 * */

/* globals console, fis */
console.log('===== start =====');
console.log('自己启动nginx, 配置好html, src的静态资源，反向代理后台API');
console.log('访问: http://localhost:8080/src/page,  设置本地hosts 127.0.0.1 localhost');
console.log('===== end =====');


// 线上环境
var prod = fis.media('prod');

// 修改version
var fs = require('fs');
var sh = require('child_process').exec;

/* ignore files */
fis.set('project.ignore', fis.get('project.ignore').concat([
    '.gitignore',
    'README.md',
    'component.json',
    'package.json',
    'test/**',
    'compile.sh',
    'archer/**',
    'BCLOUD'
]));

/* extension files add project */
fis.set('project.fileType.text', 'hbs,vue,jade,pdf,woff');
fis.set('project.files', ['src/**']);

/* commonJS 规范 */
// require mod support

fis.hook('commonjs', {
    extList: ['.js', '.vue'],
    umd2commonjs: true
});
fis.match('src/**.js', {
    isMod: true,
    parser: fis.plugin('babel-5.x')
});
// 移除mod.js的moudle属性
fis.match('src/assets/js/mod.js', {
    isMod: false
});
/* compile less files to css files */
fis.match('src/**.less', {
    rExt: '.css',
    useSprite: true,
    parser: fis.plugin('less-2.x'),
    postprocessor: fis.plugin('autoprefixer')
});
/* html template */
fis.match('src/**.jade', {
    rExt: 'html',
    parser: fis.plugin('jade')
});

/* vue inline source */
fis.match('**.vue', {
    rExt: '.js',
    useSameNameRequire: true,
    isMod: true,
    parser: fis.plugin('vue-component', {
        cssScopedFlag: '__vuec__', // 要替换成vuec id的scoped标志
        cssScopedIdPrefix: '__vuec__' // vuec id 前缀
    })
});
fis.match('**.vue:js', {
    parser: [
        fis.plugin('babel-5.x'),
        fis.plugin('translate-es3ify', null, 'append')
    ]
});
// vue组件中的less片段处理
fis.match('**.vue:less', {
    rExt: 'css',
    parser: fis.plugin('less-2.x'),
    postprocessor: fis.plugin('autoprefixer')
});
// vue组件中的jade片段处理
fis.match('**.vue:jade', {
    parser: fis.plugin('jade')
});
// fis3 public components
/*fis.match('/components/**', {
    isMod: true,
    parser: fis.plugin('babel-5.x'),
    useSameNameRequire: true,
    release: '/src/$0'
});
*/
fis.unhook('components');
fis.hook('node_modules', {
    shimBuffer: false,
    shimGlobal: false,
    shimProcess: false
});
fis.match('/node_modules/**.js', {
    isMod: true,
    useSameNameRequire: true,
    release: '/src/$&'
});
// 第三方库wrap， 单独处理这块的逻辑
fis.match('/third_party/**.js', {
    isMod: true,
    parser: fis.plugin('babel-5.x'),
    release: '/src/assets/$0'
});
fis.match(/^\/third_party\/(.*)\.js$/i, {
    id: '$1'
});

// npm install -g fis3-parser-handlebars
fis.match('*.hbs', {
    rExt: '.js', // from .handlebars to .js 虽然源文件不需要编译，但是还是要转换为 .js 后缀
    parser: fis.plugin('handlebars-4.x', {

    }),
    release: false // handlebars 源文件不需要编译
});
fis.match('*.png', {
    optimizer: fis.plugin('png-compressor')
});
// 打包部分， 依赖loader
fis.match('::package', {
    // npm install [-g] fis3-postpackager-loader
    // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
    postpackager: fis.plugin('loader', {
        resourceType: 'commonJs'
    }),
    packager: fis.plugin('map'),
    spriter: fis.plugin('csssprites', {
        layout: 'matrix',
        margin: '15'
    })
});

// 前端开发模式中的less替换domain
fis.match('*.{js,css,png,jpg,ico,less,swf,json}', {
    domain: ''
});

/* global config  end */

/* prod environment  start */
prod.match('*.{vue,js,css,png,jpg,ico,less,swf,json}', {
    useHash: true,
    domain: ''
})
.match('*.js', {
    optimizer: fis.plugin('uglify-js')
})
.match('*.less', {
    optimizer: fis.plugin('clean-css')
})
.match('::package', {
    // npm install [-g] fis3-postpackager-loader
    // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
    postpackager: fis.plugin('loader', {
        resourceType: 'commonJs',
        allInOne: {
            ignore: [
                '/components/jquery/jquery.js',
                '/components/vue/*.js',
                '/components/vue-router/*.js'
            ]
        },
        processor: {
            '.js': 'js',
            '.less': 'less',
            '.vue': 'js',
            '.css': 'css'
        },
        useInlineMap: true // 资源映射表内嵌
    })
});

