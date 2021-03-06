# install
```
npm i dust-core -S
```
# usage
## entry file
```
import dust from 'dust-core';
// register application
dust.registerApplication('app1', 'app1.js');
dust.registerApplication('app2', 'app2.js');
// boot application
dust.boot();
```
## app
```
import dust from 'dust-core';
// here using vue、reat or angular to render app.
const render = (mount) => {
    console.log('render', mount);
    const m = document.getElementById(mount);
    m.textContent = 'app1';
}
// start app.
dust.start({
    name: 'app1',
    render,
});
```