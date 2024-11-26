import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:hh_02_3_clone_carrot/feed.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    final List<String> images = [
      "https://cdn2.thecatapi.com/images/6bt.jpg",
      "https://cdn2.thecatapi.com/images/ahr.jpg",
      "https://cdn2.thecatapi.com/images/arj.jpg",
      "https://cdn2.thecatapi.com/images/brt.jpg",
      "https://cdn2.thecatapi.com/images/cml.jpg",
      "https://cdn2.thecatapi.com/images/e35.jpg",
      "https://cdn2.thecatapi.com/images/MTk4MTAxOQ.jpg",
      "https://cdn2.thecatapi.com/images/MjA0ODM5MQ.jpg",
      "https://cdn2.thecatapi.com/images/AuY1uMdmi.jpg",
      "https://cdn2.thecatapi.com/images/AKUofzZW_.png",
    ];

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0.5,
        leading: Row(
          children: [
            SizedBox(width: 16),
            Text(
              '중앙동',
              style: TextStyle(
                color: Colors.black,
                fontWeight: FontWeight.bold,
                fontSize: 20,
              ),
            ),
            Icon(
              Icons.keyboard_arrow_down_rounded,
              color: Colors.black,
            ),
          ],
        ),
        leadingWidth: 100,
        actions: [
          IconButton(
              onPressed: () {},
              icon: Icon(
                CupertinoIcons.search,
                color: Colors.black,
              )),
          IconButton(
              onPressed: () {},
              icon: Icon(
                Icons.menu_rounded,
                color: Colors.black,
              )),
          IconButton(
              onPressed: () {},
              icon: Icon(
                CupertinoIcons.bell,
                color: Colors.black,
              )),
        ],
      ),
      body: Padding(
        padding: EdgeInsets.symmetric(horizontal: 10),
        child: ListView.separated(
          itemBuilder: (context, index) => Padding(
            padding: const EdgeInsets.symmetric(vertical: 12),
            child: Feed(
              imageUrl: images[index],
            ),
          ),
          itemCount: images.length,
          separatorBuilder: (context, index) => Divider(),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => {},
        backgroundColor: Color(0xFFFF7E36),
        elevation: 1,
        shape: CircleBorder(),
        child: Icon(
          Icons.add_rounded,
          size: 36,
          color: Colors.white,
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        fixedColor: Colors.black,
        unselectedItemColor: Colors.black,
        showUnselectedLabels: true,
        selectedFontSize: 12,
        unselectedFontSize: 12,
        iconSize: 28,
        type: BottomNavigationBarType.fixed,
        items: [
          BottomNavigationBarItem(
            icon: Icon(Icons.home_filled),
            label: '홈',
            backgroundColor: Colors.white,
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.my_library_books_outlined),
            label: '동네생활',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.fmd_good_outlined),
            label: '내 근처',
          ),
          BottomNavigationBarItem(
            icon: Icon(CupertinoIcons.chat_bubble_2),
            label: '채팅',
          ),
          BottomNavigationBarItem(
            icon: Icon(
              Icons.person_outline,
            ),
            label: '나의 당근',
          ),
        ],
        currentIndex: 0,
      ),
    );
  }
}
