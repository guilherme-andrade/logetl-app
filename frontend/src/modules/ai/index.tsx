import axios from "axios";
export { useMutation, useQuery } from "react-query";

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

export const createRegexExtractor = ({
  log,
  properties,
}: {
  log: string;
  properties: string[];
}) =>
  aiApi.post("/regex_extractors", { log, properties }).then((res) => res.data);
