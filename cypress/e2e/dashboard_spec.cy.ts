describe('dashboard page', () => {
  beforeEach(() => {
    cy.visit("/dashboard");
  });

  it("greets with page", () => {
    cy.contains("h2", "Top Heroes");
  });

  it("Hero not found", () => {
    cy.get("[id='search-box']").type("invalidHero{enter}");
    cy.contains(' HeroService: no heroes matching "invalidHero" ');
  });

  it("Hero found", () => {
    cy.get("[id='search-box']").type("Bombasto{enter}");
    cy.contains("app-messages", ' HeroService: found heroes matching "Bombasto" ');
    cy.contains("[class='search-result'] li a", 'Bombasto').click();
    cy.url().should("eq", "http://localhost:4200/detail/13");
    cy.contains("[type='button']", "go back").click();
  });

  it("edit Hero", () => {
     cy.contains("[class='heroes-menu']  a", 'Bombasto').click();
     cy.url().should("eq", "http://localhost:4200/detail/13");
     cy.get("[id='hero-name']").type(' Surname');
     cy.contains("[type='button']", "save").click();
     cy.url().should("eq", "http://localhost:4200/dashboard");
     cy.contains("[class='heroes-menu'] a ", "Bombasto Surname");
   });

  it("clear messages ", () => {
    cy.contains("h2", "Messages");
    cy.get('app-messages').should('have.length', 1).find('.clear').click();
    cy.get('app-messages').should('not.be.visible')
  });
 
})