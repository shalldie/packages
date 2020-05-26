/**
 * 导出枚举工厂方法
 * 如果有额外的字段，可以添加到 IEnumxItem 中，请添加注释
 *
 * @example
 *
 * const ProductType = enumxFactory({
 *     HELLO: {value: 'hello', name: '...'},
 *     WORLD: {value: 3, name: ''}
 * });
 *
 * @file enumxFactory.ts
 * @author shalldie
 */

/**
 * 枚举对象的接口
 *
 * @interface IEnumxItem
 */
interface IEnumxItem {
    /**
     * 枚举值
     *
     * @type {string | number}
     * @memberof IEnumxItem
     */
    value: string | number;

    /**
     * 枚举对应的 name
     *
     * @type {string}
     * @memberof IEnumxItem
     */
    name: string;

    /**
     * 模板文件夹名称
     *
     * @type {string}
     * @memberof IEnumxItem
     */
    tpl?: string;
}

interface IEnumxItemOptions {
    [key: string]: IEnumxItem;
}

class Enumx<T extends IEnumxItemOptions> {
    private itemList: IEnumxItem[] = [];

    constructor(options: IEnumxItemOptions) {
        Object.keys(options).forEach(key => {
            (this as any)[key] = options[key].value;
            this.itemList.push(options[key]);
        });
    }

    /**
     * alias 枚举，开发阶段类型推断用
     *
     * @type {keyof T}
     * @memberof Enumx
     */
    public aliasEnum!: keyof T;

    /**
     * 转数组
     *
     * @returns
     * @memberof Enumx
     */
    toArray() {
        return this.itemList.slice();
    }

    /**
     * 根据 value 找枚举项
     *
     * @param {any} value
     * @returns {IEnumxItem}
     * @memberof Enumx
     */
    getItemByValue(value: any): IEnumxItem {
        return this.itemList.find(item => item.value === value) as IEnumxItem;
    }

    /**
     * 根据 value 获取对应枚举项的 name
     *
     * @param {any} value
     * @returns {string}
     * @memberof Enumx
     */
    getNameByValue(value: any): string {
        const item = this.getItemByValue(value);
        return item ? item.name : '';
    }
}

/**
 * 枚举工厂方法
 *
 * @export
 * @template T
 * @param {T} options
 * @returns {(Enumx<T> & {[key in keyof T]: T[key]['value']})}
 */
export default function enumxFactory<T extends IEnumxItemOptions>(
    options: T
): Enumx<T> & { [key in keyof T]: T[key]['value'] } {
    return new Enumx(options) as any;
}
