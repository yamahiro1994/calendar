class Event < ApplicationRecord
  include ActiveModel::Model
  belongs_to :user, optional: true
  validates :title, presence: true
end
