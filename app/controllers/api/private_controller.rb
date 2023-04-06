# frozen_string_literal: true

module API
  class PrivateController < BaseController
    before_action :authenticate_user!

    private

    def authenticate_user!
      return if current_user

      render json: { error: 'Unauthorized' }, status: :unauthorized
    end

    def current_user
      return @current_user if defined?(@current_user)

      resolve('users.verify_token').call(token: request.headers['Authorization']) do |m|
        m.success do |user:|
          @current_user = user
        end

        m.failure do
          @current_user = nil
        end
      end
    end
  end
end
