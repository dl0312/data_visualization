import React from "react";
import styled from "styled-components";
import chart from "billboard.js";
import { endgameDailyRankAudiCnt } from "../static/endgame";
import moment from "moment";
import { usDailyRankAudiCnt } from "../static/us";
import { moneyDailyRankAudiCnt } from "../static/money";

const tick = 4000;

interface Props {}

interface State {
  myChart: any;
}

const ChartContainer = styled.div``;

/*

  Chart1: 한 영화의 날짜별 박스 오피스 데이터(당일 관객수, 누적 관객수, 순위, 매출액)를 보여줍니다.
  세 영화(어벤져스: 엔드게임, 어스, 돈)가 번갈아서 보여집니다.

*/
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

  _rerenderBoxOfficeChart = (api: any) => {
    const { data: json, movieNm } = api;
    this.state.myChart.load({
      names: {
        rank: `《${movieNm}》 순위`,
        audiCnt: `《${movieNm}》 누적 관객수`
      },
      json
    });
  };

  _renderBoxOfficeChart = (api: any) => {
    /*

      json 구조:  { date, rank, audiCnt }
      ( object이기 때문에 순서 상관 없습니다. )

      axis의 object는 x, y, y2로 꼭 정해진 값을 사용해야 합니다.

      */
    const { data: json, movieNm } = api;
    const myChart = chart.generate({
      title: {
        text: `Daily box office rank & audience count`
      },
      bindto: "#chart1",
      data: {
        x: "date",
        json: json,
        axes: {
          rank: "y",
          audiCnt: "y2"
        },
        types: {
          rank: "step",
          audiCnt: "area-spline"
        },
        names: {
          rank: `《${movieNm}》 순위`,
          audiCnt: `《${movieNm}》 누적 관객수`
        }
      },
      axis: {
        y: {
          inverted: true
        },
        y2: {
          show: true
        },
        x: {
          type: "timeseries",
          localtime: true,
          tick: {
            format: "%Y-%m-%d"
          }
        }
      },
      zoom: {
        enabled: {
          type: "drag"
        }
      },
      tooltip: {
        format: {
          title: (d: any) => {
            return moment(d).format("YYYY-MM-DD");
          }
        }
      }
    });
    this.setState({ myChart });
  };

  render() {
    return <ChartContainer id="chart1" />;
  }
}
