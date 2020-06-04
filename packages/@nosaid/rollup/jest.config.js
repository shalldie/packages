// eslint-disable-next-line
module.exports = {
    moduleNameMapper: {
        // '^@/(.*)$': '<rootDir>/$1',
        // '^vue$': 'vue/dist/vue.common.js',
        // '^~/(.*)$': '<rootDir>/client/$1'
    },
    moduleFileExtensions: ['ts', 'js', 'json'],
    transform: {
        '^.+\\.js$': 'babel-jest',
        '^.+\\.tsx?$': 'ts-jest'
    }
};
