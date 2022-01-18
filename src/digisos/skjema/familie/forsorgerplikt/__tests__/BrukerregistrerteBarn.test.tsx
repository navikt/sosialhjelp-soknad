import React from "react";
import {render, fireEvent, waitFor, screen} from "../../../../../test/test-utils";
import "@testing-library/jest-dom";
import BrukerregistrerteBarn from "../BrukerregistrerteBarn";

test("All form-input er tilgjengelig", async () => {
    render(<BrukerregistrerteBarn />);

    fireEvent.click(screen.getByText("Legg til barn som ikke er registrert"));

    expect(screen.getByText("Slett informasjon")).toBeVisible();
    expect(screen.getByLabelText("familie.barn.true.barn.fornavn.label")).toBeVisible();
    expect(screen.getByLabelText("familie.barn.true.barn.mellomnavn.label")).toBeVisible();
    expect(screen.getByLabelText("familie.barn.true.barn.etternavn.label")).toBeVisible();
    expect(screen.getByLabelText("familie.barn.true.barn.fnr.label")).toBeVisible();

    fireEvent.click(screen.getByLabelText("familie.barn.true.barn.borsammen.true"));

    expect(screen.getByLabelText("familie.barn.true.barn.borsammen.true")).toBeVisible();

    fireEvent.click(screen.getByLabelText("familie.barn.true.barn.borsammen.false"));

    expect(screen.getByLabelText("system.familie.barn.true.barn.grad.label")).toBeVisible();
});
