Feature('Home');

Scenario('Visit the home page', ({ I }) => {
  I.amOnPage('/');

  I.see('Hello, wholeman!');

  I.seeElement('//img[@alt="Test Image"]');
});

Scenario('Counter test', ({ I }) => {
  I.amOnPage('/');

  I.see('Count: 0');

  I.click('+1');

  I.see('Count: 1');

  I.click('+2');

  I.see('Count: 3');

  I.click('+4');

  I.see('Count: 7');

  I.click('+5');

  I.see('Count: 12');

  I.click('+3');

  I.see('Count: 15');
});
