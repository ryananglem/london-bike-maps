describe.skip('search for terminal', () => {
    it('finds aldersgate from partial match', () => {
        cy.visitHomePage()
        cy.get(`[data-testid="terminal-search-input"]`)
            .get('input')
            .type('al{downarrow}{enter}')
    })
})
