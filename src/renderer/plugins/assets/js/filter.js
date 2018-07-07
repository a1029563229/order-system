export const len12 = function len12(value) {
    if (typeof value !== 'number' && typeof value !== 'string') { return value };
    if (value.length > 12) {
        return String(value).substr(0,12) + '...';
    } else {
        return value;
    }
}

export const len50 = function len50(value) {
    if (typeof value !== 'number' && typeof value !== 'string') { return value };
    if (value.length > 30) {
        return String(value).substr(0,30) + '...';
    } else {
        return value;
    }
}

