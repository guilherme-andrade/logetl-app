# frozen_string_literal: true

class RolifyCreateRoles < ActiveRecord::Migration[7.0]
  def change
    create_table :roles, id: :uuid, default: 'gen_random_uuid()' do |t|
      t.string :name
      t.references :resource, polymorphic: true

      t.timestamps
    end

    create_table :members_roles, id: false do |t|
      t.references :member, type: :uuid
      t.references :role, type: :uuid
    end

    add_index(:roles, %i[name resource_type resource_id])
    add_index(:members_roles, %i[member_id role_id])
  end
end
