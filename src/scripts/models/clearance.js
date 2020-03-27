module.exports = {
    get({state1='dynamic',state2='mob01ajax/151763',last='pageNum=1'}){
        return $.ajax({  
            dataType:"json",
            url:`/api/m_v1/${state1}/${state2}?${last}`,
        })
        
    }
}