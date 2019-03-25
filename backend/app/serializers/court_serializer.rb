class CourtSerializer < ActiveModel::Serializer
  attributes :id, :address, :user, :game

  def user
    self.object.user.username
  end

  def game
    self.object.game.name
  end
end
