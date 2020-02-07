import fse from 'fs-extra';
import consola from 'consola';
import path from 'path';
import deepmerge from 'deepmerge';

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
        const files = await this.getAllFiles();
        for (const srcPath of files) {
            const relativePath = path.relative(this.tplDir, srcPath);
            const destPath = path.join(process.cwd(), relativePath);
            await this.copyFile(srcPath, destPath);
        }
        consola.ready(`ready ......done ${path.basename(this.tplDir)}`);
    }

    private async getAllFiles(dir: string = this.tplDir): Promise<string[]> {
        const list: string[] = [];
        const files = await fse.readdir(dir);

        for (const file of files) {
            const fullPath = path.join(dir, file);
            if (fse.statSync(fullPath).isDirectory()) {
                list.push(...(await this.getAllFiles(fullPath)));
                continue;
            }
            list.push(fullPath);
        }

        return list;
    }

    private async copyFile(src: string, dest: string) {
        if (fse.existsSync(dest) && !fse.statSync(dest).isDirectory()) {
            await this.extendFile(src, dest);
            return;
        }
        await fse.copy(src, dest);
        consola.info(`...generate ${path.basename(dest)}`);
    }

    private async extendFile(src: string, dest: string) {
        try {
            if (!fse.existsSync(src) || !fse.existsSync(dest)) {
                return;
            }

            const srcJSON = JSON.parse(await fse.readFile(src, 'utf-8'));
            const destJSON = JSON.parse(await fse.readFile(dest, 'utf-8'));

            const pkg = deepmerge(destJSON, srcJSON);
            await fse.writeFile(dest, JSON.stringify(pkg, null, '  '), 'utf-8');
            consola.info(`...extend ${dest}`);
        } catch (ex) {
            consola.warn(`...ignore ${dest}`);
        }
    }
}
