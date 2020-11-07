export const key: {[k: string]: any} = {

}

window.addEventListener('keydown', (e) => {
    key[e.key] = true;
})

window.addEventListener('keyup', (e) => {
    key[e.key] = false;
})

export function onKeyDown(key:string, callback:Function) {
    window.addEventListener('keydown', () => {
        callback()
    })
}

export function onKeyUp(key:string, callback:Function) {
    window.addEventListener('keyup', () => {
        callback()
    })
}

