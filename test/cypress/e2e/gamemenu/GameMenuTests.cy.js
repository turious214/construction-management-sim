// describe('Hello world', () => {
//     beforeEach(() => {
//         cy.eyesOpen({
//             appName: 'Hello World!',
//             browser: { width: 800, height: 600 },
//         });
//     });
//
//     afterEach(() => {
//         cy.eyesClose();
//     });
//
//     it('My first JavaScript test!', () => {
//         cy.visit('https://applitools.com/helloworld');
//         cy.eyesCheckWindow('Main Page');
//         cy.get('button').click();
//         cy.eyesCheckWindow('Click!');
//     });
// });

describe('Capture game menu', () => {

    it('My first JavaScript test!', () => {
        // change screen dimensions to force difference
        // cy.viewport(1080, 720);
        cy.visit('http://localhost:5173');

        cy.wait(1000);
        // cy.screenshot("game menu");

        cy.compareSnapshot('game-menu', 0.1)





    });
});