class GamesController < ApplicationController

  def index
    @games = Game.all
    render json: @games
  end

  def create
    # byebug
    name = params["name"]
    game_type = params["game_type"]
    start_time = Time.parse(params["start_time"])
    end_time = Time.parse(params["end_time"])
    game_day = Date.parse(params["game_day"])
    capacity = params["capacity"]
    address = params["address"]
    lat = params["lat"]
    lng = params["lng"]
    @game = Game.create(name: name , game_type: game_type, start_time: start_time, end_time: end_time, game_day: game_day, capacity: capacity, address: address, lat: lat, lng: lng)

    render json: @game
  end

end
