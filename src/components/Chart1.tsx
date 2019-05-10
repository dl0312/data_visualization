import React from "react";
import styled from "styled-components";
import chart from "billboard.js";
// import { IBoxOfficeRes } from "../shard-interfaces";
import { endgameDailyRankAudiCnt } from "../static/endgame";
import { usDailyRankAudiCnt } from "../static/us";
import { moneyDailyRankAudiCnt } from "../static/money";

const tick = 4000;

interface Props {}

interface State {
  myChart: any;
}

const ChartContainer = styled.div``;

// 한 영화의 날짜별 박스 오피스 데이터(당일 관객수, 누적 관객수, 순위, 매출액)
// 세 영화 (어벤져스: 엔드게임, 어스, 돈)이 벌갈아서 보여집니다.
export default class Chart1 extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      myChart: null
    };
  }
  componentDidMount = async () => {
    this._renderBoxOfficeChart(endgameDailyRankAudiCnt);
    setTimeout(() => {
      this._rerenderBoxOfficeChart(usDailyRankAudiCnt);
    }, tick);
    setTimeout(() => {
      this._rerenderBoxOfficeChart(moneyDailyRankAudiCnt);
    }, tick * 2);
    setInterval(() => {
      this._rerenderBoxOfficeChart(endgameDailyRankAudiCnt);
      setTimeout(() => {
        this._rerenderBoxOfficeChart(usDailyRankAudiCnt);
      }, tick);
      setTimeout(() => {
        this._rerenderBoxOfficeChart(moneyDailyRankAudiCnt);
      }, tick * 2);
    }, tick * 3);
  };

  _rerenderBoxOfficeChart = (json: any) => {
    this.state.myChart.load({
      json
    });
  };

  _renderBoxOfficeChart = (json: any) => {
    const { rank } = json;
    const myChart = chart.generate({
      bindto: "#chart1",
      data: {
        x: "date",
        json: json,
        axes: {
          rank: "y",
          audiCnt: "y2"
        },
        types: {
          rank: "line",
          audiCnt: "area-spline"
        }
      },
      axis: {
        y: {
          inverted: true,
          max: Math.max.apply(Math, rank) - 1,
          min: Math.min.apply(Math, rank)
        },
        y2: {
          show: true
        },
        x: {
          type: "timeseries"
        }
      }
    });
    this.setState({ myChart });
  };

  render() {
    return <ChartContainer id="chart1" />;
  }
}
