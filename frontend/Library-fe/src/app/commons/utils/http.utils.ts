export function urlsafe (url, ...params) {
    return url.concat(params.join("/"), '/');
}