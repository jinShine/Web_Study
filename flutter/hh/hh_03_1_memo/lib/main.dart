import 'package:flutter/material.dart';
import 'package:hh_03_1_memo/memo_service.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

late SharedPreferences prefs;

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  prefs = await SharedPreferences.getInstance();

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
                              ),
                            ),
                          );
                        },
                      );
                    }),
            floatingActionButton: FloatingActionButton(
              onPressed: () {
                memoService.createMemo(content: "");

                Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) =>
                          DetailPage(index: memoService.memoList.length - 1)),
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
  final int index;

  DetailPage({super.key, required this.index});

  TextEditingController contentController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    MemoService memoService = context.read<MemoService>();
    Memo memo = memoService.memoList[index];

    contentController.text = memo.content;

    return Scaffold(
      appBar: AppBar(
        actions: [
          IconButton(
            onPressed: () {
              // 삭제 버튼 클릭시
              showDeleteDialog(context, memoService);
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
            memoService.updateMemo(index: index, content: value);
          },
        ),
      ),
    );
  }

  void showDeleteDialog(BuildContext context, MemoService memoService) {
    showDialog(
        context: context,
        builder: (context) {
          return AlertDialog(
            title: const Text("정말로 삭제하시겠습니까?"),
            actions: [
              TextButton(
                  onPressed: () {
                    memoService.deleteMemo(index: index);
                    Navigator.pop(context); // 팝업 닫기
                    Navigator.pop(context); // HomePage로 이동
                  },
                  child: const Text("삭제")),
              TextButton(
                  onPressed: () {
                    Navigator.pop(context); // 팝업 닫기
                  },
                  child: const Text("취소")),
            ],
          );
        });
  }
}
