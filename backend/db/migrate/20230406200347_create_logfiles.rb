# frozen_string_literal: true

class CreateLogfiles < ActiveRecord::Migration[7.0]
  def change
    create_table :logfiles, id: :uuid, default: 'gen_random_uuid()' do |t|
      t.datetime :start_date
      t.datetime :end_date
      t.string :name
      t.string :slug
      t.references :account, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
