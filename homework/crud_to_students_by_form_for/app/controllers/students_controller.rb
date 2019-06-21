class StudentsController < ApplicationController

  before_action :get_by_id, :only => [:show, :destroy, :update, :edit]

  private
  def get_by_id
    @student = Student.find params[:id]
  end

  def index
    @students = Student.all
  end

  def new
    @student = Student.new
  end

  def create
    @student = Student.new params[:student]
    if params[:hobby].present?
      @student.hobby = params[:hobby].to_yaml
    else
      @student.hobby = [].to_yaml
    end
    @student.save
    redirect_to students_path
  end

  def show
  end

  def edit
  end

  def update
    @student.update params[:student]
    @student.hobby = params[:hobby]
    @student.save
    redirect_to students_path
  end

  def destroy
   @student.delete
   redirect_to students_path
  end

end
