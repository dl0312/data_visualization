import React from "react";
import "./App.css";
import { kobisApi } from "./api";
import { IBoxOfficeRes } from "./shard-interfaces";
import { MovieCard } from "./components/MovieCard";
import { GlobalStyle } from "./global-styles";
import styled from "styled-components";
import Filter from "./components/Filter";
import moment from "moment";

const AppContainer = styled.main``;

const MovieList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

interface Props {}

interface State {
  dateRange: "daily" | "weekly";
  targetDt: string;
  BoxOfficeList: IBoxOfficeRes[];
}

export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      dateRange: "daily",
      targetDt: moment(Date.now())
        .subtract(2, "days")
        .format("YYYYMMDD"),
      BoxOfficeList: []
    };
  }

  componentDidMount = async () => {
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

  render() {
    const { targetDt, BoxOfficeList } = this.state;
    console.log(BoxOfficeList);
    return (
      <>
        <GlobalStyle />
        <AppContainer>
          <Filter
            changeDateRange={this.changeDateRange}
            changeTargetDate={this.changeTargetDate}
            targetDt={targetDt}
          />
          <MovieList>
            {BoxOfficeList &&
              BoxOfficeList.map((boxOfficeData: IBoxOfficeRes) => (
                <MovieCard key={boxOfficeData.movieCd} data={boxOfficeData} />
              ))}
          </MovieList>
        </AppContainer>
      </>
    );
  }
}
