class PlaylistsController < ApplicationController
  def index
    @playlists = Playlist.all
  end

  def show
    @playlist = Playlist.find_by(id: params[:id])
  end

  def destroy
    Playlist.find(params[:id]).delete
    redirect_to root_path
  end
end
