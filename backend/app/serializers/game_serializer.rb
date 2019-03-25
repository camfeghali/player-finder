class GameSerializer < ActiveModel::Serializer
  attributes :id, :name, :game_type, :start_time, :end_time, :players

  def players
    self.object.users
  end
end
