import axios from "axios";
export {
  useMutation as useAiMutation,
  useQuery as useAiQuery,
} from "react-query";

const aiApi = axios.create({
  baseURL: "http://localhost:4000/ai/api",
});

export const createRegexSelector = ({
  log,
  logList,
}: {
  log: string;
  logList: string[];
}) => aiApi.post("/regex_selectors", { log, logList }).then((res) => res.data);

export const createRegexExtractorService = ({
  log,
  properties,
}: {
  log: string;
  properties: string[];
}) =>
  aiApi.post("/regex_extractions", { log, properties }).then((res) => res.data);
