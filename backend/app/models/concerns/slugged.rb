# frozen_string_literal: true

module Slugged
  extend ActiveSupport::Concern

  class_methods do
    def slug(attribute)
      before_validation do
        self.slug = send(attribute).parameterize if send(attribute).present?
      end
    end
  end
end
