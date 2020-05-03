class EventsController < ApplicationController
  before_action :set_event, only: [:show, :edit, :update, :destroy] #パラメータのidからレコードを特定するメソッド

  def index
    @events = Event.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml { render :xml => @events }
      format.json { render :json => @events }
    end
  end

  def show
  end

  def new
    @event = Event.new
    render plain: render_to_string(partial: 'form_new', layout: false, locals: { event: @event })
  end

  def edit
  end

  # def create
  #   @event = Event.new(event_params)

  #   respond_to do |format|
  #     if @event.save!
  #       format.html { redirect_to @event, notice: 'Event was successfully created.' }
  #       format.json { render :show, status: :created, location: @event }
  #     else
  #       format.html { render :new }
  #       format.json { render json: @event.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end

  # def update
  #   respond_to do |format|
  #     if @event.update(event_params)
  #       format.html { redirect_to @event, notice: 'Event was successfully updated.' }
  #       format.json { render :show, status: :ok, location: @event }
  #     else
  #       format.html { render :edit }
  #       format.json { render json: @event.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end

  # def destroy
  #   @event.destroy
  #   respond_to do |format|
  #     format.html { redirect_to events_url, notice: 'Event was successfully destroyed.' }
  #     format.json { head :no_content }
  #   end
  # end

  def create
    event = Event.new(event_params)
    event.save!
    @events = Event.where(user_id: current_user.id)
  end

  def update
      event = Event.find(params[:id])
      @events = Event.where(user_id: current_user.id)
      event.update(event_params)
  end

  def destroy
      @user = User.find(params[:id])
      event = Event.find(params[:id])
      event.destroy
      # redirect_to user_path(@user)
  end

  private
    def set_event
      @event = Event.find(params[:id])
    end

    def event_params
      params.require(:event).permit(:title, :start, :end, :color, :allday, :user_id)
    end
end
