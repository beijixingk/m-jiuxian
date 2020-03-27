import searchView from '../views/search.art'

class Search{
    render(){
        let html=searchView({})
        $('.indexContainer').html(html)
        
        $('.back').on('click',function(){
            window.history.back(-1)
            
        })
    }
}
export default new Search()