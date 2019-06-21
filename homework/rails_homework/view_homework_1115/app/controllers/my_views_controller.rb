class MyViewsController < ApplicationController
   def simplest_view
    render :text=>Time.now
   end
   def hello_from_action
     @name='刘婕姝'
   end
   def show_footer
   end
   def show_a_list
   end
end
