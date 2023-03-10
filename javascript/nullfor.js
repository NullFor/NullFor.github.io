function handleFileSelect() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://nullfor.github.io/data/temp.xls");
    xhr.responseType = "blob"; // 设置响应类型为二进制对象

    xhr.onload = function () {
        if (xhr.status === 200) {
            // 将响应内容转换为 File 对象
            var file = new File([xhr.response], "file.xls");

            // 在这里可以使用 file 变量来访问文件内容
            var reader = new FileReader();

            // 当文件读取完成时调用回调函数
            reader.onload = function (e) {
                // 使用 SheetJS 库来解析 Excel 文件内容
                var data = e.target.result;
                var workbook = XLSX.read(data, { type: 'binary' });

                // 获取第一个工作表
                var firstSheet = workbook.Sheets[workbook.SheetNames[0]];

                // 使用 SheetJS 库将工作表转换为 JSON 对象
                var excelData = XLSX.utils.sheet_to_json(firstSheet);

                // 在这里可以使用 excelData 变量来访问 Excel 文件中的数据
                var firstRow = excelData[0]; // 获取第一行
                console.log(firstRow.id); // 输出 "Alice"
                console.log(firstRow.name); // 输出 "Alice"
            };

            // 使用 reader.readAsBinaryString() 方法来读取文件内容
            reader.readAsBinaryString(file);
        }
    };

    xhr.send();
    
}