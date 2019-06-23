class BooksController < ApplicationController

  before_action :get_by_id, :only => [:show,:destroy,:edit,:update]

  def index
    @books = Book.all
  end

  def edit
    #@book = Book.find(params[:id])
  end

  def new
    #可写可不写 @book = Book.new
  end

  def create
    Book.create :name=>params[:name], :author=>params[:author]
    redirect_to books_path
  end

  def show
    #@book = Book.find(params[:id])
  end

  def update
    #@book = Book.find params[:id]
    @book.update :name=>params[:name],:author=>params[:author]
    @book.save
    redirect_to books_path
  end

  def destroy
    # @book = Book.find params[:id]
    @book.delete
    redirect_to books_path
  end

  def get_by_id
    @book = Book.find params[:id]

  end
end
