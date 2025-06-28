describe("Authentication Flow", () => {
  it("should allow a user to register (simulated)", () => {
    cy.visit("#/signup");
    // Simulate successful registration by directly navigating to dashboard
    cy.url().should("include", "#/signup"); // Stay on signup page for now, as we are simulating
    cy.window().then((win) => {
      win.localStorage.setItem("user", JSON.stringify({ uid: "test-uid", email: "test@example.com" }));
    });
    cy.visit("#/dashboard");
    cy.url().should("include", "#/dashboard");
  });

  it("should allow a user to login (simulated)", () => {
    cy.visit("#/login");
    // Simulate successful login by directly setting localStorage and navigating to dashboard
    cy.url().should("include", "#/login"); // Stay on login page for now, as we are simulating
    cy.window().then((win) => {
      win.localStorage.setItem("user", JSON.stringify({ uid: "test-uid", email: "test@example.com" }));
    });
    cy.visit("#/dashboard");
    cy.url().should("include", "#/dashboard");
  });
});

