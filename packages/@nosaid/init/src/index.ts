#!/usr/bin/env node

import path from 'path';
import inquirer from 'inquirer';
import { EProjectType, ELintType, EFormatType, ERegistryType } from './common/enums';
import Generator from './lib/Generator';
import { writeFile } from 'fs-extra';
import consola from 'consola';

async function main() {
    const result = await inquirer.prompt([
        {
            name: 'projectType',
            type: 'list',
            message: '选择需要初始化的项目类型',
            choices: EProjectType.toArray()
        },
        {
            name: 'formatType',
            type: 'list',
            message: '选择格式化工具',
            choices: EFormatType.toArray()
        },
        {
            name: 'lintType',
            type: 'list',
            message: '选择需要的lint',
            choices: ELintType.toArray()
        },
        {
            name: 'registryType',
            type: 'list',
            message: '选择源',
            choices: ERegistryType.toArray()
        }
    ]);

    const generateList: string[] = [];

    // project
    const item = EProjectType.getItemByValue(result.projectType);
    generateList.push(item.tpl as string);

    // format
    if (result.formatType !== EFormatType.NONE) {
        generateList.push(EFormatType.getItemByValue(result.formatType).tpl as string);
    }

    // lint
    if (result.lintType !== ELintType.NONE) {
        generateList.push(ELintType.getItemByValue(result.lintType).tpl as string);
    }

    for (const name of generateList) {
        await Generator.load(path.join(__dirname, '../template', name));
    }
    // registry
    if (result.registryType !== ERegistryType.NONE) {
        await writeFile(path.join(process.cwd(), '.npmrc'), `registry=${result.registryType}`, 'utf-8');
        consola.ready('...create .npmrc');
    }

    consola.ready({
        badge: true,
        message: 'All files and config generated ready.'
    });
}

(async () => {
    try {
        await main();
    } catch (ex) {
        console.log(ex);
    }
})();
