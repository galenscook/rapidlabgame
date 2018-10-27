# frozen_string_literal: true

get '/' do
  redirect '/participants'
end

get '/participants' do
  @participants = Participant.all.order(:time)
  erb :"participants/index"
end

get '/participants/new' do
  @participant = Participant.new
  erb :"/participants/new"
end

post '/participants' do
  @participant = Participant.new(params[:participant])

  if @participant.save
    redirect "/game/#{@participant.id}"
  else
    erb :"/participants/new"
  end
end

get '/participants/admin_list' do
  @participants = Participant.all.order(:time)
  erb :"participants/admin_list"
end

get '/participants/download' do
  participants = Participant.all
  prepped_csv = CSV.generate do |csv|
    csv << Participant.attribute_names
    participants.each { |r| csv << r.attributes.values }
  end
  content_type 'application/csv'
  attachment   'data.csv'

  prepped_csv
end

patch '/participants/:id' do
  @participant = Participant.find(params[:id])
  @participant.time = params[:time]
  @participant.save

  rank = Participant.where('time < ?', @participant.time).count + 1
  return { rank: rank }.to_json
end

delete '/participants/:id' do
  @participant = Participant.find(params[:id])
  @participant.destroy
  202
end

get '/game/:participant_id' do
  @participant = Participant.find(params[:participant_id])
  erb :"/game"
end
