class CourtsController < ApplicationController

  def index
    @courts = Court.all
    render json: @courts
  end

  def create
    user_id = params["user_id"]
    game_id = params["game_id"]
    @court = Court.create(user_id: user_id, game_id: game_id)
    render json: @court
  end

  def destroy
    @court = Court.find(params[:id])
    @court.destroy
    render json: @court
  end

end
