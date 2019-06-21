Rails.application.routes.draw do
  resources :select do
    collection do
      get :find_mother_by_son_id
      get :find_teachers_by_student_id
    end
  end
end
