# frozen_string_literal: true

module API
  class BaseController < ApplicationController
    include JSONAPI::ActsAsResourceController

    skip_before_action :verify_authenticity_token

    def context
      { current_user: }
    end

    def current_user
      nil
    end
  end
end
