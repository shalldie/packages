#!/usr/bin/env node

import path from 'path';
import fsp from 'fs/promises';
import inquirer from 'inquirer';
import consola from 'consola';
import shelljs from 'shelljs';
import { ERegistryType } from './common/enums';

async function main() {
    const {
        // 项目名称
        projectName,
        // 版本
        projectVersion,
        // 描述
        projectDescription,
        // npm 源
        registryType
    } = await inquirer.prompt<Record<string, string>>([
        {
            name: 'projectName',
            type: 'input',
            message: 'Please enter the project name.',
            default: 'my-app'
        },
        {
            name: 'projectVersion',
            type: 'input',
            message: 'Please enter the project version.',
            default: '0.0.1'
        },
        {
            name: 'projectDescription',
            type: 'input',
            message: 'Please enter the project description.',
            default: 'My webpack5 project'
        },
        {
            name: 'registryType',
            type: 'list',
            message: 'Please select a registry.',
            choices: ERegistryType.toArray()
        }
    ]);

    // 拷贝文件
    const projectPath = path.join(process.cwd(), projectName);
    shelljs.cp(
        '-r',
        // 源文件
        path.join(__dirname, '../template'),
        // 目标地址
        projectPath
    );
    consola.ready('... files created');

    // 自定义内容， package.json、.npmrc
    const pkgPath = path.join(projectPath, 'package.json');
    const pkgContent = JSON.parse(await fsp.readFile(pkgPath, 'utf-8'));
    pkgContent.name = projectName;
    pkgContent.version = projectVersion;
    pkgContent.description = projectDescription;
    await fsp.writeFile(pkgPath, JSON.stringify(pkgContent, null, '  '), 'utf-8');

    const npmrcPath = path.join(projectPath, '.npmrc');
    await fsp.writeFile(npmrcPath, `registry=${registryType}`, 'utf-8');

    consola.ready('... custom works');

    consola.ready({
        badge: true,
        message: 'All files and config generated ready.'
    });

    consola.info({
        badge: true,
        message: `Now you can run 'cd ${projectName}' and 'npm install'`
    });
}

(async () => {
    try {
        await main();
    } catch (ex) {
        consola.error(ex);
    }
})();
