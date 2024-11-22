import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return const MaterialApp(title: 'Flutter Demo', home: HomePage());
  }
}

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    // 음식 사진 데이터
    List<Map<String, dynamic>> dataList = [
      {
        "category": "탑건: 매버릭",
        "imgUrl": "https://i.ibb.co/sR32PN3/topgun.jpg",
      },
      {
        "category": "마녀2",
        "imgUrl": "https://i.ibb.co/CKMrv91/The-Witch.jpg",
      },
      {
        "category": "범죄도시2",
        "imgUrl": "https://i.ibb.co/2czdVdm/The-Outlaws.jpg",
      },
      {
        "category": "헤어질 결심",
        "imgUrl": "https://i.ibb.co/gM394CV/Decision-to-Leave.jpg",
      },
      {
        "category": "브로커",
        "imgUrl": "https://i.ibb.co/MSy1XNB/broker.jpg",
      },
      {
        "category": "문폴",
        "imgUrl": "https://i.ibb.co/4JYHHtc/Moonfall.jpg",
      },
    ];

    // 화면에 보이는 영역
    return Scaffold(
      appBar: AppBar(
        toolbarHeight: 130,
        backgroundColor: Colors.white,
        surfaceTintColor: Colors.white,
        title: Column(
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  "Movie Reviews",
                  style: TextStyle(fontSize: 24, fontWeight: FontWeight.w700),
                ),
                Icon(Icons.person_outline)
              ],
            ),
            Container(
              margin: EdgeInsets.only(top: 14),
              child: TextField(
                decoration: InputDecoration(
                    hintText: "영화 제목을 검색해주세요.",
                    enabledBorder: OutlineInputBorder(
                      borderSide: BorderSide(
                        strokeAlign: 1,
                        width: 1,
                        color: Colors.black,
                      ),
                    ),
                    suffixIcon: Icon(Icons.search)),
              ),
            )
          ],
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16),
        child: Expanded(
          child: ListView.builder(
              itemCount: dataList.length,
              itemBuilder: (context, index) => Container(
                    margin: EdgeInsets.only(bottom: 8),
                    child: Stack(
                      alignment: Alignment.center,
                      children: [
                        Image.network(
                          dataList[index]["imgUrl"],
                          width: double.infinity,
                          height: 200,
                          fit: BoxFit.cover,
                        ),
                        Container(
                          alignment: Alignment.center,
                          color: Colors.black.withOpacity(0.5),
                          height: 200,
                          child: Text(
                            dataList[index]["category"],
                            style: TextStyle(color: Colors.white, fontSize: 30),
                          ),
                        )
                      ],
                    ),
                  )),
        ),
      ),
    );
  }
}
