import { _decorator, Component, Label, UIOpacity, tween } from 'cc';
import { QuizModel } from './QuizModel';
const { ccclass, property } = _decorator;

@ccclass('QuizView')
export class QuizView extends Component {

    @property({ type: Label })
    public labelText: Label = null;

    @property([Label])
    public answerLabels: Label[] = [];

    @property({ type: QuizModel })
    public jsonReaderComponent: QuizModel = null;

    public questions = [];
    private answers = [];
    public correct = [];
    private labelOpacity: UIOpacity = null;

    public onDataReady: Function;

    async start() {
        this.labelOpacity = this.labelText.getComponent(UIOpacity) || this.labelText.addComponent(UIOpacity);
        this.labelOpacity.opacity = 0;

        while (!this.jsonReaderComponent.dataJson) {
            await new Promise(res => setTimeout(res, 50));
        }

        this.questions = this.jsonReaderComponent.dataJson.quiz.map(q => q.question);
        this.answers = this.jsonReaderComponent.dataJson.quiz.map(q => q.answers);
        this.correct = this.jsonReaderComponent.dataJson.quiz.map(q => q.correct);

        if (this.onDataReady) {
            this.onDataReady();
        }
    }

    public displayQuestionWithFade(i: number, duration = 0.5) {
        if (!this.questions[i]) return;

        this.labelOpacity.opacity = 0;
        this.labelText.string = this.questions[i];

        tween(this.labelOpacity)
            .to(duration, { opacity: 255 })
            .start();

        this.updateAnswerLabels(i);
    }

    private updateAnswerLabels(questionIndex: number) {
        for (let i = 0; i < this.answerLabels.length; i++) {
            const answerLabel = this.answerLabels[i];
            const answerText = this.answers[questionIndex][i];
            answerLabel.string = answerText;
        }
    }
}
