class BooksController < ApplicationController
  def create_a_book
    Book.create :author=>'大刘',:title=>'三体'
  end
  def update_the_book
    Book.find(3).update :author=>'更改姓名'
  end
  def search_the_book
    bookw=Book.where('id=?',3)
    bookf=Book.find(3)
    @bookw=bookw.size
    @bookf=bookf
    #render :text=> a 此处输出结果为#
  end
  def delete_the_book
    Book.find(5).delete
  end

  def index
    render json: {
      message: 'hello'
    }
  end

  def new
    render json: {
      message: 'new'
    }
  end

end
