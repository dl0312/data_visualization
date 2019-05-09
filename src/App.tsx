import React from "react";
import "./App.css";
import { kobisApi } from "./api";
import { IBoxOfficeRes } from "./shard-interfaces";
import { MovieCard } from "./components/MovieCard";
import { GlobalStyle } from "./global-styles";
import styled from "styled-components";
import Filter from "./components/Filter";
import moment from "moment";
import DateFilter from "./components/DateFilter";
import { Menu } from "antd";
import chart from "billboard.js";
import Papa from "papaparse";

const AppContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const Movisualization = styled.div`
  font-size: 3rem;
  font-weight: 700;
  margin: 1rem 0 2rem 0;
`;

const MovieList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

// const SearchBtn = styled.button`
//   padding: 2rem;
// `;

const MenuIcon = styled.i`
  margin-right: 0.5rem;
`;

const MyChart = styled.div`
  margin: 2rem 0;
`;

interface Props {}

interface State {
  dateRange: "daily" | "weekly";
  movieNm: string;
  fromDt: string;
  toDt: string;
  targetDt: string;
  BoxOfficeList: IBoxOfficeRes[];
  menu: "boxOffice" | "movie" | "person";
  myChart: any;
}

export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      dateRange: "daily",
      movieNm: "",
      fromDt: moment(Date.now())
        .subtract(2, "days")
        .format("YYYYMMDD"),
      toDt: moment(Date.now())
        .subtract(2, "days")
        .format("YYYYMMDD"),
      targetDt: moment(Date.now())
        .subtract(2, "days")
        .format("YYYYMMDD"),
      BoxOfficeList: [],
      menu: "boxOffice",
      myChart: null
    };
  }

  parseCsv = (movieNm: string) => {
    var csvFilePath = require(`./static/${movieNm}.csv`);
    this.setState({ movieNm }, () => {
      Papa.parse(csvFilePath, {
        header: true,
        download: true,
        skipEmptyLines: true,
        // Here this is also available. So we can call our custom class method
        complete: this.updateData
      });
    });
  };

  componentDidMount = async () => {
    let movieNm = "돈";
    this.parseCsv(movieNm);
    setTimeout(() => {
      movieNm = "어벤져스_ 엔드게임";
      this.parseCsv(movieNm);
    }, 2000);
    setTimeout(() => {
      movieNm = "어스";
      this.parseCsv(movieNm);
    }, 4000);
    // this.drawChart();
  };

  updateData = (result: any) => {
    const data: any = result.data;
    // Here this is available and we can call this.setState (since it's binded in the constructor)
    this.setState({ BoxOfficeList: data }, () => {
      this.state.myChart
        ? this._reloadBoxOfficeChart()
        : this._renderBoxOfficeChart();
    }); // or shorter ES syntax: this.setState({ data });
  };

  componentDidUpdate = async (prevProps: Props, prevState: State) => {
    if (
      prevState.dateRange !== this.state.dateRange ||
      prevState.targetDt !== this.state.targetDt
    ) {
      const { dateRange, targetDt } = this.state;
      if (dateRange === "daily") {
        const {
          data: { boxOfficeResult }
        } = await kobisApi.dailyBoxOffice({ targetDt });

        const { dailyBoxOfficeList: BoxOfficeList } = boxOfficeResult;

        this.setState({ BoxOfficeList });
      } else if (dateRange === "weekly") {
        const {
          data: { boxOfficeResult }
        } = await kobisApi.weeklyBoxOffice({ targetDt });
        const { weeklyBoxOfficeList: BoxOfficeList } = boxOfficeResult;
        this.setState({ BoxOfficeList });
      }
    }
  };

  // shouldComponentUpdate = (nextProps: Props, nextState: State) => {
  //   console.log(nextState);
  //   return nextState !== this.state;
  // };

  changeDateRange = (dateRange: "daily" | "weekly") => {
    console.log(dateRange);
    this.setState({ dateRange });
  };

  changeTargetDate = (date: any, targetDt: string) => {
    console.log(date, targetDt);
    this.setState({ targetDt });
  };

  changeRangePicker = (date: any, dateString: string[]) => {
    console.log(date, dateString);
    const fromDt = dateString[0];
    const toDt = dateString[1];
    this.setState({ fromDt, toDt });
  };

  clickMenu = (e: any) => {
    console.log("click ", e);
    this.setState({
      menu: e.key
    });
  };

  _reloadBoxOfficeChart = () => {
    let rankList: number[] = [];
    let audienceList: number[] = [];
    let datelist: number[] = [];

    this.state.BoxOfficeList.forEach((boxOffice: IBoxOfficeRes) => {
      rankList.push(boxOffice.rank);
      audienceList.push(boxOffice.audiAcc);
      datelist.push(parseInt(moment(boxOffice.CurrentDate).format("YYYYMMDD")));
    });

    console.log(this.state.BoxOfficeList, rankList, audienceList, datelist);

    let rank = ["최근 5주 박스오피스 순위", ...rankList];
    let audience = ["누적 관객 수", ...audienceList];

    this.state.myChart.load({
      columns: [rank, audience]
    });
  };

  _renderBoxOfficeChart = () => {
    let rankList: number[] = [];
    let audienceList: number[] = [];
    let datelist: number[] = [];

    this.state.BoxOfficeList.forEach((boxOffice: IBoxOfficeRes) => {
      rankList.push(boxOffice.rank);
      audienceList.push(boxOffice.audiAcc);
      datelist.push(parseInt(moment(boxOffice.CurrentDate).format("YYYYMMDD")));
    });

    console.log(this.state.BoxOfficeList, rankList, audienceList, datelist);

    let rank = ["최근 5주 박스오피스 순위", ...rankList];
    let audience = ["누적 관객 수", ...audienceList];

    const myChart = chart.generate({
      bindto: "#myChart",
      data: {
        columns: [rank, audience],
        colors: {
          "최근 5주 박스오피스 순위": (d: any) => "#72408e",
          "누적 관객 수": "#6fab6f"
        },
        axes: {
          "최근 5주 박스오피스 순위": "y",
          "누적 관객 수": "y2"
        },
        types: {
          "최근 5주 박스오피스 순위": "line",
          "누적 관객 수": "area-spline"
        }
      },
      axis: {
        y: {
          inverted: true,
          max: Math.max.apply(Math, rankList) - 1,
          min: Math.min.apply(Math, rankList)
        },
        y2: {
          show: true
        },
        x: {
          type: "date",
          data: datelist
        }
      }
    });
    this.setState({ myChart });
  };

  render() {
    const { fromDt, toDt, BoxOfficeList, menu } = this.state;
    console.log(BoxOfficeList);
    return (
      <>
        <GlobalStyle />
        <Menu onClick={this.clickMenu} selectedKeys={[menu]} mode="horizontal">
          <Menu.Item key="boxOffice">
            <MenuIcon className="fas fa-ticket-alt" />
            Box Office
          </Menu.Item>
          <Menu.Item key="movie">
            <MenuIcon className="fas fa-film" />
            Movie
          </Menu.Item>
          <Menu.Item key="person">
            <MenuIcon className="far fa-user" />
            Person
          </Menu.Item>
        </Menu>
        <AppContainer>
          <Movisualization>Movisualization</Movisualization>
          <Filter>
            <DateFilter
              changeDateRange={this.changeDateRange}
              changeTargetDate={this.changeTargetDate}
              changeRangePicker={this.changeRangePicker}
              fromDt={fromDt}
              toDt={toDt}
            />
            {/* <SearchBtn>조회하기</SearchBtn> */}
          </Filter>
          {this.state.movieNm}
          <MyChart id="myChart" />
          <MovieList>
            {BoxOfficeList &&
              BoxOfficeList.map((boxOfficeData: IBoxOfficeRes) => (
                <MovieCard key={boxOfficeData.audiAcc} data={boxOfficeData} />
              ))}
          </MovieList>
        </AppContainer>
      </>
    );
  }
}
