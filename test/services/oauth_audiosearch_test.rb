require "test_helper"

class OauthAudiosearchTest < ActiveSupport::TestCase
  test "episode method works" do
    client = mock()
    audiosearch = OauthAudiosearch.new(client)

    client.expects(:get_episode).with(1)
    audiosearch.episode(1)
  end

  test "show method works" do
    client = mock()
    audiosearch = OauthAudiosearch.new(client)

    client.expects(:get_show).with(1)
    audiosearch.show(1)
  end

  test "search method works" do
    client = mock()
    audiosearch = OauthAudiosearch.new(client)

    client.expects(:search).with("viki", "episodes")
    audiosearch.search("viki", "episodes")
  end

  test "related method works" do
    client = mock()
    audiosearch = OauthAudiosearch.new(client)

    client.expects(:get_related).with(1, {type: "shows", size: 2, from: 2})
    audiosearch.related(1, {type: "shows", size: 2, from: 2})
  end

end
