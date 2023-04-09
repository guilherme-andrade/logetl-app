# frozen_string_literal: true

module AI
  module API
    class RegexExtractionsController < ::API::PrivateController
      def create
        generator = RegexExtractorGenerator.new
        result = generator.generate(log: regex_extraction_params[:log],
                                    properties: regex_extraction_params[:properties])

        render json: { result: }
      end

      private

      def regex_extraction_params
        params.permit(:log, properties: [])
      end
    end
  end
end
