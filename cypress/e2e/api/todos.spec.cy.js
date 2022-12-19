describe('TODO check response body', () => {
  let todosBody
  before(() => {
    // Create TODO
    cy.fixture('todoBody').then((body) => {
      todosBody = body
    })
  });
  it('fetches Todo body - GET', () => {
    cy.request('/api/v1/todo').then(todos => {
      assert.deepEqual(todos.body, todosBody, 'Check TODO body');
    });
  });
  after(() => {
    // Clean up
  });
});

describe('TODO - GET by ID', () => {
  let todosBody
  before(() => {
    // Create TODO
    cy.fixture('todoBody').then((body) => {
      todosBody = body
    })
  });
  [1, 2].forEach(id => {
    it(`TODO GET - by id: ${id}`, () => {
      cy.request(`/api/v1/todo/${id}`).then(todos => {
        // Add if/else statement
        expect(todos.status).to.eq(200);
        assert.deepEqual(todos.body, todosBody.todos[0], 'Check TODO body')
      });
    });
  });
  after(() => {
    // Clean up
  });
});

describe('TODO - GET Auth', () => {
  before(() => {
    // Create TODO
  });
  let tokens = ['valid', 'invalid']
  tokens.forEach(token => {
    it(`Todo - GET with token ${token}`, () => {
      cy.request({
        method: 'GET',
        url: '/api/v1/todo/',
        headers: {
          'auth': {
            'bearer': token
          }
        }
      }).then(todos => {
        // Add if/else statement
        expect(todos.status).to.eq(200);
      });
    });
  });
});
after(() => {
  // Clear data
});