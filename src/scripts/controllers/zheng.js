const zhengView = require('../views/zheng.art')
const zhengModel = require('../models/clearance')
const zhengListView = require('../views/zheng_list.art')
const BScroll = require('better-scroll')

class Zheng{
    constructor(){
        this.list1 = []
        this.pageNo = 1
        this.count=0
    }
    async renderer(list0){

        let zhengListHtml = zhengListView({
            list0
        })
        await  $('.main_zheng .banner ul').eq(this.count).html(zhengListHtml)
        
        if(this.count<=4)
            await $('.top img').eq(this.count).css('display','block')
        this.count++
    }
    changHash(){
        location.hash=$(this).attr('data-to')
    }
    async render(){
        let that=this
        this.pageNo = 1
        this.count=0
        $('.foot').css('display','block')
        $('.bottomBtnn').css('display','none')

        let result=await zhengModel.get({
            state1:'dynamic',
            state2:'mob01ajax/150289',
            last:'pageNum=1'
        })
        let zhengHtml = zhengView({
            
        })
        $('.indexContainer').html(zhengHtml)

        let list0 = this.list1=result.goodsCate.list
        this.renderer(list0)
 
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

        let bScroll=new BScroll.default($('main').get(0),{
            probeType:2
        })
        let $imgFoot =  $('.foot img')
    
        $('.top img').eq(0).css('display','block')
        
        bScroll.on('scrollEnd',async function(){
            if(this.maxScrollY >= this.y && that.pageNo < 5){
                that.pageNo++
                $imgFoot.attr('src','/assets/imgs/ajax-loader.gif')
                let str=$('.top img').attr('data-src')
         
                let result = await zhengModel.get({
                    state1:'dynamic',
                    state2:'mob01ajax/150289',
                    last:`pageNum=${that.pageNo}`
                })
                
                let list0 = result.goodsCate.list
                that.renderer(list0)
                
                bScroll.scrollBy(0,40)
                $imgFoot.attr('src','/assets/imgs/arrow.png')
                $imgFoot.removeClass('down')
            }
            if(that.pageNo==5){
                $('.foot').css('display','none')
                $('.bottomBtnn').css('display','block')
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
        
    }
}

export default new Zheng()