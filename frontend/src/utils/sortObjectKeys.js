import sortBy from 'lodash/sortBy';
import keys from 'lodash/keys';

export default (obj, comparator) => {
    let objectKeys = sortBy(keys(obj), function (key) {
        return comparator ? comparator(obj[key], key) : key;
    });

    let sortedObject = {};
    objectKeys.forEach((item) => {
        sortedObject[item] = obj[item];
    });

    return sortedObject;
};