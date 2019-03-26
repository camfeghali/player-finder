class GamesController < ApplicationController

  def index
    @games = Game.all
    render json: @games
  end

  def create
    name = params["name"]
    game_type = params["game_type"]
    start_time = Time.parse(params["start_time"])
    end_time = Time.parse(params["end_time"])
    game_day = Date.parse(params["game_day"])
    capacity = params["capacity"]
    address = params["address"]
    @game = Game.create(name: name , game_type: game_type, start_time: start_time, end_time: end_time, game_day: game_day, capacity: capacity, address: address)

    render json: @game
  end

end
