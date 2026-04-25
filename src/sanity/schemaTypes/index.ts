import order from "./order";
import download from "./download";
import proxyUrl from "./proxy-url";
import secureToken from "./secure-token";
import pageView from "./page-view";
import userEvent from "./user-event";
import systemMetric from "./system-metric";
import errorLog from "./error-log";
import performanceMetric from "./performance-metric";
import conversionEvent from "./conversion-event";

export const schemaTypes = [
  order,
  download,
  proxyUrl,
  secureToken,
  pageView,
  userEvent,
  systemMetric,
  errorLog,
  performanceMetric,
  conversionEvent,
];
