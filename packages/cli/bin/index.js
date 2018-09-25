#!/usr/bin/env node
'use strict';
const chalk = require('chalk');
if ( Number(process.version.match(/v(\d+)/)[1]) < 8) {
    // eslint-disable-next-line
    console.log( `当前nodejs版本为 ${chalk.red(process.version)}, 请保证 >= ${chalk.bold(7)}`);
    process.exit(1);
}
const config = require('../src/config');
//const commonds = ['mpreact', 'nanachi'];

const supportBuildConfig = {
    'wx': {
        support: true,
        text: ''
    },
    'baidu': {
        support: false,
        text: '百度小程序正在努力支持中, 请静候佳音'
    },
    'ali': {
        support: true,
        text: '支付宝小程序正在努力支持中, 请静候佳音'
    },
    'quick': {
        support: false,
        text: '快应用正在努力支持中, 请静候佳音'
    }
};

const program = require('commander');
const VERSION = require('../package').version;
function getBuildType(args){
    let argList = args[0].split(':');
    let type = argList[1];
    type = !type ? 'wx' : type.toLowerCase();
    return type;
}

program
    .name('mpreact')
    .version(VERSION, '-v, --version')
    .parse(process.argv);
let args = program.args;


/* eslint-disable */
if (typeof args[0] === 'undefined') {
    console.error('请指定项目名称');
    console.log(
        `  ${chalk.cyan(program.name())} ${chalk.green('<project-name>')}\n`
    );
    console.log('例如:\n');
    console.log(
        `  ${chalk.cyan(program.name())} ${chalk.green('mpreact-app')}`
    );
    process.exit(1);
}



let buildType =  getBuildType(args);
if(!config[buildType].support ){
    console.log(
        chalk.red(config[buildType].text)
    )
    process.exit(1);
}
config['buildType'] = buildType;

console.log(1);
switch(args[0]){
    case 'start':
        require('../src/index')('start', buildType);
        break;
    case 'build':
        require('../src/index')('build', buildType);
        break;
    default:
        require('../src/init')(args[0]);
}
console.log(2);




