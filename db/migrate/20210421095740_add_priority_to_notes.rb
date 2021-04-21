class AddPriorityToNotes < ActiveRecord::Migration[6.0]
  def change
    add_column :notes, :priority, :integer, default: 0
  end
end
