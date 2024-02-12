const { randomBytes } = require('crypto');

class Key {
    static generateKey(size = 32, format = 'base64') {
        const buffer = randomBytes(size);
        return buffer.toString(format);
    }
}

module.exports = Key;