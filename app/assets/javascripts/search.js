$(document).ready(function(){
  fetchEpisodesButton()
})

function fetchEpisodesButton() {
  $('#button-fetch').on('click', function(){
    var query = $('#search-query').val()
    fetchEpisodes(query)
  })
}

function renderEpisodes(episode) {
  $('#episode-search-results').append(
    "<div class='episode' data-id='" + episode.id
    + "'><h6>Title "
    + episode.title
    + "</h6><p>"
    + episode.description
    + "</p></div>"
  )
}

function fetchEpisodes(query){
  var newestEpisodeID = parseInt($('.episode').last().attr('data-id'))
  $.ajax({
    type: 'GET',
    url: '/episodes/search?query=' + query,
    success: function(episodes){
      $.each(episodes, function(index, episode){
        if (isNaN(newestEpisodeID) || episode.results.id > newestEpisodeID) {
          renderEpisodes(episode.results)
        }
      })
    }
  })
}
