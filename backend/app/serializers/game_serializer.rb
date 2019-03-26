class GameSerializer < ActiveModel::Serializer
  attributes :id, :name, :game_type, :start_time, :end_time, :players, :address, :game_day, :capacity, :courts

  def players
    self.object.users
  end

  def courts
    self.object.courts
  end

end
