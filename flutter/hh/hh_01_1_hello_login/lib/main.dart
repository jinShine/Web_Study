import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        appBar: AppBar(
            centerTitle: true,
            title: const Text('Hello, World!',
                style: TextStyle(
                  color: Colors.black,
                  fontSize: 16,
                  fontWeight: FontWeight.w900,
                ))),
        body: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 20),
            child: Column(
              children: [
                Padding(
                  padding: const EdgeInsets.all(32.0),
                  child: Image.network(
                    "https://i.ibb.co/nngK6j3/startup.png",
                    width: 80,
                  ),
                ),
                const TextField(
                  decoration: InputDecoration(
                    labelText: "이메일",
                  ),
                ),
                const TextField(
                  decoration: InputDecoration(labelText: "비밀번호"),
                  obscureText: true,
                ),
                Container(
                  margin: const EdgeInsets.only(top: 24),
                  width: double.infinity,
                  child: ElevatedButton(
                      onPressed: () => {print("로그인 버튼 클릭")},
                      child: Text("로그인")),
                ),
              ],
            ),
          ),
        ),
        bottomNavigationBar: BottomNavigationBar(items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
          BottomNavigationBarItem(
              icon: Icon(Icons.settings), label: 'Settings'),
        ]),
        floatingActionButton:
            FloatingActionButton(onPressed: () => {debugPrint("onPress")}),
      ),
    );
  }
}
