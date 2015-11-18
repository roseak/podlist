json.episodes @episodes

json.current_user do
  json.id current_user.id
  json.playlists current_user.playlists
end
