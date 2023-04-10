# frozen_string_literal: true

class CreateQueries < ActiveRecord::Migration[7.0]
  def change
    create_table :queries, id: :uuid, default: 'gen_random_uuid()' do |t|
      t.text :selector_regex, null: false
      t.string :title, null: false
      t.string :slug, null: false
      t.text :log_example, null: false
      t.references :account, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
