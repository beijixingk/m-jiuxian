
const clearanceView = require('../views/clearance.art')
const clearanceModel = require('../models/clearance')
const clearanceListView = require('../views/clearance_list.art')
const BScroll = require('better-scroll')

class Clearance{
    constructor(){
        this.list1 = []
        this.pageNo = 1
        this.count=0
    }
    async renderer(list0){

        let clearanceListHtml = clearanceListView({
            list0
        })
        await  $('.main_main3 .banner ul').eq(this.count).html(clearanceListHtml)
        // await  $('.main_main3 .banner ul li').html(clearanceListHtml)
        await $('.top img').eq(this.count).css('display','block')
        this.count++
    }
    changHash(){
        location.hash=$(this).attr('data-to')
    }
    async render(){
        // console.log('clearrender');
        
        let that=this
        this.count=0
        this.pageNo = 1
        $('.foot').css('display','block')
        $('.clearfix li').css('display','none')
        $('.bottomBtn').css('display','none')

        let result=await clearanceModel.get({
            state1:'dynamic',
            state2:'mob01ajax/151763',
            last:'pageNum=1'
        })
        let clearanceHtml = clearanceView({
            
        })
        $('.indexContainer').html(clearanceHtml)

        // console.log(result.list[0].pic);
        

        let list0 = this.list1=result.goodsCate.list
        this.renderer(list0)

        // let html=clearanceView({
        //     list0:result.list,
        //     list:result.goodsCate.list,
            
        // })
        
        
        
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

        let bScroll=new BScroll.default($('main').get(0),{
            probeType:2
        })
        let $imgFoot =  $('.foot img')
        //上拉加载更多
        //console.log(that);
        $('.top img').eq(0).css('display','block')
        
        bScroll.on('scrollEnd',async function(){
          

            if(this.maxScrollY >= this.y && that.pageNo < 5){
                that.pageNo++
                
                $imgFoot.attr('src','/assets/imgs/ajax-loader.gif')
                
                let str=$('.top img').attr('data-src')
                
                // $('.top img').css('display','none')

                
                
                let result = await clearanceModel.get({
                    state1:'dynamic',
                    state2:'mob01ajax/151763',
                    last:`pageNum=${that.pageNo}`
                })
                
                //刷新后获取数据
                //let {result2:list,totalCount}=result2
                //刷新后获取数据
                let list0 = result.goodsCate.list
                // let listi = result.list[0]
                that.list1 = [...that.list1, ...list0]
                that.renderer(that.list1)
                
                

                bScroll.scrollBy(0,40)
                $imgFoot.attr('src','/assets/imgs/arrow.png')
                $imgFoot.removeClass('down')

               // ff(result)
            }
            if(that.pageNo==5){
                $('.foot').css('display','none')
                $('.clearfix li').css('display','block')
                $('.bottomBtn').css('display','block')
                
               
            }
            

        })
        bScroll.on('scroll',function(){
            //上拉加载更多 图片改变
            let that=this

            if(this.maxScrollY > this.y){
                $imgFoot.addClass('down')
            }

            $('.toTopp').on('tap',function(e){
                
                that.scrollTo(0,0)
                e = e || window.event;
                e.preventDefault();
            })
        })
        
    }
}

export default new Clearance()