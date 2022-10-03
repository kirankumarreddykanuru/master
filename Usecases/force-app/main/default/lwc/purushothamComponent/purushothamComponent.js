
import { LightningElement,track } from 'lwc';
import insertLoginDetails from '@salesforce/apex/Clock.insertLoginDetails';
import updateRecord from '@salesforce/apex/Clock.updateRecord';
export default class KekaPortalCheckIn extends LightningElement {
    @track clockIn ;
    @track clockOut;
    @track error
    @track result;
    @track IsCheckin = true;
    @track IsCheckOut = false; 
    @track currentTime;
    @track timeVal;
    @track timeIntervalInstance;
    @track points;
    totalMilliseconds=0;
    timer = '0'
    timerRef
    

    connectedCallback(){
        this.displayClock();
        }
        
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        displayClock(){
        var display = new Date().toLocaleTimeString();
          this.currentTime = display;
        let d = this;
          setTimeout(()=>{
        d.displayClock();
        }, 1000);
        }

        StartTimerHandler(){
            const startTime = new Date()
            window.localStorage.setItem('startTimer', startTime)
            return startTime
        }

    MemberCheckIn() {
        const startTime = new Date( window.localStorage.getItem("startTimer") || this.StartTimerHandler())
        this.timerRef = window.setInterval(()=>{
            const secsDiff = new Date().getTime() - startTime.getTime()
            this.timer = this.secondToHms(Math.floor(secsDiff/1000))
        }, 1000)
        insertLoginDetails()
            .then(result => {
                var today = new Date();
                var time = today.toLocaleTimeString();//getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                this.clockIn = time;
                this.result = result;
                console.log('ClockinTime====> '+ this.result);
                this.IsCheckin = false;
                this.IsCheckOut = true;
                
            })
            .catch(error => {
                this.error = error;
                console.log('error====> '+ this.error);
            });
    }
    secondToHms(d){
        d = Number(d)
        const h = Math.floor(d / 3600);
        const m = Math.floor(d % 3600 / 60);
        const s = Math.floor(d % 3600 % 60);
        const hDisplay = h > 0 ? h + (h == 1 ? " h, " : " h, ") : "";
        const mDisplay = m > 0 ? m + (m == 1 ? " m, " : " m, ") : "";
        const sDisplay = s > 0 ? s + (s == 1 ? " s" : " s") : "";
        this.points=h+m/60;
        console.log("MINITUES IN"+this.points);
        /*
        console.log("the seconds:"+s);
        console.log("the seconds:"+m);
        console.log("the seconds:"+h);*/

        return hDisplay + mDisplay + sDisplay; 
    }
    MemberCheckOut(){
        /*this.timeVal = '0:0';
        this.totalMilliseconds = 0;
        this.isProgressing = true;
        this.prograssbarval = (points/9)*100;
        console.log("prograssbarvalue is:"+ this.prograssbarval);*/


      
/*this._interval = setInterval(() => {

var prograssbarval = this.points/9*100;
console.log("prograssbarvalue is:"+prograssbarval);

}, 200);*/
this.prograssbarval=this.points/9*100;
this.timer='0'
window.clearInterval(this.timerRef)
window.localStorage.removeItem('startTimer')
        updateRecord({recordId : this.result}  )
        .then(result => {
            var today = new Date();
            var time = today.toLocaleTimeString();//getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            this.clockOut = time;
            this.IsCheckOut = false;
            this.IsCheckin = true;
           
        })
        .catch(error => {
            this.error = error;
        });
   }
   showToolTip(){
       
   }

}