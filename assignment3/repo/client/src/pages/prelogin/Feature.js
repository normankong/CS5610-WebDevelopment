/* eslint-disable no-unused-vars */

import React from "react";
import Carousel from "react-bootstrap/Carousel";
import StockChart from "../../components/StockChart.js";

export default function Feature({ features }) {
  return (
    <>
      <Carousel variant="dark">
        {features.map((feature) => (
          <Carousel.Item key={feature.symbol}>
            <StockChart symbol={feature.symbol} name={feature.name}/>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
}
