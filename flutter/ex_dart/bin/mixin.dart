mixin class Scanner {
  void scanning() => print("scanning");
}

mixin class Printer {
  void printing() => print("printing");
}

mixin Fax {
  void faxing() => print("faxing");
}

class PP {}

class Machine extends PP with Scanner, Printer, Fax {}

void main() {
  final printer = Printer();
  printer.printing();

  // mixin만 사용하면 인스턴스를 사용할 수 없다.
  // final fax = Fax(); X

  final machine = Machine();
  machine.scanning();
  machine.printing();
}

