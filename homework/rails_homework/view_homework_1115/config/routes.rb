Rails.application.routes.draw do
  resources :my_views do
    collection do
      get :simplest_view
      get :hello_from_action
      get :show_footer
      get :show_a_list
    end
  end
end
