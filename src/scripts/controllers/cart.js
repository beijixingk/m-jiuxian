import cartView from '../views/cart.art'

class Cart{
    changHash(){
        location.hash=$(this).attr('data-to')
    }
    render(){
        let html=cartView({})
        $('.indexContainer').html(html)
        $('.ss').on('click',function(){
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
    }
}

export default new Cart()