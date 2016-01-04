class EpisodeResults extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    var result = _.map(this.props.episodes, function(episode){
      return <EpisodeItem episode={episode} current_user={this.props.current_user} key={episode.id} />
    }.bind(this))
    return (
      <div className="row">
        <div className="col m10 offset-m1" id="collapsed-list">
          <ul className="collapsible popout hoverable" id="episode-search-results" data-collapsible="accordion">
            {results}
          </ul>
        </div>
      </div>
    )
  }
}
