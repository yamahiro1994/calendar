class UsersController < ApplicationController

  def index
  end

  def create
    @user = User.create(user_params)
    if @user.save
      redirect_to root_path
    else
      flash[:notice] = '入力項目に不備があります'
      redirect_back(fallback_location: root_path)
    end
  end

  def show
    @user = User.find(params[:id])
    @events = Event.where(user_id: @user.id)
    @event = Event.new
  end

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password_confirmation)
  end
end
