import { _decorator, Component, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TimeZone')
export class TimeZone extends Component {

    @property({ type: Label })
    public timeLabel: Label;

    private apiUrl: string = 'https://worldtimeapi.org/api/timezone/Europe/Madrid';
    private currentTime: number = 0;

    private loading: boolean = false;
    private error: boolean = false;

    start() {
        this.fetchTimeFromAPI();
    }

    private async fetchTimeFromAPI() {
        this.loading = true;
        this.error = false;
        this.timeLabel.string = 'Loading...';
        try {
            const response = await fetch(this.apiUrl);
            if (!response.ok) {
                throw new Error(`Request error: ${response.status}`);
            }
            const data = await response.json();
            const dateTime = new Date(data.datetime);
            this.currentTime = dateTime.getTime();
            this.loading = false;
        } catch (error) {
            console.error('Error fetching time:', error);
            this.error = true;
            this.loading = false;
            this.timeLabel.string = 'Error loading time';
        }
    }

    update(deltaTime: number) {
        if (!this.loading && !this.error && this.currentTime > 0) {
            this.currentTime += deltaTime * 1000; //to update the time every second without making too many requests to the API (prevent block us) ("* 1000" = miliseconds)
            const date = new Date(this.currentTime);
            this.timeLabel.string = date.toLocaleTimeString();
        }
    }
}
