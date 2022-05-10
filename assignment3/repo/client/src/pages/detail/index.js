/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import moment from "moment";

import StockChart from "../../components/StockChart.js";

import apiHelper from "../../api/apiHelper";
import Menu from "../../components/Menu";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import SimpleTable from "../../components/SimpleTable";

export default function Detail() {
  const location = useLocation();
  const navigate = useNavigate();

  const [symbol, setSymbol] = useState(location.state?.symbol || "AAPL");
  const [quote, setQuote] = useState(null);

  useEffect(() => {

    (async () => {
      let tmpSymbol = location?.state?.symbol;
      setSymbol(tmpSymbol);

      const data = await apiHelper.getQuote(symbol);
      setQuote(data);
    })();
  }, [location]);

  const StockInfo = () => {
    let list = [];
    let item = quote.quote[0];

    list.push({key : "Market Price", value : item.price});
    list.push({key : "Change Percentage", value : item.changesPercentage});
    list.push({key : "Change Amount", value : item.change});
    list.push({key : "Day Low", value : item.dayLow});
    list.push({key : "Day High", value : item.dayHigh});
    list.push({key : "Market Cap", value : item.marketCap});
    list.push({key : "50 Price Average", value : item.priceAvg50});
    list.push({key : "200 Price Average", value : item.priceAvg200});
    list.push({key : "Volume", value : item.volume});
    list.push({key : "Average Volume", value : item.avgVolume});
    list.push({key : "Exchange", value : item.exchange});
    list.push({key : "Open", value : item.open});
    list.push({key : "Previous Close", value : item.previousClose});
    list.push({key : "Update", value : `${moment(new Date(item.timestamp*1000)).format("YYYY-MM-DD HH:mm:ss")}`});

    return <SimpleTable list={list} />;
  }

  if (!quote) return <Spinner/>

  return (
    <>
      <Container>
        <Menu />
        <StockChart symbol={symbol} data={quote} name={quote?.quote[0]?.name}/>
        <StockInfo/>
      </Container>
    </>
  );
}
