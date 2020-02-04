import path from 'path';

console.log(path.join(__dirname));

(async () => {
    const content = await Promise.resolve('hello');
    console.log(content);
})();
