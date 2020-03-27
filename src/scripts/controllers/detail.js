import detailView from '../views/detail.art'


const BScroll = require('better-scroll')

class Detail {
    changHash() {
        location.hash = $(this).attr('data-to')
    }

    render() {
        
        
        let href=window.location.hash;
        let message=href.split('&')
        let jiuName=decodeURI(message[1])
        let actprice=message[2]
        let jxprice=message[3]
        let imgUrl=message[4]
        // console.log();
        
      
        
        let html = detailView({
            jiuName,
            actprice,
            jxprice,
            imgUrl
        })
        $('.indexContainer').html(html)

        let bScroll = new BScroll.default($('main').get(0), {
            probeType: 2
        })

        $('.navBar').on('click', function () {
            if ($('.nav').css('display') == 'none') {
                $('.nav').css('display', 'flex')
            }
            else {
                $('.nav').css('display', 'none')
            }
        })
        $('.back').on('click', function () {
            // window.location.hash='home'
            window.history.back(-1);
        })
        $('.nav li').on('click', this.changHash)
        var Swiper = require('../../libs/swiper');
        var mySwiper1 = new Swiper('#swiper0', {
            // direction: 'vertical', // 垂直切换选项
            loop: true,
            pagination: {
                el: '.swiper-pagination',
            }
        })

        
    }
}
export default new Detail()