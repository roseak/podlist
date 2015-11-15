class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  helper_method :current_user, :episode_info

  def current_user
    @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
  end

  def episode_info(episode_number)
    OauthAudiosearch.new.episode(episode_number)
  end
end
