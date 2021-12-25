var e=require("cac"),t=require("fs/promises"),s=require("path"),r=require("filesize");function i(e){return e&&e.__esModule?e.default:e}var a="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},c={},o={},l=a.parcelRequire0bdd;null==l&&((l=function(e){if(e in c)return c[e].exports;if(e in o){var t=o[e];delete o[e];var s={id:e,exports:{}};return c[e]=s,t.call(s.exports,s,s.exports),s.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){o[e]=t},a.parcelRequire0bdd=l);const n={exclude:["node_modules"],relativepathDesc:{".git":{desc:"git workspace",collapsed:!0},".husky":{desc:"husky workspace",collapsed:!0},".vscode":{desc:"vscode config",collapsed:!0},dist:{desc:"",collapsed:!0},"yarn.lock":{desc:"yarn package lock file",collapsed:!0}}};const p=()=>{try{return require(i(s).resolve(__dirname,"projectMaps.config.js"))}catch(e){return console.error("getUserConfig-error,use default config"),n}},d=async(e,a,c,o)=>{let l=await i(t).readdir(i(s).resolve(e));l=l.filter((e=>!a.exclude.includes(e))),await Promise.all(l.map((async l=>{var n,p;const u=i(s).resolve(e,l),h=i(s).relative(__dirname,u);var v;const g=null!==(v=null===(n=a.relativepathDesc[h])||void 0===n?void 0:n.desc)&&void 0!==v?v:"";var m;const y=null!==(m=null===(p=a.relativepathDesc[h])||void 0===p?void 0:p.collapsed)&&void 0!==m?m:"",f=await i(t).stat(u),j=f.isDirectory();var w;o[l]=function(e,t,s,r,i,a,c){const o={parentName:e,fullPath:t,relativePath:s,size:r,desc:i,collapsed:c};return a&&(o.children={}),o}(c,u,h,i(r)(f.size),g,j,y),j&&await d(u,a,l,null!==(w=o[l].children)&&void 0!==w?w:{})})))},u=e.cac("project-maps");u.command("init").action((async()=>{console.log("call-init"),(async e=>{const r=p(),a=r?{exclude:[...new Set(r.exclude.concat(n.exclude))],relativepathDesc:[...new Set([...Object.keys(n.relativepathDesc),...Object.keys(r.relativepathDesc)])].reduce(((e,t)=>{var s,i;return e[t]=Object.assign({},null!==(s=r.relativepathDesc[t])&&void 0!==s?s:{},null!==(i=n.relativepathDesc[t])&&void 0!==i?i:{}),e}),{})}:n;try{await i(t).writeFile(i(s).resolve(e,"projectMaps.config.js"),"module.exports = "+JSON.stringify(a,null,2)),console.log("write-projectMaps.config.js-success")}catch(e){console.error("write-projectMaps.config.js-error",e)}})(__dirname).finally((()=>{process.exit(1)}))})),u.command("tree").action((async()=>{console.log("call-tree"),(async e=>{const r={},a=p();try{await d(e,a,"root",r),await i(t).writeFile(i(s).resolve(e,"projectMaps.tree.js"),"window.projectMapsTree = "+JSON.stringify(r,null,2)),console.log("write-projectMaps.tree.js-success")}catch(e){console.log("write-projectMaps.tree.js-error",e)}})(__dirname).finally((()=>{process.exit(1)}))})),u.command("generate").action((async()=>{console.log("call-generate"),(async e=>{console.log("hello",__filename,__dirname);const r=i(s).relative(__dirname,__filename.replace(/mapcli\.js/g,"chart.js"));console.log("chartJsPath",r);const a=`\n  <!DOCTYPE html>\n  <html lang="en">\n    <head>\n      <meta charset="UTF-8" />\n      <meta http-equiv="X-UA-Compatible" content="IE=edge" />\n      <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n      <title>Project-Maps</title>\n      <style>\n        * {\n          padding: 0;\n          margin: 0;\n        }\n      </style>\n    </head>\n    <body>\n      <div style="width: 100vw; height: 100vh; display: flex">\n        <div id="container" style="flex: 1"></div>\n      </div>\n      <script src="./projectMaps.tree.js"><\/script>\n      <script src="./${r}"><\/script>\n    </body>\n  </html>\n\n  `;try{await i(t).writeFile(i(s).resolve(e,"projectMaps.views.html"),a),console.log("write-projectMaps.views.html.js-success")}catch(e){console.error("write-projectMaps.views.html.js-error",e)}})(__dirname).finally((()=>{process.exit(1)}))})),u.help(),l.register("279QD",(function(e,t){e.exports=JSON.parse('{"name":"project-maps","version":"1.0.0","description":"visualize your project","bin":"dist/mapcli.js","files":["dist/"],"engines":{"node":">= 12"},"mapcli":"dist/mapcli.js","chart":"dist/chart.js","targets":{"mapcli":{"source":"src/main.ts","engines":{"node":">= 12"}},"chart":{"source":"src/chart.ts","engines":{"browsers":"> 0.5%, last 2 versions, not dead"}}},"scripts":{"build":"parcel build","build:mapcli":"parcel build --target mapcli","build:chart":"parcel build --target chart"},"repository":{"type":"git","url":"https://github.com/toSayNothing/project-maps.git"},"keywords":["visualize","project","maps"],"author":"toSayNothing","license":"MIT","bugs":{"url":"https://github.com/toSayNothing/project-maps/issues"},"homepage":"https://github.com/toSayNothing/project-maps#readme","devDependencies":{"@babel/cli":"^7.16.0","@babel/core":"^7.16.5","@babel/preset-env":"^7.16.5","@babel/preset-typescript":"^7.16.5","@parcel/packager-ts":"^2.0.1","@parcel/transformer-typescript-types":"^2.0.1","@types/node":"^17.0.4","parcel":"^2.0.1","parcel-reporter-static-files-copy":"^1.3.4","typescript":">=3.0.0"},"dependencies":{"@antv/x6":"^1.29.1","cac":"^6.7.12","echarts":"^5.2.2","filesize":"^8.0.6","vscode-icons-js":"^11.6.1"},"staticFiles":{"staticOutPath":"static","staticPath":"src/static"}}')})),u.version(l("279QD").version),u.parse();
//# sourceMappingURL=mapcli.js.map
