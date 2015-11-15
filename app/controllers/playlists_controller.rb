class PlaylistsController < ApplicationController
  def index
    @playlists = Playlist.all
  end

  def show
    @playlist = Playlist.find_by(id: params[:id])
  end

  def update
    playlist = Playlist.find_by(id: params[:id])
    playlist.episodes << params[:episode_id].to_i
    playlist.save
    redirect_to playlist_path(playlist)
  end

  def destroy
    Playlist.find(params[:id]).delete
    redirect_to root_path
  end
end
