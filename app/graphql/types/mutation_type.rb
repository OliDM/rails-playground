module Types
  class MutationType < BaseObject
    field :toggle_library_status, mutation: Mutations::ToggleLibraryStatus
    field :update_library, mutation: Mutations::UpdateLibrary
    field :create_library, mutation: Mutations::CreateLibrary
    field :delete_library, mutation: Mutations::DeleteLibrary

    #author
    field :update_author, mutation: Mutations::UpdateAuthor
    field :create_author, mutation: Mutations::CreateAuthor
    field :delete_author, mutation: Mutations::DeleteAuthor
  end
end
