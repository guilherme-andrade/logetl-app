class CreateLogfiles < ActiveRecord::Migration[7.0]
  def change
    create_table :logfiles do |t|
      t.datetime :start_date
      t.datetime :end_date
      t.string :name
      t.string :slug

      t.timestamps
    end
  end
end
