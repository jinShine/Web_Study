import 'package:flutter/material.dart';
import 'package:hh_03_1_memo/memo_service.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(MultiProvider(
      providers: [ChangeNotifierProvider(create: (context) => MemoService())],
      child: const MyApp()));
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: HomePage(),
    );
  }
}

// Home Page
class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Consumer<MemoService>(
      builder: (context, memoService, child) {
        List<Memo> memoList = memoService.memoList;

        return Scaffold(
            appBar: AppBar(title: const Text("My Memo")),
            body: memoList.isEmpty
                ? const Center(
                    child: Text("메모를 작성해주세요"),
                  )
                : ListView.builder(
                    itemCount: memoList.length,
                    itemBuilder: (context, index) {
                      Memo memo = memoList[index];

                      return ListTile(
                        leading: IconButton(
                          onPressed: () {
                            // 삭제 버튼 클릭시
                          },
                          icon: const Icon(Icons.pin),
                        ),
                        title: Text(
                          memo.content,
                          maxLines: 3,
                          overflow: TextOverflow.ellipsis,
                        ),
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => DetailPage(
                                index: index,
                                memoList: memoList,
                              ),
                            ),
                          );
                        },
                      );
                    }),
            floatingActionButton: FloatingActionButton(
              onPressed: () {
                Memo memo = Memo(content: "");
                setState(() {
                  memoList.add(memo);
                });

                Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => DetailPage(
                          index: memoList.indexOf(memo), memoList: memoList)),
                );
              },
              child: const Icon(Icons.add),
            ));
      },
    );
  }
}

// Memo Page
class DetailPage extends StatelessWidget {
  final List<Memo> memoList;
  final int index;

  DetailPage({super.key, required this.memoList, required this.index});

  TextEditingController contentController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    contentController.text = memoList[index].content;

    return Scaffold(
      appBar: AppBar(
        actions: [
          IconButton(
            onPressed: () {
              // 삭제 버튼 클릭시
              showDialog(
                  context: context,
                  builder: (context) {
                    return AlertDialog(
                      title: const Text("정말로 삭제하시겠습니까?"),
                      actions: [
                        TextButton(
                            onPressed: () {
                              Navigator.pop(context);
                            },
                            child: const Text("삭제")),
                        TextButton(
                            onPressed: () {
                              memoList.removeAt(index);
                              Navigator.pop(context); // 팝업 닫기
                              Navigator.pop(context); // HomePage로 이동
                            },
                            child: const Text("취소")),
                      ],
                    );
                  });
            },
            icon: const Icon(Icons.delete),
          )
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: TextField(
          controller: contentController,
          decoration: const InputDecoration(
            hintText: "메모를 입력하세요",
            border: InputBorder.none,
          ),
          autofocus: true,
          maxLines: null,
          expands: true,
          keyboardType: TextInputType.multiline,
          onChanged: (value) {
            memoList[index] = Memo(content: value);
          },
        ),
      ),
    );
  }
}
