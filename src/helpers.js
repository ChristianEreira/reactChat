export const sanitize = (string) => {
    const sanitizeMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;',
        "`": '&grave',
        "%": '&#37;',
        "=": '&#61;',
        "$": '&#36;'
    };
    const reg = /[&<>"'/`%=$]/ig;
    return string.toString().substr(0, 300).replace(reg, (match) => (sanitizeMap[match]));
};