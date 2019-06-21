class AddNameToLessons < ActiveRecord::Migration
  def change
    add_column :lessons, :name, :string
  end
end
