const Filtering = ({ item,selectedGenres,onClickFilter }) => {
    return ( 
        <div className="col-lg-2">
            <ul className="list-group">
              {
                item.map( item =>{
                  return <li onClick={() =>onClickFilter(item)} className={selectedGenres === item ?"list-group-item active":"list-group-item"}>{item}</li>
                })
              }
              
            </ul>
          </div>
     );
}
 
export default Filtering;