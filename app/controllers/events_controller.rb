class EventsController < ApplicationController
  before_action :set_event, only: [:show, :edit, :update, :destroy]
  #パラメータのidからレコードを特定する
  protect_from_forgery with: :null_session


  def index
    @events = Event.all.includes(:user)
    # @user = User.find(current_user.id)
    # @events = Event.where(user_id: current_user.id)


    respond_to do |format|
      format.html # index.html.erb
      format.xml { render :xml => @events }
      format.json { render :json => @events }
    end
  end

  def create
    # binding.pry
    @events = Event.new(event_params)
    if @events.save!
      respond_to do |format|
        format.html { redirect_to @events, notice: 'Event was successfully created.' }
        format.json { render :show, status: :created, location: @events }
      else
        format.html { render :new }
        format.json { render json: @events.errors, status: :unprocessable_entity }
      end
    end
  end


  def show
  end

  def edit
  end

  def update
    if @event.update(event_params)
      respond_to do |format|
        format.html { redirect_to @event, notice: 'Event was successfully updated.' }
        format.json { render :show, status: :ok, location: @event }
      else
        format.html { render :edit }
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @event.destroy
    respond_to do |format|
      format.html { redirect_to events_url, notice: 'Event was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

    def set_event
      @event = Event.find(params[:id])
    end

    def event_params
      params.require(:event).permit(:title, :start, :end, :color, :allday, :user_id)
    end
end
