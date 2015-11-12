class ShowsController < ApplicationController
  def show
    @show = OauthAudiosearch.new.show(params[:id])
  end
end
