import { _decorator, Component, director } from "cc";
const { ccclass, property } = _decorator;

@ccclass("ButtonManager")
export class ButtonManager extends Component {

    @property
    public sceneName: string = "";

    onClick() {
        if (this.sceneName && this.sceneName.trim() !== "") {
            director.loadScene(this.sceneName);
        } else {
            console.warn("Scene not found");
        }
    }
}
