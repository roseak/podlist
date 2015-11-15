class PlaylistsController < ApplicationController
  def index
    @playlists = Playlist.all
  end

  def show
    @playlist = Playlist.find_by(id: params[:id])
  end

  def new
    @playlist = Playlist.new
  end

  def create
    @playlist = Playlist.create(
      name: params[:name],
      episodes: [params[:episode_id].to_i],
      user_id: current_user.id
    )
    redirect_to playlist_path(@playlist)
  end

  def update
    playlist = Playlist.find_by(id: params[:id])
    playlist.episodes << params[:episode_id].to_i
    playlist.save
    redirect_to playlist_path(playlist)
  end

  def destroy
    Playlist.find(params[:id]).delete
    redirect_to user_path(current_user)
  end
end
