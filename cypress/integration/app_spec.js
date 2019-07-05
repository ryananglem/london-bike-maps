describe.skip('app starts', () => {
    it('renders map', () => {
        cy.visitHomePage()
        cy.get(`[data-testid="about-page"]`)
    })
})
