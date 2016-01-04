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
      </div>
    )
  }
}
