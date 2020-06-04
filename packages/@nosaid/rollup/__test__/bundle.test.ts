import path from 'path';
import { rollupGenerator } from '../src/main';
import { rollup } from 'rollup';

const configList = rollupGenerator([
    {
        input: path.join(__dirname, 'entry.js'),
        output: {
            file: path.join(__dirname, '../temp/bundle-js.js'),
            format: 'umd',
            name: 'TestBundle'
        },
        postcssExtract: true
    },
    {
        input: path.join(__dirname, 'entry.ts'),
        output: {
            file: path.join(__dirname, '../temp/bundle-ts.js'),
            format: 'umd',
            name: 'TestBundle'
        },
        typescript: {
            tsconfig: path.join(__dirname, 'tsconfig.test.json')
        }
    }
]);

describe('test bundle', () => {
    test('bundle javascript file', async () => {
        const config = configList[0];
        const bundle = await rollup(config);
        await bundle.write(config.output);
    });

    test('bundle typescript file', async () => {
        const config = configList[1];
        const bundle = await rollup(config);
        await bundle.write(config.output);
    });
});
