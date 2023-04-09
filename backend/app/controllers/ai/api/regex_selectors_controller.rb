# frozen_string_literal: true

module AI
  module API
    class RegexSelectorsController < ::API::PrivateController
      def create
        generator = RegexSelectorGenerator.new
        result = generator.generate(log: regex_selector_params[:log], log_list: regex_selector_params[:log_list])

        render json: { result: }
      end

      private

      def regex_selector_params
        params.permit(:log, log_list: [])
      end
    end
  end
end
