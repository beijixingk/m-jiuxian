import sortView from '../views/sort.art'

class Sort{
    changHash(){
        location.hash=$(this).attr('data-to')
    }
    
    render(){
        let html=sortView({})
        $('.indexContainer').html(html)
        $('.navBar').on('click',function(){
            if($('.nav').css('display')=='none'){
                $('.nav').css('display','flex')
            }
            else{
                $('.nav').css('display','none')
            }
        })
        $('.back').on('click',function(){
            // window.location.hash='home'
            window.history.back(-1); 
        })

        $('.nav li').on('click',this.changHash)

        $('.liquor').on('tap',function(){
            window.location.hash='liquor'
        })
        $('.wine').on('tap',function(){
            window.location.hash='wine'
        })
        $('.fwine').on('tap',function(){
            window.location.hash='fwine'
        })
        $('.zheng').on('tap',function(){
            window.location.hash='zheng'
        })
        $('.lao').on('tap',function(){
            window.location.hash='lao'
        })
        $('.qing').on('tap',function(){
            window.location.hash='qing'
        })
        $('.hai').on('tap',function(){
            window.location.hash='hai'
        })
        $('.da').on('tap',function(){
            window.location.hash='da'
        })
        $('.hong').on('tap',function(){
            window.location.hash='hong'
        })
        $('.buy').on('tap',function(){
            window.location.hash='buy'
        })
        $('.xiao').on('tap',function(){
            window.location.hash='xiao'
        })
        $('.li').on('tap',function(){
            window.location.hash='li'
        })
    }
}

export default new Sort()