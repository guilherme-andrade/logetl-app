class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users, id: :uuid, default: 'gen_random_uuid()' do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :email, null: false
      t.string :username, null: false
      t.string :slug, null: false
      t.string :password_digest

      t.timestamps
    end
  end
end
