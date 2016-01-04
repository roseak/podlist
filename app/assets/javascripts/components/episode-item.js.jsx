class EpisodeItem extends React.Component {
  constructor(props){
    super(props)
  }
  formatTime() {
    var time = [],
        s = 1;
    var calc = this.state.episode.duration;

    s = 3600;
    calc = calc / s;
    time.push(format(Math.floor(calc)));//hour

    calc = ((calc - (time[time.length-1] || 0)) * s) / 60;
    time.push(format(Math.floor(calc)));//minute

    calc = (calc - (time[time.length-1])) * 60;
    time.push(format(Math.round(calc)));//second


    function format(n) {
        return (("" + n) / 10).toFixed(1).replace(".", "");
    }

    //if (!hasHours) time.shift();//you can set only "min: sec"

    return time.join(":");
  }
  render(){
    var episodeImages = ''
    if (!!this.props.episode.image_urls && this.props.episode.image_urls.thumb !== null) {
       episodeImages = <img src={this.props.episode.image_urls.thumb} alt='' id='episode-photo' />
       console.log(this.props.episode.image_urls.thumb)
    } else {
       episodeImages = <i className='material-icons red' id='episode-photo'>radio</i>
    }
    var showNetwork = ''
    if (!!this.props.episode.network) {
      showNetwork = ' from ' + this.props.episode.network
    }
    return (
      <li className='episode'>
        <div className='collapsible-header'>
          <div className='row' id='row-head'>
            <div className='col m1'>{episodeImages}</div>
            <div className='col m10'>
              <div className='show-title truncate'>{this.props.episode.title}</div>
              <div id='show-network'>
                <a href={'/shows/' + this.props.episode.show_id}>{this.props.episode.show_title}</a>
                {showNetwork}
              </div>
              <div id='episode-timing'>{this.props.episode.date_created} | {this.formatTime.bind(this)}</div>
            </div>
            <div className='col m1'>
              <div id='add-to-playlist'>
                <a className='modal-trigger' href={'#modal-' + this.props.episode.id}>
                  <i className='material-icons'>playlist_add</i>
                </a>
                <div id={'modal-' + this.props.episode.id} className='modal'>
                  <div className='modal-content'>
                    <div id='add-to-playlist-title'>Add to a Playlist</div>
                    <div id='episode-title-modal' className='truncate'>
                      {this.props.episode.title}
                    </div>
                    <div className='col m8 offset-m2 new-playlists'>
                      userPlaylists(current_user.playlists, episode.id)
                      <form action='/playlists' id='new-playlist' method='post'>
                      <div className='input-field col m12' id='new-playlist-name'>
                        <input id='name' name='name' type='text' />
                        <label htmlFor='name'>Playlist Name</label>
                        <input id='episode_id' name='episode_id' type='hidden' value={this.props.episode.id} />
                      </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='collapsible-body'>
          <p>{this.props.episode.description}</p>
        </div>
      </li>
    )
  }
}
