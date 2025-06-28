import React from "react";
import { mount } from "@cypress/react";
import { MemoryRouter } from "react-router-dom";
import { SubscriptionProvider } from "../../src/lib/SubscriptionContext";
import PricingPage from "../../src/pages/PricingPage";

describe("Subscription Flow", () => {
  const mockStartCheckout = cy.stub().as("startCheckoutStub");

  const MockSubscriptionProvider = ({ children }) => {
    const mockContextValue = {
      currentPlan: "free",
      startCheckout: mockStartCheckout,
      loading: false,
    };
    return (
      <SubscriptionProvider value={mockContextValue}>
        {children}
      </SubscriptionProvider>
    );
  };

  beforeEach(() => {
    mount(
      <MemoryRouter initialEntries={["/pricing"]}>
        <MockSubscriptionProvider>
          <PricingPage />
        </MockSubscriptionProvider>
      </MemoryRouter>
    );
  });

  it("should display pricing plans", () => {
    cy.contains("Choose Your Teaching Plan").should("be.visible");
    cy.contains("Free Forever").should("be.visible");
    cy.contains("Monthly").should("be.visible");
    cy.contains("Annual").should("be.visible");
  });

  it("should call startCheckout when a monthly plan is selected", () => {
    cy.contains("Monthly").click();
    cy.get("@startCheckoutStub").should("have.been.calledOnceWith", "premium", "teacher@example.com");
  });

  it("should call startCheckout when an annual plan is selected", () => {
    cy.contains("Annual").click();
    cy.get("@startCheckoutStub").should("have.been.calledOnceWith", "annual", "teacher@example.com");
  });
});

