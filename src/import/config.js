module.exports = {
    isNumber: vars => Number.isInteger(vars),

    isArray: vars => Array.prototype.isArray(vars),

    isObject: vars => typeof vars === 'object' && vars !== null && !this.isArray(vars),

    isFunction: obj => typeof obj === 'function' && typeof obj.nodeType !== 'number',

    isset: vars => typeof vars !== 'undefined' && vars !== null,

    placeholders: fn => {
        let str = ''
        for (let i = 1; i <= fn; i++) {
            if (i === fn) {
                str += '?'
                break
            }
            str += '?, '
        }
        return str
    },

    promisify: fn => {
        return function () {
            return new Promise(
                (resolve, reject) => fn(
                    ...Array.from(arguments),
                    (err, data) => err ? reject(err) : resolve(data)
                )
            )
        }
    },

    extend: out => {
        out = out || {};

        for (let i = 1; i < arguments.length; i++) {
            let obj = arguments[i];

            if (!obj)
                continue;

            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (typeof obj[key] === 'object'){
                        if(obj[key] instanceof Array)
                            out[key] = obj[key].slice(0);
                        else
                            out[key] = this.extend(out[key], obj[key]);
                    }
                    else
                        out[key] = obj[key];
                }
            }
        }

        return out;
    },

    mixField: fn => {
        let str = ''
        for (let x in fn) {

        }
        return str
    }
}
