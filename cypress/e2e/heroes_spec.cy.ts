describe('heroes page', () => {
  beforeEach(() => {
    cy.visit("/heroes");
  });

  it("greets with page", () => {
    cy.contains("h2", "My Heroes");
  });

  it("Heroe's detail", () => {
    cy.get("[class='heroes'] li:first a ",).click();
    cy.url().should("eq", "http://localhost:4200/detail/12");
    cy.contains("[type='button']", "go back").click();
  });

  it("add Hero", () => {
   cy.get("[id='new-hero']").type("Batman");  
   cy.get("[class='add-button']").click();
   cy.contains("li", "Batman");
  });

  it("edit Hero", () => {
   cy.contains("[class='heroes'] li:first a ", "Dr. Nice").click();
   cy.url().should("eq", "http://localhost:4200/detail/12");
   cy.get("[id='hero-name']").type(' Surname');
   cy.contains("[type='button']", "save").click();
   cy.url().should("eq", "http://localhost:4200/heroes");
   cy.contains("[class='heroes'] li:first a ", "Dr. Nice Surname")
  });

  it("delete Hero", () => {
   cy.get("[class='heroes'] li:first button").click().should('not.exist');
  });

  it("show message", () => {
    cy.get("[id='new-hero']").type("Batman");  
    cy.get("[class='add-button']").click();
    cy.contains("app-messages", 'HeroService: added hero w/ id=');
  });
  
  it("clear messages ", () => {
    cy.contains("h2", "Messages");
    cy.get('app-messages').should('have.length', 1).find('.clear').click();
    cy.get('app-messages').should('not.be.visible')
  });

});





  
 