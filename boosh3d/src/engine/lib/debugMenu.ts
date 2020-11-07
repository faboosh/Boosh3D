class DebugMenuItem {
    title:string;
    body:string;
    titleElem:HTMLElement;
    bodyElem:HTMLElement;
    wrapper:HTMLElement;
    style:string;
    textStyle:string;

    constructor(title:string, body: string, parent:HTMLElement) {
        this.wrapper = document.createElement('div');
        this.style = `
            padding: 10px;
        `

        this.textStyle = `
            color: white;
        `

        this.titleElem = document.createElement('h5');
        this.bodyElem = document.createElement('p');

        this.title = title;
        this.body = body;

        this.titleElem.innerText = title;
        this.bodyElem.innerText = body;
        
        this.wrapper.setAttribute('style', this.style);
        this.titleElem.setAttribute('style', this.textStyle);
        this.bodyElem.setAttribute('style', this.textStyle);
        this.wrapper.append(this.titleElem, this.bodyElem);
        parent.append(this.wrapper)
    }
}

class DebugMenuWrapper {
    wrapper:HTMLElement;
    entires:DebugMenuItem[];
    style:string;
    constructor() {
        this.wrapper = document.createElement('div');
        this.style = `
            position: fixed;
            top: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.5);
            width: 40vw;
            min-height: 400px;
        `

        this.entires = [];

        this.wrapper.setAttribute('style', this.style);

        document.body.appendChild(this.wrapper);
    }

    addEntry({title, body}: {title: string, body: string}) {
        this.entires.push(
            new DebugMenuItem(title, body, this.wrapper)
        )

        console.log(this.entires);
    }
}

export const DebugMenu = (function() {
    let instance:DebugMenuWrapper | null = null;
    function getInstance() {
        return instance ?
            instance :
            new DebugMenuWrapper()
    }

    return {
        getInstance
    }
})()


