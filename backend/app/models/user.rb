class User < ApplicationRecord
  has_many :courts
  has_many :games, through: :courts
end
