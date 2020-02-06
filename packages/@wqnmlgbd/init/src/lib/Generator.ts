import fse from 'fs-extra';
import consola from 'consola';
import path from 'path';
import deepmerge from 'deepmerge';

const PKG_NAME = 'package.json';

export default class Generator {
    private tplDir!: string;

    constructor(tplDir: string) {
        this.tplDir = tplDir;
    }

    public static async load(tplDir: string) {
        const instance = new Generator(tplDir);
        await instance.initialize();
    }

    public async initialize() {
        await this.copyTemplate();
    }

    /**
     * 复制静态文件模板
     *
     * @private
     * @memberof Generator
     */
    private async copyTemplate() {
        const files = await fse.readdir(this.tplDir);

        for (const file of files) {
            if (file === PKG_NAME) {
                await this.extendPkg();
                continue;
            }

            await fse.copy(path.join(this.tplDir, file), path.join(process.cwd(), file));
            consola.info(`...generate ${file}`);
        }
        consola.ready(`ready ......done ${path.basename(this.tplDir)}`);
    }

    private async extendPkg() {
        const srcPkgPath = path.join(this.tplDir, PKG_NAME);
        const destPkgPath = path.join(process.cwd(), PKG_NAME);
        if (!fse.existsSync(srcPkgPath) || !fse.existsSync(destPkgPath)) {
            return;
        }

        const srcPkg = JSON.parse(await fse.readFile(srcPkgPath, 'utf-8'));
        const destPkg = JSON.parse(await fse.readFile(destPkgPath, 'utf-8'));

        const pkg = deepmerge(destPkg, srcPkg);
        await fse.writeFile(destPkgPath, JSON.stringify(pkg, null, '  '), 'utf-8');
        consola.info(`...extend ${PKG_NAME}`);
    }
}
