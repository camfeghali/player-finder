class CourtsController < ApplicationController

  def index
    @courts = Court.all
    render json: @courts
  end
  
end
