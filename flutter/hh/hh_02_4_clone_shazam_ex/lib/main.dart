import 'package:flutter/material.dart';

const Color darkBlue = Color.fromARGB(255, 18, 32, 47);

void main() {
  runApp(const RootApp());
}

class RootApp extends StatelessWidget {
  const RootApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "Shazam",
      theme: ThemeData.dark().copyWith(
        scaffoldBackgroundColor: darkBlue,
      ),
      debugShowCheckedModeBanner: false,
      home: const HomePage(),
    );
  }
}

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
        length: 3,
        child: Scaffold(
          body: Stack(
            children: [
              TabBarView(children: [FirstTab(), SecondTab(), ThirdTab()]),
              SafeArea(
                child: Padding(
                  padding: EdgeInsets.symmetric(vertical: 40, horizontal: 16),
                  child: Column(
                    children: [
                      Container(
                          alignment: Alignment.topCenter, child: TabPage())
                    ],
                  ),
                ),
              )
            ],
          ),
        ));
  }
}

class TabPage extends StatefulWidget {
  const TabPage({super.key});

  @override
  State<TabPage> createState() => _TabPageState();
}

class _TabPageState extends State<TabPage> {
  @override
  Widget build(BuildContext context) {
    return TabPageSelector(
      color: DefaultTabController.of(context).index == 1
          ? Colors.blue[300]
          : Colors.grey[400],
      selectedColor: DefaultTabController.of(context).index == 1
          ? Colors.white
          : Colors.blue,
      indicatorSize: 8,
    );
  }
}

class FirstTab extends StatelessWidget {
  const FirstTab({super.key});

  static const songs = [
    {
      'imageUrl': 'https://i.ibb.co/MRSqtP8/autumnnight.jpg',
      'title': '가을밤에 든 생각',
      'artist': '잔나비',
    },
    {
      'imageUrl': 'https://i.ibb.co/MRSqtP8/autumnnight.jpg',
      'title': '가을밤에 든 생각',
      'artist': '잔나비',
    },
    {
      'imageUrl': 'https://i.ibb.co/MRSqtP8/autumnnight.jpg',
      'title': '가을밤에 든 생각',
      'artist': '잔나비',
    },
    {
      'imageUrl': 'https://i.ibb.co/MRSqtP8/autumnnight.jpg',
      'title': '가을밤에 든 생각',
      'artist': '잔나비',
    },
    {
      'imageUrl': 'https://i.ibb.co/MRSqtP8/autumnnight.jpg',
      'title': '가을밤에 든 생각',
      'artist': '잔나비',
    },
    {
      'imageUrl': 'https://i.ibb.co/MRSqtP8/autumnnight.jpg',
      'title': '가을밤에 든 생각',
      'artist': '잔나비',
    },
  ];

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Icon(Icons.settings),
                Text(
                  "라이브러리",
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                ),
                Icon(null),
              ],
            ),
            Padding(
              padding: EdgeInsets.symmetric(vertical: 8),
              child: Row(
                children: [
                  ImageIcon(
                    NetworkImage("https://i.ibb.co/hxNbZ8p/shazam.png"),
                    size: 18,
                  ),
                  SizedBox(width: 12),
                  Text(
                    "Shazam",
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
                  )
                ],
              ),
            ),
            Divider(),
            Padding(
              padding: EdgeInsets.symmetric(vertical: 8),
              child: Row(
                children: [
                  Icon(
                    Icons.person_rounded,
                    size: 20,
                  ),
                  SizedBox(width: 12),
                  Text("아티스트",
                      style:
                          TextStyle(fontSize: 18, fontWeight: FontWeight.w600))
                ],
              ),
            ),
            Divider(),
            Padding(
              padding: EdgeInsets.symmetric(vertical: 8),
              child: Row(
                children: [
                  Icon(
                    Icons.music_note,
                    size: 20,
                  ),
                  SizedBox(width: 12),
                  Text("회원님을 위한 재생 목록",
                      style:
                          TextStyle(fontSize: 18, fontWeight: FontWeight.w600))
                ],
              ),
            ),
            Divider(),
            SizedBox(height: 16),
            Text(
              "최근 Shazam",
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.w700,
              ),
            ),
            SizedBox(height: 10),
            Expanded(
              child: GridView.builder(
                  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: 2, childAspectRatio: 3 / 5),
                  itemCount: songs.length,
                  itemBuilder: (context, index) {
                    var song = songs[index];

                    return Container(
                      margin: EdgeInsets.all(4),
                      child: Column(
                        children: [
                          ClipRRect(
                            borderRadius: BorderRadius.only(
                              topLeft: Radius.circular(8),
                              topRight: Radius.circular(8),
                            ),
                            child: Image.network(
                              song["imageUrl"]!,
                              fit: BoxFit.cover,
                              height: MediaQuery.of(context).size.width *
                                  0.5 *
                                  5 /
                                  3 *
                                  0.55,
                            ),
                          ),
                          Expanded(
                            child: Container(
                              padding: const EdgeInsets.all(8),
                              width: double.infinity,
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    song["title"]!,
                                    style: TextStyle(
                                      fontSize: 18,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  Text(
                                    song["artist"]!,
                                    style: TextStyle(
                                      fontSize: 14,
                                      color: Colors.grey[600],
                                    ),
                                  ),
                                  Spacer(),
                                  Image.network(
                                    "https://i.ibb.co/KG9m5QS/applemusic.png",
                                    width: 60,
                                  ),
                                  SizedBox(height: 5),
                                ],
                              ),
                            ),
                          )
                        ],
                      ),
                    );
                  }),
            )
          ],
        ),
      ),
    );
  }
}

