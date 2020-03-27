import jiamengView from '../views/jiameng.art'
const BScroll = require('better-scroll')


class Jiameng{
    constructor(){
        this.list=[]
        this.pageNo=1
        this.count=0

    }

    changHash(){
        location.hash=$(this).attr('data-to')
    }
   
    async render(){
        let that=this
        this.pageNo = 1
        $('.foot').css('display','block')
        $('.all').css('display','none')

       
        let html=jiamengView({
            
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

            $('.goTop-div').on('tap',function(e){
                
                that.scrollTo(0,0)
                e = e || window.event;
                e.preventDefault();
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

export default new Jiameng()