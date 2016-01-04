class HomeShows extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    var showTiles = _.map(this.props.shows, function(id, imagePath){
      return <ShowTile imagePath={imagePath} id={id} key={id} />
    })
    return(
      <div>
        <div className='row card-lines'>{showTiles}</div>
        <div className="row">
          <div className="col m8 offset-m2" id="home-welcome">Welcome to Podlist!</div>
          <div className="col m6 offset-m3" id="instructions">Search through our database
             to find a podcast episode that interests you and start a playlist.</div>
        </div>
        <SearchField />
      </div>
    )
  }
}
