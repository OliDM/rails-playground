module Types
  class MutationType < Types::BaseObject
    field :toggle_library_status, mutation: Mutations::ToggleLibraryStatus
  end
end