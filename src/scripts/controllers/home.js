const homeView = require('../views/home.art')
const homeListView = require('../views/home_list.art')
const homeModel = require('../models/home')
require('../../libs/swiper')
// require('../../libs/jquery-2.0.3')

import indexController from './index'
const BScroll = require('better-scroll')
  
class Home{
    constructor(){
        // this.render()
        this.hour
        this.endHour
        this.endMinutes
        this.endSeconds
        this.list = []
        this.totalCount = 0
        this.pageSize = 10
        this.pageNo = 1
    }
    time(){
        this.endHour= Math.abs(new Date().getHours()-this.hour)
        this.endMinutes= 60-new Date().getMinutes()
        this.endSeconds=60-new Date().getSeconds()
        if(this.endHour<10){
           this.endHour='0'+this.endHour
        }
        if(this.endMinutes<10){
            this.endMinutes='0'+this.endMinutes
        }
        if(this.endSeconds<10){
        this.endSeconds='0'+this.endSeconds
        }
        $('.hours').html(this.endHour)
        $('.minutes').html(this.endMinutes)
        $('.seconds').html(this.endSeconds)
        
    }

    renderer(list){
        let homeListHtml = homeListView({
            list
        })
        // console.log(list.pname);
        
        $('.product ul').html(homeListHtml)

        $('.product ul li').on('tap', function() {
            let id = $(this).attr('data-id')
            let name= $(this).attr('data-name')
            let actprice= $(this).attr('data-actprice')
            let jxprice= $(this).attr('data-jxprice')
            let img= $(this).attr('data-img')
            location.hash = `detail/${id}&${name}&${actprice}&${jxprice}&${img}`
        })

    }
    async render(){
        indexController.render()

        $('header').css('display','flex')
        let that=this;
        let result1=await homeModel.get({
            state1:'promote',
            state2:'qgajax.do',
            last:'t=1570708714931&pagenum=1&tabnum=1'
        })
       
        
        let result2=await homeModel.get({
            state1:'statics',
            state2:'getzx.htm',
            last:`topicId=1165&pageNum=${this.pageNo}`
        })
        //把homeView 先装填到main里
        let homeHtml = homeView({
            list0:result1.seckillDate,
            list1:result1.killProList,
        })


        let $main = $('main');        
        
        this.hour=result1.seckillDate.hourOne
       
        setInterval(function(){
            this.time()
            
        }.bind(this) ,1000)
        
        await $main.html(homeHtml)
       
        
        

        $('.beer').on('tap',function(){
            window.location.hash='beer'
        })
        $('.liquor').on('tap',function(){
            window.location.hash='liquor'
        })
        $('.wine').on('tap',function(){
            window.location.hash='wine'
        })
        $('.fwine').on('tap',function(){
            window.location.hash='fwine'
        })
        $('.jiameng').on('tap',function(){
            window.location.hash='jiameng'
        })
        $('.mine').on('tap',function(){
            window.location.hash='mine'
        })
        $('.money').on('tap',function(){
            window.location.hash='money'
        })
        $('.pintuan').on('tap',function(){
            window.location.hash='pintuan'
        })
        $('.buy').on('tap',function(){
            window.location.hash='buy'
        })
        
        //再把list装到ul里
        let list=this.list=result2.promoList
        
        
        that.totalCount =result2.totalCount

        this.renderer(list)

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
        
        var mySwiper2 = new Swiper ('#swiper2', {
            direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项
            autoplay: {
                delay: 1000,
                stopOnLastSlide: false,
                disableOnInteraction: false
            }
            
        })  

        var mySwiper3 = new Swiper ('#swiper3', {
            // loop: true, // 循环模式选项
            slidesPerView :'auto'
            
        })
        var mySwiper4 = new Swiper ('#swiper4', {
            // loop: true, // 循环模式选项
            slidesPerView :3
            
        })
        var mySwiper5 = new Swiper ('#swiper5', {
            // loop: true, // 循环模式选项
            slidesPerView :'auto'
            
        })
        var mySwiper6 = new Swiper ('#swiper6', {
            // loop: true, // 循环模式选项
            slidesPerView :'auto'
            
        })
        var mySwiper7 = new Swiper ('#swiper7', {
            // loop: true, // 循环模式选项
            slidesPerView :'auto'
            
        })
        var mySwiper8 = new Swiper ('#swiper8', {
            // loop: true, // 循环模式选项
            slidesPerView :'auto'
            
        })
        
        let bScroll=new BScroll.default( $('main').get(0),{
            probeType:2
        })
        let $imgFoot =  $('.foot img')
        //拉动 后松开鼠标
        bScroll.on('scrollEnd',async function(){
            //上拉加载更多
            
            
            if(this.maxScrollY >= this.y && that.pageNo < 7){
                that.pageNo++
                
                $imgFoot.attr('src','/assets/imgs/ajax-loader.gif')
                
                let result2 = await homeModel.get({
                    state1:'statics',
                    state2:'getzx.htm',
                    last:`topicId=1165&pageNum=${that.pageNo}`
                })

                //刷新后获取数据
                //let {result2:list,totalCount}=result2
                //刷新后获取数据
                let list = result2.promoList

                let totalCount = result2.totalCount

                that.totalCount=totalCount

                if($('.pic img').attr('src')=='https://img06.jiuxian.com/2018/1009/4e6ef9c994854f269003fee121b90f4444.jpg')
                    $(this).attr('src','/assets/imgs/1.png')

                that.list = [...that.list,...list]

                that.renderer(that.list)
                //for(var i=0;i<10;i++)
                    //console.log(result2.promoList[1].commonProductInfo);
                
                bScroll.scrollBy(0,40)
                $imgFoot.attr('src','/assets/imgs/arrow.png')
                $imgFoot.removeClass('down')
            }
            if(that.pageNo==7){
                
                $('.foot').html('')
                $('.copyright').css('display','block')
            }
        })

        bScroll.on('scroll',function(){
            //上拉加载更多 图片改变
            if(this.maxScrollY > this.y){
                $imgFoot.addClass('down')
            }
            if(this.y <= -180){
                $('.header0').css('background','#de4943')
            }
            else{
                $('.header0').css('background','rgba(0,0,0,0)')
            }

            let that=this
            if(this.y<-483){
                $('.jx-sprite-icon').css('display','block')
                $('.jx-sprite-icon').on('click',function(e){
                    // console.log(1234);
                    that.scrollTo(0,0)
                    e = e || window.event;
                    e.preventDefault();
                })
            }
            else{
                $('.jx-sprite-icon').css('display','none')
            }
            
        })
        
        $('.search_content').on('click',function(){
            window.location.hash='search'
        })
        
         $('.s003').on('tap' ,'.ulImg', function() {
            // console.log(12345);
            let id = $(this).attr('data-id')
            let name= $(this).attr('data-name')
            let actprice= $(this).attr('data-actprice')
            let jxprice= $(this).attr('data-jxprice')
            let img= $(this).attr('data-img')
            location.hash = `detail/${id}&${name}&${actprice}&${jxprice}&${img}`
        })
        

    }
}

export default new Home()
