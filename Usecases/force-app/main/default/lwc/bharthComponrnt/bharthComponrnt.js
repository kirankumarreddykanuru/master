import { LightningElement , wire,api, track} from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import getFloaterList from '@salesforce/apex/Barathclass.getFloaterList';

export default class BharthComponrnt extends LightningElement {

   @track isModalOpen = false;
   visibleFloaters;
   productNames='';
   floaters ; 
   @track val;
   @track id=5;
   @track hlist; 

   @track yearstr = 2021
  
   currentTime = new Date();
   @track year = this.currentTime.getFullYear();
   rclick(){
       if(this.id<11){
          this.id=this.id+1;
      this.val=this.hlist.arr[this.id];
      console.log("id is",this.val.Name);
     
       }
  }
  
  lclick(){
      if(this.id>0){
          this.id=this.id-1;
      this.val=this.hlist.arr[this.id];
      console.log("id is",this.val.Name);
      
      }
    }
    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
    }
    onNumberOneChange (event) {
        this.productQuantity = event.target.label;
        console.log( this.productQuantity);
    }


    @wire(getFloaterList, {Year:  'productNames'})
      getList({error, data}){
       
        if(data){
            console.log('data:' , data);
           
            this.floaters = data.map(item=>{

           
                return{
                    floaterId :item.Id,
                    floaterName : item.Name,
                    floaterDay : item.Day__c,
                    floaterDate : item.date__c,
                    floaterMonth : item.Month__c,
                  
                  // colorKey : 'background-color: '+ item.color__c
            
                 //   colorKey :  document.documentElement.style.setProperty('--titleColor',item.color__c)

           
                   
                  colorValue : item.color__c == 'red' ? 'redClass slds-box slds-text-align_center slds-has-bottom-magnet'  
                    : item.color__c =='green' ? 'greenClass slds-box slds-text-align_center slds-has-bottom-magnet' :
                     'blueClass slds-box slds-text-align_center slds-has-bottom-magnet'
                

                }
            });
            return refreshApex(this.floaters);
            
        }
        if(error){
            console.log('error:' , error);
            this.floaters = undefined;
        }
    }

    colorKey='background-color: red'; 



