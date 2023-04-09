# frozen_string_literal: true

module API
  class LogfileResource < ApplicationResource
    attributes :start_date, :end_date, :slug, :name, :created_at, :updated_at

    attribute :content

    def content
      @model.file.attachment.blob.download
    end
  end
end
