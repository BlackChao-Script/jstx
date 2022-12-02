/*
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: 打包命令
 * npm run serve/build 模块名  mp-weixin(不加打包h5)
 * 例: npm run serve lease ->运行招商h5
 * 例: npm run serve lease mp-weixin ->运行招商小程序
 */
const fs = require('fs')
const { spawn } = require('child_process')
// 模块名
const moduleFn = process.argv[2] // 运行类型，build/serve
const moduleName = process.argv[3] || 'minikol' // 默认主模块minikol
const moduleType = process.argv[4] || 'h5' // 默认h5模式

// 运行的命令行
// 读取不同配置
let page = fs.readFileSync(`${__dirname}/config/${moduleName}.json`, 'utf-8')
page = JSON.parse(page)

// 处理h5打包时的路径 路径为模块名
let manifest = fs.readFileSync(`${__dirname}/../manifest.json`, 'utf-8')
manifest = JSON.parse(manifest)
manifest.h5.publicPath = `/mobile/${moduleName}`
fs.writeFileSync(`${__dirname}/../manifest.json`, JSON.stringify(manifest, '', '\t'))

// 写入pages.jsonb文件
fs.writeFile(`${__dirname}/../pages.json`, JSON.stringify(page, '', '\t'), (e) => {
  if (e) {
    console.error('pages.json生成错误', e)
    return
  }
  console.log('pages.json 配置文件更新成功')
  // 运行命令

  const NODE_ENV = moduleFn === 'build' ? 'production' : 'development' // 环境

  const cmd = [
    `NODE_ENV=${NODE_ENV}`,
    `UNI_PLATFORM=${moduleType}`, // 模式 h5/mp-weixin
    `VUE_APP_MODULE=${moduleName}`, // 模块名
    // `UNI_OUTPUT_DIR=dist/${moduleFn === 'build' ? moduleFn : 'dev'}/${
    //   moduleType === 'h5' ? moduleName : 'mp-weixin'
    // }`,
    'vue-cli-service'
  ]

  if (moduleType === 'mp-weixin') {
    cmd.push('uni-build')
    if (moduleFn !== 'build') {
      cmd.push('--watch')
    }
    cmd.push('--minimize')
  } else {
    cmd.push(`uni-${moduleFn}`)
  }

  console.log('开始执行:cross-env ' + cmd.join(' '))

  const spawnObj = spawn('cross-env', [...cmd], {
    stdio: 'inherit',
    shell: process.platform === 'win32'
  })

  // 流持续输出监听
  spawnObj.on('close', function (code) {
    console.log('close code : ' + code)
  })
  spawnObj.on('exit', (code) => {
    console.log('exit code : ' + code)
  })
})