connectedCallback(){
 

    
    this.hlist={
        arr:[
   { Image: "http://lh5.ggpht.com/_UW7cPrALeSE/S-HSiwx0rsI/AAAAAAAAI9A/QhU9PjvP_qc/006_thumb[2].jpg?imgmax=800",

   Name: "New Year Day",
   Day: "Friday",
   Date: "01 jan 2021"
   },
   { Image:"https://th.bing.com/th/id/OIP.l61dIdCivsEBXMUDX2jkJQHaEY?pid=ImgDet&rs=1",
   Name: "Pongal &amp; Makar Sankranti",
   Day: "Friday",
   Date: "10 jan 2021"
   },
   {Image:"https://th.bing.com/th/id/OIP.4sB04uPzxL559LLoqXithAHaDt?pid=ImgDet&rs=1",
   Name: "Republic Day",
   Day: "Tuesday",
   Date: "26 jan 2021"
   },
   { Image:"https://www.google.com/url?sa=i&url=https%3A%2F%2Findianexpress.com%2Farticle%2Flifestyle%2Fart-and-culture%2Fhappy-maha-shivratri-2019-wishes-images-sms-messages-status-and-photos-for-whatsapp-and-facebook-5606916%2F&psig=AOvVaw11riaTo4-b-RNszkgRSsVS&ust=1634635432673000&source=images&cd=vfe&ved=0CAgQjRxqFwoTCLjl2NDR0_MCFQAAAAAdAAAAABAK",
   Name: "Maha Shivarathri",
   Day: "Tuesday",
   Date: "29 mar 2021"
   },
   { Image:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.news18.com%2Fnews%2Flifestyle%2Fhappy-holi-2021-whatsapp-wishes-sms-and-quotes-to-celebrate-the-festival-of-colours-3577064.html&psig=AOvVaw0ggnaGv384dGwQZG-wt_2J&ust=1634635492992000&source=images&cd=vfe&ved=0CAgQjRxqFwoTCPjc_ufR0_MCFQAAAAAdAAAAABAD",
   Name: "Holy",
   Day: "Friday",
   Date: "02 Apr 2021"
   },
   { Image:"https://www.google.com/url?sa=i&url=https%3A%2F%2Ftimesofindia.indiatimes.com%2Flife-style%2Fevents%2Fgood-friday-2020-wishes-messages-quotes-images-facebook-whatsapp-status%2Farticleshow%2F75063354.cms&psig=AOvVaw3k00956jSivmE8onMj_J0r&ust=1634635531058000&source=images&cd=vfe&ved=0CAgQjRxqFwoTCOjhvoHS0_MCFQAAAAAdAAAAABAD",
   Name: "Good Friday",
   Day: "Friday",
   Date: "02 Apr 2021"
   },
   { Image:"https://www.google.com/url?sa=i&url=https%3A%2F%2Findianexpress.com%2Farticle%2Flifestyle%2Flife-style%2Framadan-mubarak-2020-ramzan-wishes-images-whatsapp-messages-status-quotes-greetings-and-photos-6375496%2F&psig=AOvVaw3mCHQ49M4CALeH-0wU6ez3&ust=1634635577213000&source=images&cd=vfe&ved=0CAgQjRxqFwoTCKDgvZLS0_MCFQAAAAAdAAAAABAD",
   Name: "Ramzan",
   Day: "Friday",
   Date: "14 May 2021"
   },
   { Image:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.en.etemaaddaily.com%2Fworld%2Fhyderabad%2Ftelangana-formation-day-dignitaries-to-unfurl-the-national-flag-on-june-2%3A76422&psig=AOvVaw0ezG6bRtArtCPzy6JM8ouM&ust=1634635616262000&source=images&cd=vfe&ved=0CAgQjRxqFwoTCNjws6TS0_MCFQAAAAAdAAAAABAO",
   Name: "Ts Formation Day(only for HYD Location)",
   Day: "Wednesday",
   Date: "02 jun 2021"
   },
   { Image:"https://www.google.com/url?sa=i&url=https%3A%2F%2Findianexpress.com%2Farticle%2Flifestyle%2Flife-style%2Fbakrid-wishes-images-quotes-whatsapp-messages-status-photos-cards-6517881%2F&psig=AOvVaw35xfpGAsQNcAn6aPF-nlSg&ust=1634635677250000&source=images&cd=vfe&ved=0CAgQjRxqFwoTCLit67_S0_MCFQAAAAAdAAAAABAJ",
   Name: "Bakrid",
   Day: "Wednesday",
   Date: "21 jul 2021"
   },
   {Image:"https://static.vecteezy.com/system/resources/thumbnails/001/249/088/small/yellow-paint-splotch-indian-festival-for-ganesh-chaturthi-card-banner.jpg",
   Name: "Ganesh Chaturthi",
   Day: "Friday",
   Date: "10 Sep 2021"
   },
   { Image:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bajajallianz.com%2Fblog%2Ftravel-insurance-articles%2Fexperience-the-diversity-while-celebrating-dussehra-in-these-indian-states.html&psig=AOvVaw3gapXENkRqZsyOV2Zz0kXC&ust=1634635785954000&source=images&cd=vfe&ved=0CAgQjRxqFwoTCPDV5_bS0_MCFQAAAAAdAAAAABAD",
   Name: "Dussehra",
   Day: "Friday",
   Date: "15 oct 2021"
   },
   { Image:"https://www.google.com/url?sa=i&url=https%3A%2F%2Findianexpress.com%2Farticle%2Flifestyle%2Flife-style%2Fhappy-diwali-2020-deepavali-wishes-images-status-quotes-messages-wallpapers-and-photos-6956237%2F&psig=AOvVaw1jXg3lz6FKpljlhcCf0ObY&ust=1634635822575000&source=images&cd=vfe&ved=0CAgQjRxqFwoTCIiSzoXT0_MCFQAAAAAdAAAAABAD",
   Name: "Deepvali",
   Day: "Thursday",
   Date: "04 Nov 2021"
   }]
   };
   this.val=this.hlist.arr[this.id];
   //console.log("id is",this.val.Name);


    
 
}
handleLeftClick() {
    //Impertive call 
    //Store the recieving data  in floaters
    this.year=this.year-1;
    console.log(this.year);
    
    
}
handleRightClick() {
       
    this.year=this.year+1;
console.log(this.year);        
}



  keysearch(event){
    this.productNames = event.target.label;
    console.log( event.target.label);
  }


}




