import 'document.dart';

void main() {
  final doc = Document("hello dart");

  String content = doc.content;
  doc.readCount += 1;
  print(doc.statistic);

  doc.content = "2";
  doc.updateCount += 1;
  print(doc.statistic);
}
