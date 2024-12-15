import 'package:flutter/material.dart';
import 'package:flutter_rps/game/enum.dart';

class GameResult extends StatelessWidget {
  final bool isDone;
  final Result? result;
  final VoidCallback callback;

  const GameResult({
    super.key,
    required this.isDone,
    required this.result,
    required this.callback,
  });

  @override
  Widget build(BuildContext context) {
    if (isDone) {
      return Column(
        children: [
          Center(
            child: Text(result!.displayString),
          ),
          const SizedBox(height: 8),
          ElevatedButton(
            onPressed: () => callback.call(),
            child: const Text("다시 시작"),
          ),
        ],
      );
    }

    return const Center(
      child: Text(
        "가위, 바위, 보 중 하나를 선택 해 주세요.",
        style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
      ),
    );
  }
}
