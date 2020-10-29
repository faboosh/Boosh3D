export const canvas = <HTMLCanvasElement> document.querySelector('#render');
export const ctx:CanvasRenderingContext2D = canvas.getContext('2d');

export function initCanvas() {
    const height:number = window.innerHeight;
    const width:number = window.innerWidth;
    canvas.height = height;
    canvas.width = width;
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, width, height);

    const size = {
        width,
        height,
        center: {
            x: width / 2,
            y: height / 2
        }
    }

    return size;
}