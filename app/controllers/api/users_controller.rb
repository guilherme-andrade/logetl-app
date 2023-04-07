# frozen_string_literal: true

module API
  class UsersController < TenantedController
    skip_before_action :authenticate_user!, only: [:create]
  end
end
