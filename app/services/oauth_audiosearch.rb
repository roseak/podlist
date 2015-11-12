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

  def show(code)
    client.get_show(code)
  end

  def search(query, type = 'episodes')
    client.search(query, type)
  end

  def tastemakers(query)
    client.get_tastemakers(query)
  end

  def trends
    client.get_trending
  end

  def person(query)
    client.get_person(query)
  end

  def related(query, type = 'episodes')
    client.get_related(query, type)
  end
end
