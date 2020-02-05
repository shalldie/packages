import enumFactory from './enumFactory';

/**
 * 项目类型
 */
export const EProjectType = enumFactory({
    LIB_UMD: { value: 'LIB_UMD', name: 'umd打包的库', tpl: 'lib_umd' },
    COMMONJS: { value: 'COMMONJS', name: 'commonjs，用于node', tpl: 'commonjs' }
} as const);

/**
 * 代码格式化工具
 */
export const EFormatType = enumFactory({
    NONE: { value: 'NONE', name: 'none' },
    PRETTIER: { value: 'PRETTIER', name: 'prettier' }
} as const);

/**
 * lint 类型
 */
export const ELintType = enumFactory({
    NONE: { value: 'NONE', name: 'none' },
    ESLINT_FOR_TS: { value: 'ESLINT_FOR_TS', name: 'eslint for typescript' }
} as const);
