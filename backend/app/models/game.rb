class Game < ApplicationRecord
  has_many :courts
  has_many :users, through: :courts
end
