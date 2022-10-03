import { LightningElement, api ,track} from 'lwc';

export default class Clock extends LightningElement {
    @api flexipageRegionWidth;

  //reactive properties for time and greeting
  @track time = "8:22 AM";
  @track greeting = "Good Morning";

  connectedCallback() {
    //get current time
    this.getTime();

    

    //get time periodically after every minute
    setInterval(() => {
      this.getTime();
    }, 1000 );
  }

  /**
   * Get time and parse in human readable format
   * It follows 12 hour format
   */
  getTime() {
    const date = new Date(); /* creating object of Date class */
    const hour = date.getHours();
    const min = date.getMinutes();

    this.time = `${this.getHour(hour)}:${this.getDoubleDigit(
      min
    )} ${this.getMidDay(hour)}`;
    //get greeting (mornig/afternoon/evening/)
    this.setGreeting(hour);
  }

  //Convert 24 hours format to 12 hours format
  getHour(hour) {
    return hour == 0 ? 12 : hour > 12 ? hour - 12 : hour;
  }

  //convert single digit to double digit
  getDoubleDigit(digit) {
    return digit < 10 ? "0" + digit : digit;
  }

  //return AM or PM based on current hour
  getMidDay(hour) {
    return hour >= 12 ? "PM" : "AM";
  }

  //return greeting based on current hour
  setGreeting(hour) {
    if (hour < 12) {
      this.greeting = "Good Morning!! Welcome to Loan Application";
    } else if (hour >= 12 && hour < 17) {
      this.greeting = "Good Afternoon!! Welcome to Loan Application";
    } else {
      this.greeting = "Good Evening!! Welcome to Loan Application";
    }
  }
}




