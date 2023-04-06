# frozen_string_literal: true

class CreateAccounts < ActiveRecord::Migration[7.0]
  def change
    create_table :accounts, id: :uuid, default: 'gen_random_uuid()' do |t|
      t.string :name, null: false
      t.string :slug, null: false

      t.timestamps
    end
  end
end
