import enumFactory from './enumFactory';

/**
 * registry 仓库
 */
export const ERegistryType = enumFactory({
    NPM: { value: 'https://registry.npmjs.org/', name: 'npm     -----   https://registry.npmjs.org/' },
    YARN: { value: 'https://registry.yarnpkg.com/', name: 'yarn    -----   https://registry.yarnpkg.com/' },
    TAOBAO: { value: 'https://registry.npm.taobao.org/', name: 'taobao  -----   https://registry.npm.taobao.org/' },
    BAIDU: { value: 'http://registry.npm.baidu-int.com/', name: 'baidu   -----   http://registry.npm.baidu-int.com/' }
});
