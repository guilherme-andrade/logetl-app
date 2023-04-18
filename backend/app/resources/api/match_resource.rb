module API
  class MatchResource < ApplicationResource
    attributes :log, :query_id, :created_at, :updated_at
  end
end
