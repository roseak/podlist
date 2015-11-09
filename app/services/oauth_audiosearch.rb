class OauthAudiosearch
  attr_reader :client

  def initialize
    @client ||= Audiosearch::Client.new(
      id: ENV['AS_ID'].dup,
      secret: ENV['AS_SECRET'].dup,
      host: ENV['AS_HOST'].dup,
      debug: false
      )
    end

  def episode(code)
    client.get_episode(code)
  end
end
