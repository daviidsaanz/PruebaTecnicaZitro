import { _decorator, Component, Button, Sprite, Color, UIOpacity, tween, Node } from 'cc';
import { QuizView } from './QuizView';
const { ccclass, property } = _decorator;

@ccclass('QuizManager')
export class QuizManager extends Component {

    @property([Button])
    buttons: Button[] = [];

    @property({ type: QuizView })
    quizView: QuizView = null;

    @property({ type: Sprite })
    feedbackSprite: Sprite = null;

    @property({ type: Node })
    endScreen: Node = null;

    currentQuestion = 0;
    feedbackOpacity: UIOpacity = null;

    start() {
        if (this.feedbackSprite) {
            this.feedbackOpacity = this.feedbackSprite.getComponent(UIOpacity) || this.feedbackSprite.addComponent(UIOpacity);
            this.feedbackOpacity.opacity = 0;
        }

        if (this.endScreen) {
            this.endScreen.active = false;
        }

        this.buttons.forEach((btn, index) => {
            btn.node.on(Button.EventType.CLICK, () => this.checkAnswer(index), this);
        });

        this.quizView.onDataReady = () => this.startQuiz();
    }

    startQuiz() {
        this.currentQuestion = 0;
        this.quizView.displayQuestionWithFade(this.currentQuestion, 2);
    }

    checkAnswer(answerIndex: number) {
        const correctIndex = this.quizView.correct[this.currentQuestion];
        const isCorrect = (answerIndex === correctIndex);
        this.showFeedback(isCorrect);
    }

    showFeedback(isCorrect: boolean) {
        if (!this.feedbackOpacity) {
            this.nextQuestion();
            return;
        }

        this.feedbackSprite.color = isCorrect ? Color.GREEN : Color.RED;
        this.feedbackOpacity.opacity = 0;

        tween(this.feedbackOpacity)
            .to(0.3, { opacity: 100 })
            .delay(0.5)
            .to(0.3, { opacity: 0 })
            .call(() => this.nextQuestion())
            .start();
    }

    nextQuestion() {
        this.currentQuestion++;

        if (this.currentQuestion < this.quizView.questions.length) {
            this.quizView.displayQuestionWithFade(this.currentQuestion, 2);
        } else {
            this.endQuiz();
        }
    }

    endQuiz() {
        if (this.endScreen) {
            this.endScreen.active = true;
        }
    }
}
