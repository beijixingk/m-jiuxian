module.exports = {
    get({state1='product',state2='list',last='pageNum=1'}){
        return $.ajax({  
            dataType:"json",
            url:`/pin/${state1}/${state2}?${last}`,
        })
        
    }
}