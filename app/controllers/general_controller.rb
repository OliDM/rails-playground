class GeneralController < ApplicationController
  def index; end

  def show
    @id = params.require(:id)
  end
end
