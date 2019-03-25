class GamesController < ApplicationController

  def index
    @games = Game.all
    render json: @games
  end

  def create
    byebug
  end

end
