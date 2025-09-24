import { _decorator, Component } from 'cc';
import { SlotsAnim } from './SlotsAnim';
const { ccclass, property } = _decorator;

@ccclass('BetButton')
export class BetButton extends Component {

    @property({ type: SlotsAnim })
    public slots: SlotsAnim = null;

    onClick() {
        if (!this.slots.isSpinning) {
            this.slots.spin();
        }
    }
}
