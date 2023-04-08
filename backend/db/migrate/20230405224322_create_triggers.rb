# frozen_string_literal: true

class CreateTriggers < ActiveRecord::Migration[7.0]
  def change
    create_table :triggers, id: :uuid, default: 'gen_random_uuid()' do |t|
      t.text :extractor_regex, null: false
      t.string :title, null: false
      t.string :slug, null: false
      t.references :query, null: false, foreign_key: true, type: :uuid
      t.references :account, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
