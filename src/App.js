import React, { useEffect, useState } from "react";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Columns from "react-columns";
import BorderWrapper from "react-border-wrapper";

const useStyles = makeStyles((theme) => ({
  dicContainer: {
    display: "flex",
    margin: 20,
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  root: {
    width: 345,
    height: "206px !important",
  },
  text: {
    color: "#fff",
  },
  CardContiner: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
  cardGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: "10px",
    paddingTop: "10px",
  },
}));

export default function App() {
  const [latest, setStatus] = useState([]);
  const [latestCountriesStatus, setCountries] = useState([]);
  const [searchCountries, setSearchCountries] = useState("");
  useEffect(() => {
    axios
      .all([
        axios.get("https://corona.lmao.ninja/all"),
        axios.get("https://corona.lmao.ninja/countries"),
      ])
      .then((responseArray) => {
        setStatus(responseArray[0].data);
        setCountries(responseArray[1].data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const date = new Date(parseInt(latest.updated));
  const lastUpdated = date.toString();
  const filteredValue = latestCountriesStatus.filter(item => {
    return searchCountries !== "" ? item.country === searchCountries : item;
  })
  const countries = filteredValue.map((data) => {
    return (
      <div className={classes.cardGroup} key={data.country}>
        <BorderWrapper>
          <div className="card">
            <img
              src={data.countryInfo.flag}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">{data.country}</h5>
              <p className="card-text">Cases : {data.cases}</p>
              <p className="card-text">Deaths : {data.deaths}</p>
              <p className="card-text">Recovered : {data.recovered}</p>
              <p className="card-text">Active : {data.active}</p>
              <p className="card-text">Today's Case : {data.todayCases}</p>
              <p className="card-text">Today's Death : {data.todayDeaths}</p>
            </div>
          </div>
        </BorderWrapper>
      </div>
    );
  });

  var queries = [
    {
      columns: 2,
      query: "min-width: 500px",
    },
    {
      columns: 3,
      query: "min-width: 1000px",
    },
  ];
  return (
    <div className={classes.container}>
      <div className={classes.dicContainer}>
        <div style={{ padding: 20 }}>
          <Card style={{ backgroundColor: "#2475B0" }} className={classes.root}>
            <CardContent className={classes.CardContiner}>
              <div>
                <h1>Cases</h1>
                <h3>{latest.cases}</h3>
                <h5>
                  Last Updated{" "}
                  {lastUpdated === "Invalid Date" ? "" : lastUpdated}
                </h5>
              </div>
            </CardContent>
          </Card>
        </div>
        <div style={{ padding: 20 }}>
          <Card style={{ backgroundColor: "#B83227" }} className={classes.root}>
            <CardContent className={classes.CardContiner}>
              <div>
                <h1>Deaths</h1>
                <h3>{latest.deaths}</h3>
                <h5>
                  Last Updated{" "}
                  {lastUpdated === "Invalid Date" ? "" : lastUpdated}
                </h5>
              </div>
            </CardContent>
          </Card>
        </div>
        <div style={{ padding: 20 }}>
          <Card style={{ backgroundColor: "#26ae60" }} className={classes.root}>
            <CardContent className={classes.CardContiner}>
              <div>
                <h1>Recovered</h1>
                <h3>{latest.recovered}</h3>
                <h5>
                  Last Updated{" "}
                  {lastUpdated === "Invalid Date" ? "" : lastUpdated}
                </h5>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <TextField
        id="outlined-search"
        fullWidth
        label="Search field"
        type="search"
        variant="outlined"
        onChange={event => setSearchCountries(event.target.value)}
      />
      <Columns style={{ display: "flex" }} queries={queries}>
        {countries}
      </Columns>
    </div>
  );
}
