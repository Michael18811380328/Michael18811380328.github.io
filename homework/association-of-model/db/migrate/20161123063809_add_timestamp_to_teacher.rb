class AddTimestampToTeacher < ActiveRecord::Migration
  def change
    add_column :teachers, :time, :timestamp
  end
end
