describe('TODO API Tests', () => {
  let todosBody
  let tokens = ['valid', 'invalid']
  beforeEach(() => {
    // Create TODO
    cy.fixture('todoBody').then((body) => {
      todosBody = body
    })
  });

  it('TODO GET Body', () => {
    cy.request('/api/v1/todo').then(todos => {
      expect(todos.status).to.eq(200);
      assert.deepEqual(todos.body, todosBody, 'Check TODO body');
    });
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