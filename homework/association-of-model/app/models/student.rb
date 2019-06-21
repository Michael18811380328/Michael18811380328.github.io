class Student < ActiveRecord::Base
  has_many :lessons
  has_many :teachers, :through => :lessons
end
