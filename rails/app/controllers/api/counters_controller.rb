# frozen_string_literal: true

module Api
  class CountersController < Api::BaseController
    @@counter = 0

    def show
      render json: { data: { count: @@counter } }
    end

    def create
      @@counter += 1

      render json: { status: :ok }
    end

    def destroy
      @@counter -= 1

      render json: { status: :ok }
    end
  end
end
