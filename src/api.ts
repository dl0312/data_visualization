import axios from "axios";
import {
  IYoutubeSearchApiParams,
  IDailyBoxOfficeListReq,
  IWeeklyBoxOfficeListReq
} from "./shard-interfaces";

const kobisApiBase = axios.create({
  baseURL: "https://www.kobis.or.kr/kobisopenapi/webservice/rest/",
  params: { key: process.env.REACT_APP_KOBIS_API_KEY }
});

export const kobisApi = {
  dailyBoxOffice: (params: IDailyBoxOfficeListReq) =>
    kobisApiBase.get("boxoffice/searchDailyBoxOfficeList.json", { params }),
  weeklyBoxOffice: (params: IWeeklyBoxOfficeListReq) =>
    kobisApiBase.get("boxoffice/searchWeeklyBoxOfficeList.json", { params })
};

const youtubeApiBase = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/"
});

export const youtubeApi = {
  search: (params: IYoutubeSearchApiParams) =>
    youtubeApiBase.get(`search`, {
      params
    })
};

// const api = axios.create({
//   baseURL: "https://openapi.naver.com/v1/datalab/",
//   headers: {
//     "X-Naver-Client-Id": process.env.REACT_APP_NAVER_ID,
//     "X-Naver-Client-Secret": process.env.REACT_APP_NAVER_SECRET,
//     "Content-Type": "application/json",
//     "Access-Control-Allow-Origin": "*"
//   }
// });
// export const shoppingApi = {
//   categories: (
//     startDate: string,
//     endDate: string,
//     timeUnit: "date" | "weak" | "month",
//     category: { name: string; param: string[] }[],
//     device?: "pc" | "mo",
//     gender?: "m" | "f",
//     ages?: string[]
//   ) =>
//     api.post("categories", {
//       data: {
//         startDate: "2017-08-01",
//         endDate: "2017-09-30",
//         timeUnit: "month",
//         category: [
//           { name: "패션의류", param: ["50000000"] },
//           { name: "화장품/미용", param: ["50000002"] }
//         ],
//         device: "pc",
//         ages: ["20", "30"],
//         gender: "f"
//       }
//     }),
//   categoryDevice: () => api.get("category/device"),
//   categoryGender: () => api.get("category/gender"),
//   categoryAge: (
//     startDate: string,
//     endDate: string,
//     timeUnit: "date" | "weak" | "month",
//     category: string,
//     device?: "pc" | "mo",
//     gender?: "m" | "f",
//     ages?: string[]
//   ) =>
//     api.post("category/age", {
//       data: JSON.stringify({
//         startDate: "2017-08-01",
//         endDate: "2017-09-30",
//         timeUnit: "month",
//         category: 1
//       })
//     })
// };
