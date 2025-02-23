# Orbit Controls ES6

Little update to Orbit Controls from three.js to support ES6 modules

## Install
`npm i threejs-orbit-controls --save`


## Example
```js
import OrbitControls from 'threejs-orbit-controls';

const controls = new OrbitControls(camera, renderer.domElement);
controls.enabled = true;
controls.maxDistance = 1500;
controls.minDistance = 0;
```
