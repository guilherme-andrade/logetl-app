# frozen_string_literal: true

module API
  class BaseController < ApplicationController
    include JSONAPI::ActsAsResourceController

    protect_from_forgery with: :null_session

    def context
      { current_user: current_user }
    end

    def current_user
      nil
    end
  end
end
