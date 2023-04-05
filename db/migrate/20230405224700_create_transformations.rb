class CreateTransformations < ActiveRecord::Migration[7.0]
  def change
    create_table :transformations, id: :uuid, default: 'gen_random_uuid()' do |t|
      t.string :title, null: false
      t.string :slug, null: false
      t.text :script, null: false
      t.references :account, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
