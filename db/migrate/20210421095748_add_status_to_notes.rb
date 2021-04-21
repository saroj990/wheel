class AddStatusToNotes < ActiveRecord::Migration[6.0]
  def change
    add_column :notes, :status, :integer, default: 0
  end
end
