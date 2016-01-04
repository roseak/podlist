class ShowTile extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <div className="col m2">
        <div className="card">
          <div className="card-image waves-effect waves-block waves-light front-card">
            <a href={'/shows/' + this.props.id} className="activator">
              <img src={'/assets/' + this.props.imagePath}></img>
            </a>
          </div>
        </div>
      </div>
    )
  }
}
