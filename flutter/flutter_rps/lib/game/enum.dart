const assetPath = 'assets/images';

enum InputType {
  rock,
  paper,
  scissors;

  String get path => '$assetPath/$name.png';
}

enum Result {
  playerWin('플레이어 승리'),
  cpuWin('컴퓨터 승리'),
  draw('무승부');

  const Result(this.displayString);

  final String displayString;
}
