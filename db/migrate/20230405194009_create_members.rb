class CreateMembers < ActiveRecord::Migration[7.0]
  def change
    create_table :members, id: :uuid, default: 'gen_random_uuid()' do |t|
      t.references :account, null: false, foreign_key: true, type: :uuid
      t.references :user, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
