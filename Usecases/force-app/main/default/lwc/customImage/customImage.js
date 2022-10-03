import { LightningElement , api} from 'lwc';
const Card_Visible_classes = 'slds-show'
const Card_Hidden_classes ='slds-hide'
export default class CustomImage extends LightningElement {
    slides=[]
    slideIndex =1;

    @api get slidesData(){
          return this.slides

    }

    set slidesData(data){
        this.slides= data.map((item, index)=>{

                return index === 0 ? {
                ...item,
                slideIndex: index+1,
                cardClasses:Card_Visible_classes
                }:{
                    ...item,
                    slideIndex: index+1,
                    cardClasses:Card_Hidden_classes

                }
        })
        
    }

    backslide(){
        let slideIndex = this.slideIndex-1
        this.selectSlideHandler(slideIndex)

    }

    forwardSlide(){
        let slideIndex = this.slideIndex +1 
        this.selectSlideHandler(slideIndex)
    }

    selectSlideHandler(id){
        if(id > this.slides.length){
            this.slideIndex =1
        }else if(id<1){
            this.slideIndex = this.slides.length

        } else{
                this.slideIndex =1
        }


        this.slides= this.slides.map(item=>{

            return this.slideIndex === item.slideIndex ? {
            ...item,
           
            cardClasses:Card_Visible_classes
            }:{
                ...item,
               
                cardClasses:Card_Hidden_classes

            }
    })

    }

}