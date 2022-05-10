/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { PlusCircle, DashCircle, InfoCircle } from "react-bootstrap-icons";

import TransactionModal from "../../components/TransactionModal";
import ModalDialog from "../../components/ModalDialog";

export default function Portfolio({ portfolio, handlePosting, refreshPortfolio}) {
  const portfolios = portfolio.portfolios;
  const [txnData, setTxnData] = useState({});
  const navigate = useNavigate();

  const buy = (symbol) => {
    setTxnData({ symbol, action: "Buy" });
    handleShow();
  };
  const sell = (symbol) => {
    setTxnData({ symbol, action: "Sell" });
    handleShow();
  };
  const info = (symbol) => {
    navigate(`/Detail`, { state: { symbol } });
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleConfirm = async (request) => {

    handlePosting(request, () => {
      handleClose();
      setDialogMessage(`${request.action} ${request.symbol} ${request.quantity} shares at ${request.price}`);
      setDialogShow(true);
    });
  };

  const handleDialogClose = () => {
    refreshPortfolio();
  };

  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogShow, setDialogShow] = useState(false);

  return (
    <>
      <Table responsive bordered hover striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Action</th>
            <th>Symbol</th>
            <th>Holding</th>
            <th>Avg Cost</th>
            <th>Mkt Value</th>
            <th>Profit/Loss</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {portfolios.map((item, index) => (
            <tr key={index} >
              <td>{index + 1}</td>
              <td style={{width:"230px"}}>
                <Button variant="success" onClick={() => buy(item.symbol)} size="sm" aria-label="Buy">
                  Buy <PlusCircle className="button" />
                </Button>
                <Button variant="danger" onClick={() => sell(item.symbol)} size="sm" aria-label="Sell">
                  Sell <DashCircle className="button" />
                </Button>
                <Button variant="warning" onClick={() => info(item.symbol)} size="sm" aria-label="Info">
                  Info <InfoCircle className="button" />
                </Button>
              </td>
              <td>{item.name}({item.symbol})</td>
              <td>{item.holding}</td>
              <td>USD{item.avgCost}</td>
              <td>USD{item.mktValue}</td>
              <td>USD{item.pnlAmt}</td>
              <td>{item.pnlPerc}%</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <TransactionModal
        handleClose={handleClose}
        handleConfirm={handleConfirm}
        show={show}
        txnData={txnData}
      />

      <ModalDialog
          title="Your transaction have been recorded"
          message={dialogMessage}
          show={dialogShow}
          handleClose={handleDialogClose}
      />
    </>
  );
}
