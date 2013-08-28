describe('GutHub App', function() {
  it('should show a list of products', function() {
    browser().navigateTo('/#/');
    // Our Default GutHub products list has two products
    expect(repeater('.products li').count()).toEqual(2);
  });
});
