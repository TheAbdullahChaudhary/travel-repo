# frozen_string_literal: true

module Api
  class ValidationsController < Api::BaseController
    def show
      render json: { status: :ok }
    end
  end
end
