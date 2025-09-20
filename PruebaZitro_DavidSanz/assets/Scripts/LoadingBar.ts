/* 
    ORIGINAL CODE FROM:
    https://github.com/cocos/cocos-test-projects/blob/v3.8/assets/cases/ui/11.progress/progress.ts 
*/

import { _decorator, Component, ProgressBar, director } from "cc";
const { ccclass, property } = _decorator;

@ccclass('LoadingBar')
export class LoadingBar extends Component {

    @property({ type: ProgressBar })
    public ProgressBar: ProgressBar = null!;

    private timer = 0;
    private maxSeconds = 10;

    start() {
        this.ProgressBar.progress = 0;
        this.timer = 0;
    }

    pro(num: number) {
        this.ProgressBar.progress = num;
    }

    update(deltaTime: number) {
        this.timer += deltaTime; 
        let progress = this.timer / this.maxSeconds;

        if (progress >= 1) {
            console.log("Loading complete");
            director.loadScene("Menú");
        }

        this.pro(progress);
    }
}
