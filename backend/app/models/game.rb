class Game < ApplicationRecord
  has_many :courts
  has_many :players, through: :courts
end
