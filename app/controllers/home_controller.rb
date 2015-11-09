class HomeController < ApplicationController
  def index
    @pod_details = OauthAudiosearch.new.episode(5678)
  end
end
