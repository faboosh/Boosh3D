import { Vec } from "./math";

export function drawPolygon(polygon:Vec[], ctx:CanvasRenderingContext2D) {
    ctx.strokeStyle = "#cc22ff";
    ctx.fillStyle = "#333";
    
    const first:Vec = polygon[0];

    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(first.x, first.y);
    polygon.forEach(point => {
        ctx.lineTo(point.x, point.y)
    })
    ctx.lineTo(first.x, first.y);
    ctx.fill();
    ctx.stroke();
}