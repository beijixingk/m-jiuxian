import indexController from '../controllers/index'
import homeController from '../controllers/home'
import sortController from '../controllers/sort'
import clearanceController from '../controllers/clearance'
import cartController from '../controllers/cart'
import mineController from '../controllers/mine'
import detailController from '../controllers/detail'
import searchController from '../controllers/search'
import registerController from '../controllers/register'
import beerController from '../controllers/beer'
import liquorController from '../controllers/liquor'
import wineController from '../controllers/wine'
import fwineController from '../controllers/fwine'
import jiamengController from '../controllers/jiameng'
import moneyController from '../controllers/money'
import buyController from '../controllers/buy'
import pintuanController from '../controllers/pintuan'
import zhengController from '../controllers/zheng'
import laoController from '../controllers/lao'
import qingController from '../controllers/qing'
import haiController from '../controllers/hai'
import daController from '../controllers/da'
import hongController from '../controllers/hong'
import xiaoController from '../controllers/xiao'
import liController from '../controllers/li'


class Router{
    constructor(){
        this.render()
    }
    render(){
        window.addEventListener('load',this.handlePageLoad.bind(this))
        window.addEventListener('hashchange',this.handleHashChange.bind(this))
    }
    //渲染DOM
    renderDOM(hash){
        let pageControllers={
            homeController,
            sortController,
            clearanceController,
            cartController,
            mineController,
            detailController,
            searchController,
            registerController,
            beerController,
            liquorController,
            wineController,
            fwineController,
            jiamengController,
            moneyController,
            buyController,
            pintuanController,
            zhengController,
            laoController,
            qingController,
            haiController,
            daController,
            hongController,
            xiaoController,
            liController
        }
        pageControllers[hash+'Controller'].render()
        // console.log(hash);
    }
    //高亮
    setActiveClass(hash){
        $(`footer li[data-to=${hash}]`).addClass('active').siblings().removeClass('active')
    }
    //刷新页面
    handlePageLoad(){
        //获得hash值 || 短路运算符
        let hash=location.hash.substr(1) || 'home'
        
        let reg = new RegExp('^(\\w+)', 'g')
        let path = reg.exec(hash)
        
        indexController.render()
        location.hash=hash
        //初始化的时候也需要渲染DOM和设置高亮
        this.renderDOM(path[1])
        this.setActiveClass(path[1])
    }
    //当hash改变时
    handleHashChange(){
        
        let hash=location.hash.substr(1) 
        
        let reg = new RegExp('^(\\w+)', 'g')
        let path = reg.exec(hash)
        
        // indexController.render()
        // location.hash=hash
        
        //渲染DOM
        this.renderDOM(path[1])
        //设置高亮
        this.setActiveClass(path[1])
    }
}

new Router()