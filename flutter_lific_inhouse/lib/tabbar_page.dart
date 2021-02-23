import 'package:flutter/material.dart';
import 'package:flutter_lific_inhouse/utilities/theme/AppTheme.dart';

class TabbarPage extends StatefulWidget {
  @override
  _TabbarPageState createState() => _TabbarPageState();
}

class _TabbarPageState extends State<TabbarPage> {

  int _selectedIndex = 0;

  List<BottomNavigationBarItem> _bottomNavigationBarItems = [
    BottomNavigationBarItem(icon: Icon(Icons.apartment_rounded), activeIcon: Icon(Icons.apartment_sharp), label: '근무 일정'),
    BottomNavigationBarItem(icon: Icon(Icons.home), label: ''),
    BottomNavigationBarItem(icon: Icon(Icons.home), label: '')
  ];

  List<Widget> _screens = [
    Container(color: Colors.blueAccent),
    Container(color: Colors.greenAccent),
    Container(color: Colors.amberAccent),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(
        index: _selectedIndex,
        children: _screens,
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: _bottomNavigationBarItems,
        currentIndex: _selectedIndex,
        onTap: _onBottomItemClick,
        showSelectedLabels: true,
        showUnselectedLabels: true,
        selectedItemColor: AppTheme.color.black,
        type: BottomNavigationBarType.fixed,
      ),
    );
  }

  void _onBottomItemClick(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }
}
