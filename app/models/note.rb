# frozen_string_literal: true

class Note < ApplicationRecord
  enum status: [:todo, :inprogress, :done]
  enum priority: [:low, :medium, :high, :critical]
  belongs_to :user
  validates :title, :description, presence: true
  validates :title, uniqueness: true

end
