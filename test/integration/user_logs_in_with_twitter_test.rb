require "test_helper"

class UserLogsInWithTwitterTest < ActionDispatch::IntegrationTest
  include Capybara::DSL

  def setup
    Capybara.app = Podlist::Application
  end

  test "logging in" do
    visit "/"
    assert_equal 200, page.status_code
  end
end
