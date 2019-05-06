import React from "react";
import { IBoxOfficeRes } from "../shard-interfaces";
import styled from "styled-components";

const MovieCardContainer = styled.div`
  margin: 1rem;
  line-height: 1.5rem;
`;

interface Props {
  data: IBoxOfficeRes;
}

export const MovieCard: React.SFC<Props> = ({ data }) => (
  <MovieCardContainer>
    <div>번호: {data.rnum}</div>
    <div>박스오피스 순위: {data.rank}</div>
    <div>전일대비 순위 증감분: {data.rankInten}</div>
    <div>랭킹 신규진입여부: {data.rankOldAndNew}</div>
    <div>영화 대표코드: {data.movieCd}</div>
    <div>영화명(국문): {data.movieNm}</div>
    <div>개봉일: {data.openDt}</div>
    <div>해당일 매출액: {data.salesAmt}</div>
    <div>
      해당일자 상영작의 매출총액 대비 해당 영화의 매출비율: {data.salesShare}
    </div>
    <div>전일 대비 매출액 증감분: {data.salesInten}</div>
    <div>전일 대비 매출액 증감 비율: {data.salesChange}</div>
    <div>누적매출액: {data.salesAcc}</div>
    <div>해당일의 관객수: {data.audiCnt}</div>
    <div>전일 대비 관객수 증감분: {data.audiInten}</div>
    <div>전일 대비 관객수 증감 비율: {data.audiChange}</div>
    <div>누적관객수: {data.audiAcc}</div>
    <div>해당일자에 상영한 스크린수: {data.scrnCnt}</div>
    <div>해당일자에 상영된 횟수: {data.showCnt}</div>
  </MovieCardContainer>
);
