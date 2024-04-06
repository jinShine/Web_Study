Feature('과제 테스트');

Scenario('메뉴판 필터링', ({ I }) => {
  I.amOnPage('/');

  I.see('오늘의 메뉴');

  I.see('메가반점');
  I.see('데브부엌');
  I.see('혹등고래카레');

  I.click('중식');
  I.see('짜장면');
  I.dontSee('제육덮밥');

  I.click('한식');
  I.see('메리김밥');
  I.see('데브부엌');
  I.see('메가김치찌개');

  I.fillField('검색', '메리');
  I.see('메리김밥');
  I.dontSee('데브부엌');
  I.dontSee('메가김치찌개');

  I.fillField('검색', ' ');
  I.click('일식');
  I.see('로드스시');
  I.see('돈까스카레');
  I.dontSee('메가반점');

  I.fillField('검색', '로드스시');
  I.dontSee('돈까스카레');

  I.fillField('검색', '메가');
  I.click('전체');
  I.see('메가반점');
  I.see('메가김치찌개');
  I.dontSee('데브부엌');
});
