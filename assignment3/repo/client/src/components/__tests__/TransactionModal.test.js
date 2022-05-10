import { render, screen } from "@testing-library/react";
import TransactionModal from "../TransactionModal";
import { MemoryRouter } from "react-router-dom";

test("Check Tag exist", async () => {
  
  const handleClose = jest.fn();
  const handleConfirm = jest.fn();
  const show = true;
  const txnData = { symbol : "TSLA", action: "Buy" };

  const { container } = render(
    <MemoryRouter>
      <TransactionModal
          handleClose={handleClose}
          handleConfirm={handleConfirm}
          show={show}
          txnData={txnData}
        />
    </MemoryRouter>
  );
  screen.getByText("To record your transaction, please input the following details:");
});
