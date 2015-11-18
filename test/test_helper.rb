require 'SimpleCov'
SimpleCov.start('rails')

ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'
require 'minitest/pride'
require 'webmock'
require 'vcr'

VCR.configure do |c|
  c.allow_http_connections_when_no_cassette = true
  c.cassette_library_dir = 'test/fixtures/vcr_cassettes'
  c.hook_into :webmock
  c.default_cassette_options = { :serialize_with => :json }
  c.before_record do |r|
    r.request.headers.delete("Authorization")
  end
end

class ActiveSupport::TestCase
  fixtures :all

  include Capybara::DSL

  def stub_omniauth
    OmniAuth.config.test_mode = true
    OmniAuth.config.mock_auth[:twitter] = OmniAuth::AuthHash.new({
      provider: "twitter",
      extra: {
        raw_info: {
          uid: "1234",
          name: "Rosie",
          screen_name: "kohniva",
          profile_image_url: "https://photo.com.jpg",
          description: "words",
          location: "Denver"
        }
      },
      credentials: {
        token: ENV["TWITTER_KEY"],
        secret: ENV["TWITTER_SECRET"]
      }
    })
  end
end
