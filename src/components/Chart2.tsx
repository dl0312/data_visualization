import React from "react";
import styled from "styled-components";
import chart from "billboard.js";
import { endgameDailyRankAudiCnt } from "../static/endgame";
import { usDailyRankAudiCnt } from "../static/us";
import { moneyDailyRankAudiCnt } from "../static/money";

// const tick = 4000;

interface Props {}

interface State {
  myChart: any;
}

const ChartContainer = styled.div``;

/*

  Chart2: 한 화면에 세 영화의 박스오피스 정보를 보여줍니다.

  */
export default class Chart2 extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      myChart: null
    };
  }
  componentDidMount = async () => {
    this._renderBoxOfficeChart(
      endgameDailyRankAudiCnt,
      usDailyRankAudiCnt,
      moneyDailyRankAudiCnt
    );
  };

  _renderBoxOfficeChart = (...apis: object[]) => {
    /*

      json 구조:  { rank1, date1, rank2, date2, ... }
      ( object이기 때문에 순서 상관 없습니다. )
      
      xs   구조:  { rank1: "date1", rank2: "date2", ... }
      ( object이기 때문에 순서는 상관 없지만 key와 value가 바뀌어서는 안됩니다. )
    
      */
    let json = {};
    let xs = {};
    let names = {};
    apis.forEach((api: any, idx: number) => {
      const {
        data: { rank, date }
      } = api;
      json[`rank${idx}`] = rank;
      json[`date${idx}`] = date;
      xs[`rank${idx}`] = `date${idx}`;
      names[`rank${idx}`] = api.movieNm;
    });
    const myChart = chart.generate({
      bindto: "#chart2",
      data: {
        xs,
        json,
        names
      },
      axis: {
        y: {
          inverted: true
        },
        x: {
          type: "timeseries"
        }
      }
    });
    this.setState({ myChart });
  };

  render() {
    return <ChartContainer id="chart2" />;
  }
}
