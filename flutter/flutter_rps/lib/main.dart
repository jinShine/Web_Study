import 'package:flutter/material.dart';
import 'package:flutter_rps/game/game_body.dart';

void main() {
  runApp(const RPSApp());
}

class RPSApp extends StatelessWidget {
  const RPSApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Rock Paper Scissors',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
        useMaterial3: true,
      ),
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Rock Paper Scissors'),
        ),
        body: const GameBody(),
      ),
    );
  }
}
