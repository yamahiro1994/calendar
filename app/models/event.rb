class Event < ApplicationRecord
  # extend ActiveHash::Associations::ActiveRecordExtensions
  # belongs_to_active_hash :color
  belongs_to :user, optional: true
  validates :title, presence: true
end
