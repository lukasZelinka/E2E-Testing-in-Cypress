describe('dashboard page', () => {
  beforeEach(() => {
    cy.visit("/dashboard");
  });

 it("greets with page", () => {
    cy.contains("h2", "Top Heroes");
  });

  it("invalid Hero with no match", () => {
    cy.get("[id='search-box']").type("invalidHero{enter}");
    cy.contains(' HeroService: no heroes matching "invalidHero" ');
  });

   it("valid hero search", () => {
    cy.get("[id='search-box']").type("Bombasto{enter}");
    cy.contains("[class='search-result'] li a", 'Bombasto').click();
    cy.url().should("eq", "http://localhost:4200/detail/13");
  });

  it("showing report messages", () => {
    cy.get("[id='search-box']").type("Bombasto{enter}");
    cy.contains("app-messages", ' HeroService: found heroes matching "Bombasto" ');
  });


   it("disappearance of report messages ", () => {
    cy.contains("h2", "Messages");
    cy.get('app-messages').should('have.length', 1).find('.clear').click();
    cy.get('app-messages').should('not.be.visible')
    });

 it("visit Heroe's detail ", () => {
    cy.contains("Bombasto").should("have.attr", "href", "/detail/13");
    cy.contains("[class='heroes-menu']  a", 'Bombasto').click();
    cy.contains("[type='button']", "go back").click();
  });


  it("changing the name of the Hero", () => {
    cy.contains("[class='heroes-menu']  a", 'Bombasto').click();
    cy.url().should("eq", "http://localhost:4200/detail/13");
    cy.get("[id='hero-name']").type(' Surname');
    cy.contains("[type='button']", "save").click();
    cy.url().should("eq", "http://localhost:4200/dashboard");
    cy.contains("[class='heroes-menu'] a ", "Bombasto Surname");
  });
  
})