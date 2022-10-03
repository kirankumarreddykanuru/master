import { LightningElement } from 'lwc';

export default class ProgressBar extends LightningElement {
    progress = 0;
    isProgressing = false;

    updateProgress() {
        this.progress =
            this.progress === 100 ? this.resetProgress() : this.progress + 10;
    }

    resetProgress() {
        this.progress = 0;
        clearInterval(this._interval);
    }

    disconnectedCallback() {
        clearInterval(this._interval);
    }

    get computedLabel() {
        return this.isProgressing ? 'Stop' : 'Start';
    }

    toggleProgress() {
        if (this.isProgressing) {
            // stop
            this.isProgressing = false;
            if (!this.progress) {
                this.progress = 0;
            }
            clearInterval(this._interval);
        } else {
            // start
            this.isProgressing = true;
            this._interval = setInterval(this.updateProgress.bind(this), 200);
        }
    }
}