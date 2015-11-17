$(document).ready(function(){
  fetchEpisodesButton()
  fetchEpisodesEnter()
})

function fetchEpisodesButton() {
  $('#button-fetch').on('click', function(){
    var query = $('#search-query').val()
    $('#episode-search-results').empty()
    fetchEpisodes(query)
  })
}

function fetchEpisodesEnter() {
  $('#search-query').keyup(function(event){
    if(event.keyCode == 13){
      $('#button-fetch').click()
    }
  })
}

function renderEpisodes(episode, current_user) {
  $('#episode-search-results').append(
    "<li class='episode' data-id='" + episode.id
    + "'><div class='collapsible-header'><div class='row' id='row-head'>"
    + "<div class='col m1'>"
    + episodeImages(episode)
    + "</div><div class='col m10'><div class='show-title truncate'>"
    + episode.title
    + "</div><div id='show-network'>"
    + episode.show_title
    + "</div><div id='episode-timing'>"
    + episode.date_created
    + " | "
    + episode.duration
    + "</div></div><div class='col m1'>"
    + "<div id='add-to-playlist'><a class='modal-trigger' href='#modal-"
    + episode.id
    + "'><i class='material-icons'>playlist_add</i></a><div id='modal-'"
    + episode.id
    + "' class='modal'><div class='modal-content'>"
    + "<div id='add-to-playlist-title'>Add to a Playlist</div>"
    + "<div id='episode-title-modal' class='truncate'>"
    + episode.title
    + "</div><div class='col m8 offset-m2 new-playlists'>"
    + userPlaylists(current_user.playlists)
    + "<form action='/playlists' id='new-playlists' method='post'>"
    + "<div class='input-field col m12' id='new-playlist-name'>"
    + "<input id='name' name='name' type='text' />"
    + "<label for='name'>Playlist Name</label>"
    + "<input id='episode_id' name='episode_id' type='hidden' value='"
    + episode.id
    + "' /></div></form></div></div></div></div>"
    + "</div></div></div><div class='collapsible-body'><p>"
    + episode.description
    + "</p></div></li>"
  )
}

function userPlaylists(playlists){
  $.each(playlists, function(index, playlist){
    "<div><a href='/playlists/"
    + playlist.id
    +"' class='waves-effect waves-light btn col m10 offset-m1 playlist-name-btn'"
    + "data-method='put'>"
    + playlist.name
    + "</a></div>"
  })
}

function episodeImages(episode){
  if (!!episode.image_urls) {
    return "<img src='" + episode.image_urls.thumb + "', alt='', id='episode-photo'>"
  } else {
    return "<i class='material-icons red' id='episode-photo'>radio</i>"
  }
}

function fetchEpisodes(query){
  var newestEpisodeID = parseInt($('.episode').last().attr('data-id'))
  $.ajax({
    type: 'GET',
    url: '/episodes/search.json?query=' + query,
    success: function(response){
      var episodes     = response.episodes.results
      var current_user = response.current_user

      $.each(episodes, function(index, episode){
        if (isNaN(newestEpisodeID) || episode.id > newestEpisodeID) {
          renderEpisodes(episode, current_user)
        }
        attachCollapsible()
        attachModal()
      })
    }
  })

  function attachCollapsible(){
    $('.collapsible').collapsible({
      accordion : false
    })
  }

  function attachModal(){
    $('.modal-trigger').leanModal()
  }

}
