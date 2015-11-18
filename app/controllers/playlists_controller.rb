class PlaylistsController < ApplicationController
  skip_before_filter  :verify_authenticity_token

  def index
    @playlists = Playlist.all
  end

  def show
    @playlist = Playlist.find_by(id: params[:id])
    @episodes = @playlist.episodes.map { |episode| episode_info(episode) }
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
