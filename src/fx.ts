export function bloom(ctx:CanvasRenderingContext2D) {
    const { width, height } = ctx.canvas;
    const image = ctx.getImageData(0, 0, width, height);

    ctx.clearRect(0, 0, width, height);
    ctx.filter = 'blur(5px)';
    ctx.putImageData(image, 0, 0);
}