require 'test_helper'

class ShowsControllerTest < ActionController::TestCase
  test "stubs request using VCR for a show's feed" do
    user = User.create(uid: "2053151",
                       name: "Rosie Kohn",
                       screen_name: "kohniva",
                       profile_pic: "http://pbs.twimg.com/profile_images/642390668745162752/aP-5gXIZ_normal.jpg",
                       location: "Denver, CO",
                       bio: "student at @turingschool\nlearning all the coding things",
                       oauth_token: ENV["SAMPLE_TOKEN"],
                       oauth_token_secret: ENV["SAMPLE_TOKEN_SECRET"])
    session[:user_id] = user.id

    VCR.use_cassette("_replyall_user_data") do
      get :show, id: "42"
      assert_response 200
      assert_match /Reply All/, response.body
      assert_match /PJ Vogt/, response.body
    end
  end

  test "stubs request using VCR for a show's related episodes" do
    user = User.create(uid: "2053151",
                       name: "Rosie Kohn",
                       screen_name: "kohniva",
                       profile_pic: "http://pbs.twimg.com/profile_images/642390668745162752/aP-5gXIZ_normal.jpg",
                       location: "Denver, CO",
                       bio: "student at @turingschool\nlearning all the coding things",
                       oauth_token: ENV["SAMPLE_TOKEN"],
                       oauth_token_secret: ENV["SAMPLE_TOKEN_SECRET"])
    session[:user_id] = user.id

    VCR.use_cassette("_replyall_user_data") do
      get :show, id: "42"
      assert_response 200
      assert_match /Reply All/, response.body
      assert_match /PJ Vogt/, response.body
    end
  end
end
