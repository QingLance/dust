import * as singleSpa from 'single-spa';

class Dust {
    constructor() {
        this.apps = {};
        this.cache = {};
    }

    createScript(name, entry) {
        return new Promise((resolve, reject) => {
            let script = document.getElementById(`script-${name}`);
            if (!script) {
                script = document.createElement('script');
                script.src = entry;
                script.id = `script-${name}`;
                script.setAttribute('type', 'text/javascript');
                script.onload = () => {
                    resolve();
                };
                script.onerror = () => {
                    reject('load script error');
                };
                document.body.appendChild(script);
            } else {
                resolve();
            }
        });
    }

    bootstrap(opts) {
        console.log('bootstrap', opts);
        return Promise.resolve();
    }

    mount(opts, entry) {
        console.log('mount', opts);
        const { name } = opts;
        return this.createScript(name, entry).then(() => {
            let domEl = document.getElementById(name);
            if (!domEl) {
                domEl = document.createElement('div');
                domEl.setAttribute('id', name);
                document.body.appendChild(domEl);
            }
            const { render } = this.apps[name];
            render(name);
        });
    }

    /**
     * 卸载节点
     * @param {*} opts 
     */
    unmount(opts) {
        console.log('unmount', opts);
        const { name } = opts;
        return Promise.resolve().then(() => {
            const unmount = document.getElementById(name);
            unmount.parentNode.removeChild(unmount);
        });
    }

    load(entry) {
        return Promise.resolve({
            mount: (opts) => this.mount(opts, entry),
            bootstrap: this.bootstrap,
            unmount: this.unmount,
        });
    }

    start(opts) {
        const { render, name } = opts;
        this.apps[name].render = render;
    }

    boot() {
        Object.keys(this.apps).forEach((key) => {
            const { name, load, active } = this.apps[key];
            singleSpa.registerApplication(
                name,
                load,
                active,
            );
        });
        singleSpa.start();
    }

    registerApplication(name, entry) {
        this.apps[name] = {
            name,
            load: () => this.load(entry),
            active: (location) => location.hash.startsWith(`#${name}`),
        }
    }
}

/**
 * 注册到全局
 */
let dust = window.dust;
if (!dust) {
    window.dust = new Dust();
    dust = window.dust;
}

export default dust;
