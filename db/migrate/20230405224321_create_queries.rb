class CreateQueries < ActiveRecord::Migration[7.0]
  def change
    create_table :queries, id: :uuid, default: 'gen_random_uuid()' do |t|
      t.json :ast, null: false, default: {}
      t.json :extractor_ast, null: false, default: {}
      t.string :title, null: false
      t.string :slug, null: false
      t.references :account, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
