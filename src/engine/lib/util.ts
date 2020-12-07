export function loadTextResource(path:string) {
    const baseUrl:string = window.location.origin;
    return fetch(`${baseUrl}${path}`).then(res => res.text());
}