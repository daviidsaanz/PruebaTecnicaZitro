import { _decorator, Component, Node, Sprite, SpriteFrame, tween, Vec3, Animation, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SlotsAnim')
export class SlotsAnim extends Component {

    @property({ type: Node })
    public columns: Node[] = [];

    @property({ type: SpriteFrame })
    public symbols: SpriteFrame[] = [];

    @property({ type: Node })
    public celebrateNode: Node = null;

    public isSpinning: boolean = false;
    private resultMatrix: number[][] = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    private columnsFinished: number = 0;
    private timeouts: number[] = [];

    start() {
        if (this.celebrateNode) this.celebrateNode.active = false;
    }

    public spin() {
        if (this.isSpinning) return;
        this.isSpinning = true;
        this.columnsFinished = 0;
        this.randomizeMatrix(this.resultMatrix);
        const delayBetweenColumns = 2000;
        const minSpinTime = 3000;
        this.columns.forEach((col, colIndex) => {
            const id = setTimeout(() => this.spinColumn(col, colIndex, minSpinTime), colIndex * delayBetweenColumns);
            this.timeouts.push(id as unknown as number);
        });
    }

    private spinColumn(column: Node, colIndex: number, duration: number) {
        if (!column || !column.isValid) return;
        const yPositions = [200, 0, -200];
        const finalX = [-295, 0, 295][colIndex];
        const spins = Math.ceil(duration / 50);
        column.children?.forEach((child, rowIndex) => {
            if (!child || !child.isValid) return;
            let seq = tween(child);
            for (let i = 0; i < spins; i++) {
                const randSymbol = this.symbols[Math.floor(Math.random() * this.symbols.length)];
                seq = seq
                    .to(0.05, { position: new Vec3(finalX, yPositions[rowIndex] + 65, 0) })
                    .call(() => {
                        if (child && child.isValid) child.getComponent(Sprite).spriteFrame = randSymbol;
                    })
                    .to(0.05, { position: new Vec3(finalX, yPositions[rowIndex] - 70, 0) });
            }
            const finalSymbol = this.symbols[this.resultMatrix[rowIndex][colIndex]];
            seq.call(() => {
                if (!child || !child.isValid) return;
                child.getComponent(Sprite).spriteFrame = finalSymbol;
                child.setPosition(finalX, yPositions[rowIndex], 0);
                if (rowIndex === column.children.length - 1) {
                    this.columnsFinished++;
                    if (this.columnsFinished === this.columns.length) {
                        this.checkWin();
                        this.isSpinning = false;
                    }
                }
            }).start();
        });
    }

    private checkWin() {
        const [a, b, c] = this.resultMatrix[1];
        if (a === b && b === c) {
            if (this.celebrateNode && this.celebrateNode.isValid) {
                this.celebrateNode.active = true;
                const anim = this.celebrateNode.getComponent(Animation);
                const sound = this.celebrateNode.getComponent(AudioSource);
                if (anim) anim.play('Celebrate');
                if (sound) sound.play();
            }
        } else if (this.celebrateNode && this.celebrateNode.isValid) {
            this.celebrateNode.active = false;
        }
    }

    private randomizeMatrix(matrix: number[][]) {
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                matrix[i][j] = Math.floor(Math.random() * this.symbols.length);
            }
        }
    }

    onDestroy() {
        this.timeouts.forEach(id => clearTimeout(id));
        this.timeouts = [];
    }
}
