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
    + "'><i class='material-icons'>playlist_add</i></a><div id='modal-"
    + episode.id
    + "' class='modal'><div class='modal-content'>"
    + "<div id='add-to-playlist-title'>Add to a Playlist</div>"
    + "<div id='episode-title-modal' class='truncate'>"
    + episode.title
    + "</div><div class='col m8 offset-m2 new-playlists'>"
    + userPlaylists(current_user.playlists, episode.id)
    + "</div></form><form action='/playlists' id='new-playlists' method='post'>"
    + "<div class='input-field col m12' id='new-playlist-name'>"
    + "<input id='name' name='name' type='text' />"
    + "<label for='name'>Playlist Name</label>"
    + "<input id='episode_id' name='episode_id' type='hidden' value='"
    + episode.id
    + "</div></div></div></div>"
    + "</div></div></div><div class='collapsible-body'><p>"
    + episode.description
    + "</p></div></li>"
  )
}

function userPlaylists(playlists, episode_id){
  for (var i = 0; i < playlists.length; i++) {
     return playlistButtons(playlists[i], episode_id)
  }
}

function playlistButtons(playlist, episode_id){
  return "<form action='/playlists/"
  + playlist.id
  + "' id='update-playlist' method='post'>"
  + "<div class='input-field col m10' id='playlist-name-all-btns'>"
  + "<div><input name='_method' type='hidden' value='patch' />"
  + "<input id='episode_id' name='episode_id' type='hidden' value='"
  + episode_id
  + "' /><input id='playlist_name' name='id' type='hidden' value='"
  + playlist.id
  + "' /><input type='submit' value='"
  + playlist.name
  + "' class='waves-effect waves-light btn col m10 offset-m1 playlist-name-btn'>"
  + "</div></div></form>"
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
        attachModal()
        attachCollapsible()
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