export interface IDailyBoxOfficeListReq {
  targetDt: string;
  itemPerPage?: string;
  multiMovieYn?: "Y" | "N";
  repNationCd?: "K" | "F";
  wideAreaCd?: string;
}

export interface IWeeklyBoxOfficeListReq {
  targetDt: string;
  weekGb?: "0" | "1" | "2";
  itemPerPage?: string;
  multiMovieYn?: "Y" | "N";
  repNationCd?: "K" | "F";
  wideAreaCd?: string;
}

// boxofficeType: string;
// showRange: string;

export interface IBoxOfficeRes {
  rnum: string;
  rank: string;
  rankInten: string;
  rankOldAndNew: string;
  movieCd: string;
  movieNm: string;
  openDt: string;
  salesAmt: string;
  salesShare: string;
  salesInten: string;
  salesChange: string;
  salesAcc: string;
  audiCnt: string;
  audiInten: string;
  audiChange: string;
  audiAcc: string;
  scrnCnt: string;
  showCnt: string;
}

export interface IYoutubeSearchApiParams {
  part: "id" | "snippet";
  channelId?: string;
  channelType?: "any" | "show";
  eventType?: "completed" | "live" | "upcoming";
  maxResults?: number;
  onBehalfOfContentOwner?: string;
  order?:
    | "date"
    | "rating"
    | "relevance"
    | "title"
    | "videoCount"
    | "viewCount";
  pageToken?: string;
  publishedAfter?: string;
  q?: string;
  regionCode?: string;
  safeSearch?: "moderate" | "none" | "strict";
  topicId?: string;
  type?: "channel" | "playlist" | "video";
  videoCaption?: "any" | "closedCaption" | "none";
  videoCategoryId?: string;
  videoDefinition?: "any" | "high" | "standard";
  videoDimension?: "2d" | "3d" | "any";
  videoDuration?: "any" | "long" | "medium" | "short";
  videoEmbeddable?: "any" | "true";
  videoLicense?: "any" | "creativeCommon" | "youtube";
  videoSyndicated?: "any" | "true";
  videoType?: "any" | "episode" | "movie";
}
