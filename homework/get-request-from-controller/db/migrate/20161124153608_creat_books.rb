class CreatBooks < ActiveRecord::Migration
  def up
    create_table :books do |t|
      t.string :name
      t.string :author
      t.timestamps
    end
  end

  def down
    drop_table :books
  end
end
