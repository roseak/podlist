class SearchField extends React.Component {
  constructor(props){
    super(props)
    this.state = {query: ""}
  }
  updateQuery(event){
    this.setState({query: event.target.value})
  }
  renderResults(episodes, current_user){
    var element = this.refs.results
    ReactDOM.render(
      <EpisodeResults episodes={episodes} currentUser={current_user} />,
      element
    )
  }
  handleSearch(){
    var query = this.state.query
    $.ajax({
      type: 'GET',
      url: '/episodes/search.json?query=' + query,
      success: function(response){
        var episodes     = response.episodes.results
        var current_user = response.current_user
        this.renderResults(episodes, current_user)
      }.bind(this)
    })
  }
  render(){
    return (
      <div className="row">
        <div className="col m10 offset-m2" id="search-form">
          <div className="form-group col m9" id="search-box">
            <input className="form-control" type="search" id="search-query" value={this.state.query} onChange={this.updateQuery.bind(this)} />
            <label htmlFor="search-query">What interests you?</label>
          </div>
          <div className="col m2">
            <input className="btn btn-default pull-right" id="button-fetch" type="button" onClick={this.handleSearch.bind(this)} name="submit" value="Go" />
          </div>
        </div>
        <div ref="results"></div>
      </div>
    )
  }
}
