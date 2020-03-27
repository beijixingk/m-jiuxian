import mineView from '../views/mine.art'
const BScroll=require('better-scroll')

class Mine{
    changHash(){
        location.hash=$(this).attr('data-to')
        
    }
    
    render(){
        let html=mineView({})
        $('.indexContainer').html(html)
        
        
        $('.back').on('click',function(){
            // window.location.hash='home'
            window.history.back(-1); 
        })

        $('.nav li').on('click',this.changHash)

        $('.tabb').on('click',function(){
            
            
            $(this).addClass('on').siblings().removeClass('on')
            
            // console.log($(this).index());
            
            $(`.content${$(this).index()+1}`).css('display','block').siblings().css('display','none')
        })

        $('.register').on('click',function(){
            window.location.hash='register'
        })
        
        $('.yantu2').on('click',function(){
            if($('.tupian2').css('display')=='block'){
                $('.tupian2').css('display','none')
            }
            else{
                $('.tupian2').css('display','block')
            }
        })
        $('.yantu').on('click',function(){
            if($('.tupian').css('display')=='block'){
                $('.tupian').css('display','none')
            }
            else{
                $('.tupian').css('display','block')
            }
        })
        $('.load').on('click',function(){
            window.location.reload()
            // let srcc=$('.yantu').attr('src')
            // $('.yantu').load(srcc)
        })

    }
}

export default new Mine()