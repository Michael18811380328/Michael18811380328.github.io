class AddStudentIdAndTeacherIdToLessons < ActiveRecord::Migration
  def change
    add_column :lessons, :student_id, :integer
    add_column :lessons, :teacher_id, :integer

  end
end
