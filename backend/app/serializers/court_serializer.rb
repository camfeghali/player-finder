class CourtSerializer < ActiveModel::Serializer
  attributes :id, :user, :game, :user_games

  def user
    self.object.user
  end

  def user_games
    self.object.user.games
  end

  def game
    self.object.game
  end
end
