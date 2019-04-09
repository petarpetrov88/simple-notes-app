import md5 from 'md5';

const Session = {
    getEngine: () => {
        return localStorage;
    },
    getKey: (key) => {
        return md5(key);
    },
    set: (key, value) => {
        Session.getEngine().setItem(Session.getKey(key), JSON.stringify(value));
    },
    get: (key) => {
        return JSON.parse(Session.getEngine().getItem(Session.getKey(key)));
    },
    delete: (key) => {
        Session.getEngine().removeItem(Session.getKey(key))
    }
};

export default Session;