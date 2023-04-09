# frozen_string_literal: true

module API
  class TenantedController < PrivateController
    set_current_tenant_through_filter
    before_action :set_tenant

    private

    delegate :current_tenant, to: ActsAsTenant

    def set_tenant
      current_account = Account.find_by!(subdomain: request.subdomain)
      set_current_tenant(current_account)
    end
  end
end
