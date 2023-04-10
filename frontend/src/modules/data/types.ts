export type Logfile = {
  id: string;
  name: string;
  content: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
};

export type Query = {
  id: string;
  title: string;
  selectorRegex: string;
  logExample: string;
  createdAt: string;
  updatedAt: string;
};
