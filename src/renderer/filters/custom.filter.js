export const lenLimit = function lenLimit(value, len) {
    if (typeof value !== 'number' && typeof value !== 'string') { return value };
    if (value.length > len) {
        return String(value).substr(0,len) + '...';
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

export const toPrice = function toPrice(price) {
    if (isNaN(parseFloat(price)) || !price) {
        return price;
    }

    let priceStr = price * 100 + '';
    if (!!(~priceStr.indexOf('.'))) {
        return priceStr;
    } else {
        priceStr = priceStr.slice(0, priceStr.length - 2) + '.' + priceStr.slice(-2);
        return priceStr;
    }
}