// 두번째 페이지
class SecondTab extends StatelessWidget {
  const SecondTab({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [Colors.blue[300]!, Colors.blue[900]!],
        ),
      ),
      child: SafeArea(
        child: Column(
          children: [
            Padding(
              padding:
                  const EdgeInsets.symmetric(vertical: 8.0, horizontal: 16.0),
              child: Row(
                children: [
                  GestureDetector(
                    onTap: () {
                      DefaultTabController.of(context).animateTo(0);
                    },
                    child: Column(
                      children: [
                        Icon(
                          Icons.person,
                          color: Colors.white,
                        ),
                        Text(
                          "라이브러리",
                          style: TextStyle(color: Colors.white),
                        )
                      ],
                    ),
                  ),
                  Spacer(),
                  GestureDetector(
                    onTap: () {
                      DefaultTabController.of(context).animateTo(2);
                    },
                    child: Column(
                      children: [
                        Icon(
                          Icons.show_chart,
                          color: Colors.white,
                        ),
                        Text(
                          "차트",
                          style: TextStyle(color: Colors.white),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            SizedBox(height: MediaQuery.of(context).size.height * 0.1),
            Text(
              "Shazam하려면 탭하세요",
              style: TextStyle(
                color: Colors.white,
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: MediaQuery.of(context).size.height * 0.06),
            Container(
              alignment: Alignment.center,
              width: 200,
              height: 200,
              decoration: BoxDecoration(
                color: Colors.blue[300],
                shape: BoxShape.circle,
              ),
              child: Image.network(
                "https://i.ibb.co/hxNbZ8p/shazam.png",
                color: Colors.white,
                width: 130,
                height: 130,
              ),
            ),
            SizedBox(height: MediaQuery.of(context).size.height * 0.12),
            Container(
              width: 50,
              height: 50,
              alignment: Alignment.center,
              decoration: BoxDecoration(
                color: Colors.blue[400],
                shape: BoxShape.circle,
              ),
              child: Icon(
                Icons.search,
                color: Colors.white,
                size: 30,
              ),
            )
          ],
        ),
      ),
    );
  }
}

class ThirdTab extends StatelessWidget {
  const ThirdTab({super.key});

  @override
  Widget build(BuildContext context) {
    const chartData = {
      'korea': [
        {
          'imageUrl': 'https://i.ibb.co/xf2HpfG/dynamite.jpg',
          'name': 'Dynamite',
          'artist': 'BTS',
        },
        {
          'imageUrl': 'https://i.ibb.co/xf2HpfG/dynamite.jpg',
          'name': 'Dynamite',
          'artist': 'BTS',
        },
        {
          'imageUrl': 'https://i.ibb.co/xf2HpfG/dynamite.jpg',
          'name': 'Dynamite',
          'artist': 'BTS',
        },
      ],
      'global': [
        {
          'imageUrl': 'https://i.ibb.co/xf2HpfG/dynamite.jpg',
          'name': 'Dynamite',
          'artist': 'BTS',
        },
        {
          'imageUrl': 'https://i.ibb.co/xf2HpfG/dynamite.jpg',
          'name': 'Dynamite',
          'artist': 'BTS',
        },
        {
          'imageUrl': 'https://i.ibb.co/xf2HpfG/dynamite.jpg',
          'name': 'Dynamite',
          'artist': 'BTS',
        },
      ],
      'newyork': [
        {
          'imageUrl': 'https://i.ibb.co/xf2HpfG/dynamite.jpg',
          'name': 'Dynamite',
          'artist': 'BTS',
        },
        {
          'imageUrl': 'https://i.ibb.co/xf2HpfG/dynamite.jpg',
          'name': 'Dynamite',
          'artist': 'BTS',
        },
        {
          'imageUrl': 'https://i.ibb.co/xf2HpfG/dynamite.jpg',
          'name': 'Dynamite',
          'artist': 'BTS',
        },
      ],
    };

    return SafeArea(
      child: Column(
        children: [
          Text(
            '차트',
            style: TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 18,
            ),
          ),
          SizedBox(height: 16),
          Expanded(
            child: ListView(
              children: [
                Stack(
                  alignment: Alignment.center,
                  children: [
                    Container(
                      width: double.infinity,
                      height: 180,
                      color: Colors.purple[900],
                    ),
                    Column(
                      children: [
                        SizedBox(
                          width: MediaQuery.of(context).size.width * 0.8,
                          child: ElevatedButton(
                            onPressed: () {},
                            style: ButtonStyle(
                              backgroundColor:
                                  WidgetStateProperty.all(Colors.white),
                            ),
                            child: Text(
                              "국가 및 도시별 차트",
                              style: TextStyle(
                                color: Colors.purple[900],
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Text(
                            "전 세계",
                            style: TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
                Container(
                  width: double.infinity,
                  height: 8,
                  color: Colors.grey[400],
                ),
                Column(
                  children: [
                    Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Row(
                        children: [
                          Text(
                            '대한민국 차트',
                            style: TextStyle(fontSize: 16),
                          ),
                          Spacer(),
                          Text(
                            '모두 보기',
                            style: TextStyle(color: Colors.blue),
                          ),
                        ],
                      ),
                    ),
                    Row(
                      children: [
                        ...chartData['korea']!.map((song) {
                          // 스프레드 연산자: 리스트 등의 이터러블 안에 있는 요소를 분해한다.
                          String imageUrl = song['imageUrl']!;
                          String name = song['name']!;
                          String artist = song['artist']!;

                          return Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Image.network(
                                  imageUrl,
                                  width:
                                      MediaQuery.of(context).size.width * 0.29,
                                ),
                                Text(
                                  name,
                                  style: TextStyle(fontWeight: FontWeight.bold),
                                ),
                                Text(artist),
                              ],
                            ),
                          );
                        }),
                      ],
                    ),
                  ],
                ),
                Container(
                  width: double.infinity,
                  height: 8,
                  color: Colors.grey[400],
                ),
                Column(
                  children: [
                    Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Row(
                        children: [
                          Text(
                            '글로벌 차트',
                            style: TextStyle(fontSize: 16),
                          ),
                          Spacer(),
                          Text(
                            '모두 보기',
                            style: TextStyle(color: Colors.blue),
                          ),
                        ],
                      ),
                    ),
                    Row(
                      children: [
                        ...chartData['global']!.map((song) {
                          String imageUrl = song['imageUrl']!;
                          String name = song['name']!;
                          String artist = song['artist']!;

                          return Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Image.network(
                                  imageUrl,
                                  width:
                                      MediaQuery.of(context).size.width * 0.29,
                                ),
                                Text(
                                  name,
                                  style: TextStyle(fontWeight: FontWeight.bold),
                                ),
                                Text(artist),
                              ],
                            ),
                          );
                        }),
                      ],
                    ),
                  ],
                ),
                Container(
                  width: double.infinity,
                  height: 8,
                  color: Colors.grey[400],
                ),
                Column(
                  children: [
                    Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Row(
                        children: [
                          Text(
                            '뉴욕 차트',
                            style: TextStyle(fontSize: 16),
                          ),
                          Spacer(),
                          Text(
                            '모두 보기',
                            style: TextStyle(color: Colors.blue),
                          ),
                        ],
                      ),
                    ),
                    Row(
                      children: [
                        ...chartData['newyork']!.map((song) {
                          String imageUrl = song['imageUrl']!;
                          String name = song['name']!;
                          String artist = song['artist']!;

                          return Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Image.network(
                                  imageUrl,
                                  width:
                                      MediaQuery.of(context).size.width * 0.29,
                                ),
                                Text(
                                  name,
                                  style: TextStyle(fontWeight: FontWeight.bold),
                                ),
                                Text(artist),
                              ],
                            ),
                          );
                        }),
                      ],
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
