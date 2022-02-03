export function toPriceFormat(num) {
    return (num*1).toLocaleString("ko-kr");
}

export function millisToDate(millis) {
    return new Date(millis).toLocaleDateString();
}
export function millisToTime(millis) {
    return new Date(millis).toLocaleTimeString();
}