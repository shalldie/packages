import path from 'path';
import inquirer from 'inquirer';
import { EProjectType, ELintType, EFormatType } from './common/enums';
import Generator from './lib/Generator';

async function main() {
    const result = await inquirer.prompt([
        {
            name: 'projectType',
            type: 'list',
            message: '选择需要初始化的项目类型',
            choices: EProjectType.toArray()
        }
        // {
        //     name: 'formatType',
        //     type: 'list',
        //     message: '选择格式化工具',
        //     choices: EFormatType.toArray()
        // },
        // {
        //     name: 'lintType',
        //     type: 'list',
        //     message: '选择需要的lint',
        //     choices: ELintType.toArray()
        // }
    ]);

    const item = EProjectType.getItemByValue(result.projectType);
    Generator.load(path.join(__dirname, '../template', item.tpl as string));
}

(async () => {
    try {
        await main();
    } catch (ex) {
        console.log(ex);
    }
})();
