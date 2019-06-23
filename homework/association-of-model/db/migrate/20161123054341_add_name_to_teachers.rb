class AddNameToTeachers < ActiveRecord::Migration
  def change
    add_column :teachers, :name, :string
  end
end
