# frozen_string_literal: true

module API
  class SessionsController < ApplicationController
    def create
      resolve('users.authenticate').call(params) do |m|
        m.success do |user:, token:|
          render json: { user: user, token: token }, status: :created
        end

        m.failure :invalid_credentials do
          render json: { error: 'Invalid credentials' }, status: :unauthorized
        end

        m.failure do
          render json: { error: 'Something went wrong' }, status: :internal_server_error
        end
      end
    end
  end
end
