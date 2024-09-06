module.exports = (query)=>{
    
    let objectSearch = {
        keyword:"",
      
    }
    if(query.keyword){
      
        objectSearch.keyword=query.keyword
        
        const regex = new RegExp(objectSearch.keyword,"i")
        // console.log(objectSearch);
        objectSearch.regex=regex
        
    }  
    return  objectSearch

}