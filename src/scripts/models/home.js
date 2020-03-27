module.exports = {
    get({state1='promote',state2='qgajax.do',last='t=1570708714931&pagenum=1&tabnum=1'}){
        return $.ajax({  
            dataType:"json",
            url:`/api/m_v1/${state1}/${state2}?${last}`,
        })
        
    }
}