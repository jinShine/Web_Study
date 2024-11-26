import 'package:flutter/material.dart';

void main() {
  print('main');
  runApp(const MyApp());
}

// StatelessWidget
// class MyApp extends StatelessWidget {
//   const MyApp({super.key});

//   @override
//   Widget build(BuildContext context) {
//     print('build');
//     return const MaterialApp(
//       home: Scaffold(
//         body: Center(
//           child: Text('Hello, World!'),
//         ),
//       ),
//     );
//   }
// }

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<StatefulWidget> createState() {
    return _MyAppState();
  }
}

class _MyAppState extends State<MyApp> {
  int _number = 0;
  int _number2 = 100;

  @override
  Widget build(BuildContext context) {
    debugPrint('build');

    return MaterialApp(
      home: Scaffold(
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text('Hello, World! StatefulWidget'),
              Text('$_number'),
              Text('$_number2'),
            ],
          ),
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: () {
            debugPrint('onPressed');

            setState(() {
              _number += 1;
              _number2 += 1;
            });
          },
          child: const Icon(Icons.add),
        ),
      ),
    );
  }
}
