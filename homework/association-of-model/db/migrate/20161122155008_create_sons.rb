class CreateSons < ActiveRecord::Migration
  def change
    create_table :sons do |t|
      t.string :name
      t.integer :mother_id
      t.timestamps
    end
  end
end
