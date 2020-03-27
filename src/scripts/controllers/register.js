import registerView from '../views/register.art'
const registerModel = require('../models/register')
const BScroll = require('better-scroll')

class Register {
    constructor() {

    }
    setCookie(key, value, time) {
        var date = new Date();
        date.setDate(date.getDate() + time);
        document.cookie = key + '=' + value + '; expires=' + date;
    }
    getCookie(value) {
        var a = document.cookie.split('; ');
        var re = /\d/g;
        for (var i = 0; i < a.length; i++) {
            var b = a[i].split('=');
            if (b[1] == value) {
                return 0;
            }
        }
        return 1;
    }
    async render() {

        let that = this
        let registerHtml = registerView({})

        // let result1=await registerModel.get({
        //     num:'1'
        // })
        // let result2=await registerModel.get({
        //     num:'2'
        // })
        // let registerHtml = registerView({
        //     list1:result1,
        //     list2:result2
        // })

        $('.indexContainer').html(registerHtml)


        $('.back').on('click', function () {
            // window.location.hash='home'
            window.history.back(-1);
        })

        // $('.nav li').on('click',this.changHash)
        $('.yantu').on('click', function () {
            if ($('.tupian').css('display') == 'block') {
                $('.tupian').css('display', 'none')
            }
            else if ($('.tupian').css('display') == 'none') {
                $('.tupian').css('display', 'block')
            }
        })
        $('.load').on('click', function () {
            window.location.reload()
            // let srcc=$('.yantu').attr('src')
            // $('.yantu').load(srcc)
        })

        $('input').on('change', function () {
            var mm = Math.random().toString().substring(2);
            var re = /[1][0-9]{8}/;
            if ($('#iphone').val().match(re)) {
                //console.log('cookie');
                var reval =that.getCookie($('#iphone').val());
                if (reval == 0) {
                    $('.tishi1').html('该手机号已经注册');
                    $('.tishi1').css('color', 'red');
                }
                if (reval == 1) {
                    $('.tishi1').html('手机号正确');
                    $('.tishi1').css('color', '#999');
                }


                if ($('#pwd').val() != $('#pwd2').val()) {
                    $('.tishi3').html('两次密码输入不一致，请重新输入');
                    $('.tishi3').css('color', 'red');
                }
                if ($('#pwd').val() == $('#pwd2').val() && $('#pwd').val()) {
                    $('.tishi3').html('正确');
                    $('.tishi3').css('color', '#999');
                   
                    // $('.btn').attr('href', '../../pages/login.html');
                }
            }
            else {
                $('.tishi1').html('手机号格式错误');
                $('.tishi1').css('color', 'red');
            }
        })
        $('.confirm_reg').on('click', function () {

            var mm = Math.random().toString().substring(2);
            var re = /[1][0-9]{8}/;
            if ($('#iphone').val().match(re)) {
                //console.log('cookie');
                var reval = that.getCookie($('#iphone').val());
                if (reval == 0) {
                    $('.tishi1').html('该手机号已经注册');
                    $('.tishi1').css('color', 'red');
                }
                else {
                    $('.tishi1').html('手机号正确');
                    $('.tishi1').css('color', '#999');
                }


                if ($('#pwd').val() != $('#pwd2').val()) {
                    $('.tishi3').html('两次密码输入不一致，请重新输入');
                    $('.tishi3').css('color', 'red');
                }
                else {
                    $('.tishi3').html('正确');
                    $('.tishi3').css('color', '#999');
                    that.setCookie('iphone' + mm, $('#iphone').val(), 5);
                    that.setCookie('pwd' + mm, $('#pwd').val(), 5);
                    $('.conreg').attr('href','#mine');
                    // window.location.hash='#mine'
                }
            }
            else {
                $('.tishi1').html('手机号格式错误');
                $('.tishi1').css('color', 'red');
            }


        })
    }


}

export default new Register()