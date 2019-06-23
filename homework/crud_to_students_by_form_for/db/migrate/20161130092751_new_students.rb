class NewStudents < ActiveRecord::Migration
  def up
    create_table :students do |t|
      t.string :name
      t.boolean :sex
      t.string :hobby
      t.text :evaluation
      t.string :constellation
      t.timestamps
    end
  end
  def down
    drop_table :students
  end
end
