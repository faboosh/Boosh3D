
export class AsyncAction {
    duration:number;
    name:string;
    action:Function;
    stopCondition:Function | undefined;
    constructor(name:string, duration:number, action:Function, stopCondition?: Function) {
        this.name = name;
        this.duration = duration;
        this.action = action;
        this.stopCondition = stopCondition;
    }

    do() {
        this.duration--;
        if(this.duration > 0) {
            if(!this.stopCondition || !this.stopCondition()) {
                this.action();
            }
        }
    }
}