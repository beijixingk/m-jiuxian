import moneyView from '../views/money.art'
const BScroll = require('better-scroll')


class Money{
    

    changHash(){
        location.hash=$(this).attr('data-to')
    }
   
    async render(){
        
       
        let html=moneyView({
            
        })
        $('.indexContainer').html(html)

      

        let bScroll = new BScroll.default($('main').get(0),{
            probeType:2
        })
        let $imgFoot =  $('.foot img')
        
        bScroll.on('scroll',function(){
          
            let that=this

            if(this.maxScrollY > this.y){
                $imgFoot.addClass('down')
            }

            $('.backTop').on('tap',function(){
                that.scrollTo(0,0)
            })
        })

        $('.navBar').on('click',function(){
            if($('.nav').css('display')=='none'){
                $('.nav').css('display','flex')
            }
            else{
                $('.nav').css('display','none')
            }
        })
        $('.back').on('click',function(){
            window.history.back(-1); 
        })
        $('.nav li').on('click',this.changHash)

        
        

    }
}

export default new Money()