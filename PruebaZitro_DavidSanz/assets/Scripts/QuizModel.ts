
import { _decorator, Component, JsonAsset, Node, resources } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('QuizModel')
export class QuizModel extends Component {
    public dataJson = null!;
    private path = 'quiz';
    start() {
        resources.load(`JSON/${this.path}`, JsonAsset, (err, quiz) => {
            if (err) {
                console.error(err);
                return
            }
            this.dataJson = quiz.json;
        })
    }
}

