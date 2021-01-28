/// <reference types="cypress" />

import {
  getClearMessageBtn,
  getInfoMessage,
  getMainTitle,
  getMessageContainer,
  getMessageSection,
  getSendMessageBtn,
  getWriteClaimBtn
} from "../../support/main/main.po";

const claimMessage = {
  title: 'This is Jack making a claim',
  message: 'This is the message that Jack would like to write about the claim that he want to make',
};

describe('Main Page - initial, uninterrupted page load', () => {
  beforeEach(() => {
    cy.fixture('main/user-info.json').as(
      'userInfo',
    );
  });
  before(() => {
    cy.visit('http://localhost:4200/main')
  })

  it('shows the title, and includes the user information', () => {
    cy.get('@userInfo').then((userInfo) => {
      getMainTitle().invoke('text')
        .should('contain', `Hello ${userInfo.name} ${userInfo.surname}`);
    });
  })

  it('shows the user points', () => {
    cy.get('@userInfo').then((userInfo) => {
      cy.get('#userPoints').invoke('text')
        .should('contain', userInfo.points);
    });
  })

  it('shows the form after clicking on the write a claim button', () => {
    getWriteClaimBtn().click();

    getMessageSection().should('be.visible');
  })

  it('shows the written message after submitting the form', () => {
    cy.get('.form-field').eq(0).type(claimMessage.title);
    cy.get('.form-field').eq(1).type(claimMessage.message);

    getSendMessageBtn().click();

    getMessageContainer().get('h3').invoke('text').should('contain', claimMessage.title);
    getMessageContainer().get('h4').invoke('text').should('contain', claimMessage.message);
  })

  it('shows the Info message on small screens', () => {
    cy.viewport('iphone-6');
    getInfoMessage().should('be.visible');
  })

  it('cleans the message when clicking on the Clear button', () => {
    cy.get('.form-field').eq(0).type(claimMessage.title);
    cy.get('.form-field').eq(1).type(claimMessage.message);

    getClearMessageBtn().click();

    cy.get('.form-field').eq(0).should('have.value', '');
    cy.get('.form-field').eq(1).should('have.value', '');
  })

  it('checks the number of h5 tags on the page', () => {
    cy.get('body').find('h5').should('have.length', 3);
  })

  it('redirects the user after clicking Unsubscribe to unsubscribe page', () => {
    cy.get('a').click();

    cy.url().should('include', 'unsubscribe-from-YouGov');
  })
});
