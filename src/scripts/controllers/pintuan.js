import pintuanView from '../views/pintuan.art'
const pintuanModel = require('../models/pintuan')
const pintuanListView = require('../views/pintuan_list.art')
const BScroll = require('better-scroll')


class Pintuan{
    constructor(){
        this.list=[]
        this.pageNo=1
        this.count=0

    }

    changHash(){
        location.hash=$(this).attr('data-to')
    }
    renderer(list){
        let listHtml = pintuanListView({
            list
        })
        $('.proList ul').html(listHtml)
    }
    async render(){
        let that=this
        $('.mainBody').css('padding-bottom','0rem')
        this.pageNo = 1
        $('.foot').css('display','block')
        $('.all').css('display','none')

        let result=await pintuanModel.get({
            state1:'product',
            state2:'list',
            last:'pageNum=1'
        })
        let html=pintuanView({
            
        })
        $('.indexContainer').html(html)

        let list0 = this.list = result.data
        this.renderer(list0)

        let bScroll = new BScroll.default($('main').get(0),{
            probeType:2
        })
        let $imgFoot =  $('.foot img')
        bScroll.on('scrollEnd',async function(){
           
            if(this.maxScrollY >= this.y && that.pageNo < 6){
                that.pageNo++
                $imgFoot.attr('src','/assets/imgs/ajax-loader.gif')

                let result =await pintuanModel.get({
                    state1:'product',
                    state2:'list',
                    last:`pageNum=${that.pageNo}`
                })
                let list0=result.data
                that.list=[...that.list,...list0]
                that.renderer(that.list)

                bScroll.scrollBy(0,40)
                $imgFoot.attr('src','/assets/imgs/arrow.png')
                $imgFoot.removeClass('down')
            }
            if(that.pageNo==6){
                $('.foot').css('display','none')
                $('.all').css('display','block')
                $('.mainBody').css('padding-bottom','.4rem')
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

        var Swiper = require('../../libs/swiper'); 
        var mySwiper1 = new Swiper ('#swiper1', {
                // direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项
            autoplay: {
                delay: 1000,
                stopOnLastSlide: false,
                disableOnInteraction: true,
            },
            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
            }
        })  
        var mySwiper3 = new Swiper ('#swiper3', {
            // loop: true, // 循环模式选项
            slidesPerView :'auto'
            
        })


    }
}

export default new Pintuan()