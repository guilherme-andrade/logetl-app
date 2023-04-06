# frozen_string_literal: true

class Role < ApplicationRecord
  has_and_belongs_to_many :members, join_table: :members_roles # rubocop:disable Rails/HasAndBelongsToMany

  belongs_to :resource,
             polymorphic: true,
             optional: true

  validates :resource_type,
            inclusion: { in: Rolify.resource_types },
            allow_nil: true

  scopify
end
