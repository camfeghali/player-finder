class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :password, :games

  def games
    self.object.games
  end

end
