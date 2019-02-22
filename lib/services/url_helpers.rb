module Services
  class UrlHelpers
    include Singleton
    include Rails.application.routes.url_helpers

    def self.method_missing(method, *args)
      return instance.send(method, *args) if instance.respond_to?(method)
      super
    end
  end
end