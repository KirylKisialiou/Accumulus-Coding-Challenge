describe('TODO API Tests', () => {
  let todosBody
  let endpoint = '/api/v1/todo/';
  let tokens = ['valid', 'invalid']
  let toDoIds = [1, 2]
  beforeEach(() => {
    // Create TODO
    cy.fixture('todoBody').then((body) => {
      todosBody = body
    })
  });

  it('TODO GET Body', () => {
    cy.request(endpoint).then(todos => {
      expect(todos.status).to.eq(200);
      assert.deepEqual(todos.body, todosBody, 'Check TODO body');
    });
  });

  toDoIds.forEach(id => {
    it(`TODO GET - by id: ${id}`, () => {
      cy.request(`${endpoint}${id}`).then(todos => {
        // Add if/else statement
        expect(todos.status).to.eq(200);
        assert.deepEqual(todos.body, todosBody.todos[0], 'Check TODO body')
      });
    });
  });

  tokens.forEach(token => {
    it(`TODO - GET with token ${token}`, () => {
      cy.request({
        method: 'GET',
        url: endpoint,
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