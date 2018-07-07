export const len6 = function len6(value) {
    if (typeof value !== 'number' && typeof value !== 'string') { return value };
    if (value.length > 6) {
        return String(value).substr(0,6) + '...';
    } else {
        return value;
    }
}

export const len10 = function len10(value) {
    if (typeof value !== 'number' && typeof value !== 'string') { return value };
    if (value.length > 8) {
        return String(value).substr(0,8) + '...';
    } else {
        return value;
    }
}

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

export const toJson = function toJson(obj) {
    if (typeof obj !== "object") {
        return obj;
    }
    return JSON.stringify(obj);
}