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
    @event = Event.find(params[:id])
    render json: @event.to_json
  end

  def edit
    @event = Event.find(params[:id])
  end

  def update
    @event = Event.find(params[:id])
    event_params.require(:title)
    event_params.require(:start)
    event_params.require(:end)
    # event_params.require(:color)
    # event_params.require(:allday)
    respond_to do |format|
      format.any
      if @event.update!(event_params)
        @event.save
        render json: @event.to_json
      else
        render json: {status: "ng", code: 500, content: {message: "エラーだよ"}}
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
