import { _decorator, Component, director } from "cc";
const { ccclass, property } = _decorator;

@ccclass("ButtonManager")
export class ButtonManager extends Component {

    @property
    public sceneName: string = "";

    onClick() {
        if (this.sceneName && this.sceneName.trim() !== "") {
            console.log("Loading scene: ", this.sceneName);
            director.loadScene(this.sceneName);
        } else {
            console.warn("Scene not found");
        }
    }
}
