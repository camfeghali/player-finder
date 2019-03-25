class GameSerializer < ActiveModel::Serializer
  attributes :id, :name, :game_type, :start_time, :end_time, :players, :address

  def players
    self.object.users
  end

end