/* <modal-container role="dialog" tabindex="-1" class="modal fade show" style="display: block;" aria-modal="true"><div role="document" class="modal-dialog small-modal"><div class="modal-content"><div class="p-20"><div class="d-flex align-items-center justify-content-between custom-modal"><div class="d-flex align-items-center"><h5>Holidays</h5><div class="d-flex align-items-center ml-20 mt-4"><a class="icon-click"><span class="icon ic-chevron-left icon-sm"></span></a><span class="mx-4">2021</span><a class="icon-click"><span class="icon ic-chevron-right icon-sm"></span></a></div></div><span class="ic-close icon icon-sm"></span></div><div class="mt-20"><div class="row clear-margin-x ng-star-inserted"><div class="col-sm-6 clear-padding-l"><div class="d-flex align-items-center mb-10 opacity-5 ng-star-inserted"><div class="border rounded text-center w-60 border-color-aqua"><div class="text-white h-20 d-flex align-items-center bg-accent-aqua"><p class="text-x-small text-uppercase mx-auto">Jan</p></div><div class="h-30"><h4>01</h4></div></div><div class="ml-16"><div class="d-flex align-items-center"><p>New Year's Day*</p><!----></div><div><p class="text-small text-secondary">Friday</p></div></div></div><div class="d-flex align-items-center mb-10 opacity-5 ng-star-inserted"><div class="border rounded text-center w-60 border-color-aqua"><div class="text-white h-20 d-flex align-items-center bg-accent-aqua"><p class="text-x-small text-uppercase mx-auto">Jan</p></div><div class="h-30"><h4>14</h4></div></div><div class="ml-16"><div class="d-flex align-items-center"><p>Pongal &amp; Makar Sankranti</p><span class="badge bg-accent-brown ml-10 ng-star-inserted">Floater</span><!----></div><div><p class="text-small text-secondary">Thursday</p></div></div></div><div class="d-flex align-items-center mb-10 opacity-5 ng-star-inserted"><div class="border rounded text-center w-60 border-color-aqua"><div class="text-white h-20 d-flex align-items-center bg-accent-aqua"><p class="text-x-small text-uppercase mx-auto">Jan</p></div><div class="h-30"><h4>26</h4></div></div><div class="ml-16"><div class="d-flex align-items-center"><p>Republic Day*</p><!----></div><div><p class="text-small text-secondary">Tuesday</p></div></div></div><div class="d-flex align-items-center mb-10 opacity-5 ng-star-inserted"><div class="border rounded text-center w-60 border-color-brown"><div class="text-white h-20 d-flex align-items-center bg-accent-brown"><p class="text-x-small text-uppercase mx-auto">Mar</p></div><div class="h-30"><h4>11</h4></div></div><div class="ml-16"><div class="d-flex align-items-center"><p>Maha Shivrathri</p><span class="badge bg-accent-brown ml-10 ng-star-inserted">Floater</span><!----></div><div><p class="text-small text-secondary">Thursday</p></div></div></div><div class="d-flex align-items-center mb-10 opacity-5 ng-star-inserted"><div class="border rounded text-center w-60 border-color-brown"><div class="text-white h-20 d-flex align-items-center bg-accent-brown"><p class="text-x-small text-uppercase mx-auto">Mar</p></div><div class="h-30"><h4>29</h4></div></div><div class="ml-16"><div class="d-flex align-items-center"><p>Holi</p><span class="badge bg-accent-brown ml-10 ng-star-inserted">Floater</span><!----></div><div><p class="text-small text-secondary">Monday</p></div></div></div><div class="d-flex align-items-center mb-10 opacity-5 ng-star-inserted"><div class="border rounded text-center w-60 border-color-blue"><div class="text-white h-20 d-flex align-items-center bg-accent-blue"><p class="text-x-small text-uppercase mx-auto">Apr</p></div><div class="h-30"><h4>02</h4></div></div><div class="ml-16"><div class="d-flex align-items-center"><p>Good Friday</p><span class="badge bg-accent-brown ml-10 ng-star-inserted">Floater</span><!----></div><div><p class="text-small text-secondary">Friday</p></div></div></div><div class="d-flex align-items-center mb-10 opacity-5 ng-star-inserted"><div class="border rounded text-center w-60 border-color-blue"><div class="text-white h-20 d-flex align-items-center bg-accent-blue"><p class="text-x-small text-uppercase mx-auto">Apr</p></div><div class="h-30"><h4>13</h4></div></div><div class="ml-16"><div class="d-flex align-items-center"><p>Ugadi/Gudi Padwa</p><span class="badge bg-accent-brown ml-10 ng-star-inserted">Floater</span><!----></div><div><p class="text-small text-secondary">Tuesday</p></div></div></div><!----></div><div class="col-sm-6 clear-padding-x"><div class="d-flex align-items-center mb-10 opacity-5 ng-star-inserted"><div class="border rounded text-center w-60 border-color-yellow"><div class="text-white h-20 d-flex align-items-center bg-accent-yellow"><p class="text-x-small text-uppercase mx-auto">May</p></div><div class="h-30"><h4>14</h4></div></div><div class="ml-16"><div class="d-flex align-items-center"><p>Ramzan/Id-ul-Fitr</p><span class="badge bg-accent-brown ml-10 ng-star-inserted">Floater</span><!----></div><div><p class="text-small text-secondary">Friday</p></div></div></div><div class="d-flex align-items-center mb-10 opacity-5 ng-star-inserted"><div class="border rounded text-center w-60 border-color-violet"><div class="text-white h-20 d-flex align-items-center bg-accent-violet"><p class="text-x-small text-uppercase mx-auto">Jun</p></div><div class="h-30"><h4>02</h4></div></div><div class="ml-16"><div class="d-flex align-items-center"><p>TS Formation day*(Only for HYD Location)</p><span class="badge bg-accent-brown ml-10 ng-star-inserted">Floater</span><!----></div><div><p class="text-small text-secondary">Wednesday</p></div></div></div><div class="d-flex align-items-center mb-10 opacity-5 ng-star-inserted"><div class="border rounded text-center w-60 border-color-green"><div class="text-white h-20 d-flex align-items-center bg-accent-green"><p class="text-x-small text-uppercase mx-auto">Jul</p></div><div class="h-30"><h4>21</h4></div></div><div class="ml-16"><div class="d-flex align-items-center"><p>Bakrid</p><span class="badge bg-accent-brown ml-10 ng-star-inserted">Floater</span><!----></div><div><p class="text-small text-secondary">Wednesday</p></div></div></div><div class="d-flex align-items-center mb-10 opacity-5 ng-star-inserted"><div class="border rounded text-center w-60 border-color-aqua"><div class="text-white h-20 d-flex align-items-center bg-accent-aqua"><p class="text-x-small text-uppercase mx-auto">Sep</p></div><div class="h-30"><h4>10</h4></div></div><div class="ml-16"><div class="d-flex align-items-center"><p>Ganesh Chaturthi</p><span class="badge bg-accent-brown ml-10 ng-star-inserted">Floater</span><!----></div><div><p class="text-small text-secondary">Friday</p></div></div></div><div class="d-flex align-items-center mb-10 ng-star-inserted"><div class="border rounded text-center w-60 border-color-red"><div class="text-white h-20 d-flex align-items-center bg-accent-red"><p class="text-x-small text-uppercase mx-auto">Oct</p></div><div class="h-30"><h4>15</h4></div></div><div class="ml-16"><div class="d-flex align-items-center"><p>Dussehra</p><span class="badge bg-accent-brown ml-10 ng-star-inserted">Floater</span><!----></div><div><p class="text-small text-secondary">Friday</p></div></div></div><div class="d-flex align-items-center mb-10 ng-star-inserted"><div class="border rounded text-center w-60 border-color-brown"><div class="text-white h-20 d-flex align-items-center bg-accent-brown"><p class="text-x-small text-uppercase mx-auto">Nov</p></div><div class="h-30"><h4>04</h4></div></div><div class="ml-16"><div class="d-flex align-items-center"><p>Deepavali</p><span class="badge bg-accent-brown ml-10 ng-star-inserted">Floater</span><!----></div><div><p class="text-small text-secondary">Thursday</p></div></div></div><!----></div></div><!----><!----></div></div></div></div></modal-container>
*/