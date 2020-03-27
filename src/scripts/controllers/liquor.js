import liquorView from '../views/liquor.art'
const liquorModel = require('../models/clearance')
const liquorListView = require('../views/liquor_list.art')
const BScroll = require('better-scroll')


class Liquor{
    constructor(){
        this.list=[]
        this.pageNo=1
        this.count=0

    }

    changHash(){
        location.hash=$(this).attr('data-to')
    }
    renderer(list){
        let listHtml = liquorListView({
            list
        })
        $('.center_list ul').html(listHtml)
    }
    async render(){
        let that=this
        this.pageNo = 1
        $('.foot').css('display','block')
        $('.all').css('display','none')

        let result=await liquorModel.get({
            state1:'dynamic',
            state2:'mob01ajax/150722',
            last:'pageNum=1'
        })
        let html=liquorView({
            
        })
        $('.indexContainer').html(html)

        let list0 = this.list = result.goodsCate.list
        this.renderer(list0)

        let bScroll = new BScroll.default($('main').get(0),{
            probeType:2
        })
        let $imgFoot =  $('.foot img')
        bScroll.on('scrollEnd',async function(){
           
            if(this.maxScrollY >= this.y && that.pageNo < 5){
                that.pageNo++
                $imgFoot.attr('src','/assets/imgs/ajax-loader.gif')

                let result =await liquorModel.get({
                    state1:'dynamic',
                    state2:'mob01ajax/150722',
                    last:`pageNum=${that.pageNo}`
                })
                let list0=result.goodsCate.list
                that.list=[...that.list,...list0]
                that.renderer(that.list)

                bScroll.scrollBy(0,40)
                $imgFoot.attr('src','/assets/imgs/arrow.png')
                $imgFoot.removeClass('down')
            }
            if(that.pageNo==5){
                $('.foot').css('display','none')
                $('.all').css('display','block')
            }
        })
        bScroll.on('scroll',function(){
          
            let that=this

            if(this.maxScrollY > this.y){
                $imgFoot.addClass('down')
            }

            $('.toToppp').on('tap',function(e){
                
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

export default new Liquor()