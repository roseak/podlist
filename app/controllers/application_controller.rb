class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  helper_method :current_user, :episode_info, :current_user_playlist?

  def current_user
    @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
  end

  def episode_info(episode_number)
    OauthAudiosearch.new.episode(episode_number)
  end

  def current_user_playlist?(playlist_id)
    current_user.playlists.find_by(id: playlist_id)
  end
end
