class Document {
  String content;

  int readCount = 0;

  int updateCount = 0;

  String get statistic {
    return "readCount : $readCount / updateCount : $updateCount";
  }

  Document(this.content);
}
