Feature('과제 테스트');

Scenario('메뉴판 필터링', ({ I }) => {
  I.amOnPage('/');

  I.see('메가테라 푸드코트 키오스크');

  I.see('메가반점');
  I.see('메리김밥');
  I.see('혹등고래카레');

  I.click('중식');
  I.see('짜장면');
  I.dontSee('김밥');

  I.click('한식');
  I.see('메리김밥');
  I.see('김밥');
  I.see('제육김밥');

  I.click('전체');

  I.fillField('검색', '혹등');
  I.see('기본카레');
  I.dontSee('메리김밥');

  I.fillField('검색', ' ');

  I.see('메가반점');
  I.see('메리김밥');
  I.see('혹등고래카레');
});

Scenario('음식 주문하기', ({ I }) => {
  I.amOnPage('/');

  I.see('푸드코트 키오스크');

  I.click('짜장면');
  I.click('짬뽕');
  I.click('김밥');
  I.click('기본카레');

  I.see('주문내역4개');
  I.see('28,500원');

  I.click('주문하기');

  I.see('주문내역0개');
});

Scenario('음식 주문 취소하기', ({ I }) => {
  I.amOnPage('/');

  I.see('푸드코트 키오스크');

  I.click('탕수육');
  I.click('제육김밥');

  I.see('주문내역2개');
  I.see('19,500원');

  I.click('취소');

  I.see('주문내역0개');
});
