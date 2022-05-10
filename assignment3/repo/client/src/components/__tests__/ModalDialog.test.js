import { render, screen } from "@testing-library/react";
import ModalDialog from "../ModalDialog";
import { MemoryRouter } from "react-router-dom";

test("Check Tag exist", async () => {

    const handleDialogClose = jest.fn();
    

  const { container } = render(
    <MemoryRouter>
      <ModalDialog
          title="Your transaction have been recorded"
          message="Thank you for your purchase"
          show="true"
          handleClose={handleDialogClose}
      />
    </MemoryRouter>
  );
  const tag = screen.getAllByRole("dialog");
  expect(tag[0].innerHTML).toContain("Your transaction have been recorded");
});
