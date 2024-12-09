import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
        home: Scaffold(
      body: SafeArea(child: Body()),
    ));
  }
}

class Body extends StatelessWidget {
  const Body({super.key});

  @override
  Widget build(BuildContext context) {
    return const Column(
      children: [
        TextCheckBox(),
      ],
    );
  }
}

class TextCheckBox extends StatefulWidget {
  const TextCheckBox({super.key});

  @override
  State<TextCheckBox> createState() => _TextCheckBoxState();
}

class _TextCheckBoxState extends State<TextCheckBox> {
  late List<bool> values = [false, false, false];

  @override
  void initState() {
    super.initState();
  }

  void onChanged(int index, bool value) {
    setState(() {
      values[index] = value;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Checkbox(value: values[0], onChanged: (value) => onChanged(0, value!)),
        Checkbox(value: values[1], onChanged: (value) => onChanged(1, value!)),
        Checkbox(value: values[2], onChanged: (value) => onChanged(2, value!)),
      ],
    );
  }
}
