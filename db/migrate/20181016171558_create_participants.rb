class CreateParticipants < ActiveRecord::Migration
  def change
    create_table :participants do |t|
      t.string :name
      t.string :email
      t.float :time

      t.timestamps
    end
  end
end
