export declare class CSS2DRenderer {
    constructor(element?: HTMLDivElement);
    setSize(width: number, height: number): void;
    domElement: HTMLDivElement;
    render(scene: THREE.Scene, camera: THREE.Camera): void;
}
export declare class CSS2DObject {

    constructor(element?: HTMLDivElement);
    position: THREE.Vector3;
}