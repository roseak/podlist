require 'test_helper'

class SearchControllerTest < ActionController::TestCase
  def setup
    Capybara.app = Podlist::Application
  end
  # 
  #
  # test "stubs request using VCR for a user playlist" do
  #   user = User.create(uid: "2053151",
  #                      name: "Rosie Kohn",
  #                      screen_name: "kohniva",
  #                      profile_pic: "http://pbs.twimg.com/profile_images/642390668745162752/aP-5gXIZ_normal.jpg",
  #                      location: "Denver, CO",
  #                      bio: "student at @turingschool\nlearning all the coding things",
  #                      oauth_token: ENV["SAMPLE_TOKEN"],
  #                      oauth_token_secret: ENV["SAMPLE_TOKEN_SECRET"])
  #   session[:user_id] = user.id
  #
  #   VCR.use_cassette("_red_search_data") do
  #     get :index, q: "viki"
  #     assert_response 200
  #     assert_match /red/, response.body
  #   end
  # end
end
