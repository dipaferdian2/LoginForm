

describe('Login Form Test Suite', () => {
      beforeEach(() => {
        cy.visit('http://127.0.0.1:8081/web/index.html');
      });
    
      it('Successful login with valid email and password', () => {
        cy.get('input[type="email"]').type('valid_email@example.com');
        cy.get('input[type="password"]').type('valid_password');
        cy.get('input[type="checkbox"]').check();
        cy.get('button[type="submit"]').click();
        cy.contains('Welcome Back!');
      });
    
      it('Unsuccessful login due to invalid email', () => {
        cy.get('input[type="email"]').type('invalid_email@example.com');
        cy.get('input[type="password"]').type('valid_password');
        cy.get('button[type="submit"]').click();
        cy.contains('Invalid email or password.');
      });
    
      it('Unsuccessful login due to incorrect password', () => {
        cy.get('input[type="email"]').type('valid_email@example.com');
        cy.get('input[type="password"]').type('incorrect_password');
        cy.get('button[type="submit"]').click();
        cy.contains('Invalid email or password.');
      });
    
      it('Unsuccessful login due to empty email or password field', () => {
        cy.get('button[type="submit"]').click();
        cy.contains('Email and password are required.');
      });
    
      it('Verify if the "Remember Me" feature functions correctly', () => {
        cy.get('input[type="email"]').type('valid_email@example.com');
        cy.get('input[type="password"]').type('valid_password');
        cy.get('input[type="checkbox"]').check();
        cy.get('button[type="submit"]').click();
        cy.contains('Welcome Back!');
        cy.get('#logout').click();
        cy.url().should('include', 'index.html');
        cy.window().then((window) => {
            expect(window.localStorage.getItem("remember-me")).to.eq("true");
          });
      });
    
      it('Verify if the "Forgot Password" feature redirects to the correct page and functions as intended', () => {
        cy.get('.forgot-password').click();
        cy.url().should('include', '/forgot-password');
        cy.get('input[type="email"]').type('valid_email@example.com');
        cy.get('#send').click();
        cy.get('#send-email').contains('An email with password reset instructions has been sent to your email.');
      });
    });