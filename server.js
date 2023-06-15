const express = require('express');
const app = express();
const path = require('path');

app.listen(8000, function(){
    console.log('listening on 8000');
});

//하단 3줄의 코드 추가해놔야 ajax가 잘 됨.
//npm install cors 터미널 입력 필요.
app.use(express.json());
var cors = require('cors');
app.use(cors());

//이 폴더 내에 특정 파일을 전송해서 쓰겠습니다.
//이 줄이 있어야 get해서 보내줄 수 있음.
app.use(express.static(path.join(__dirname, '/trashcan/build')));

app.get('/', function(요청, 응답){
    응답.sendFile(path.join(__dirname, '/trashcan/build/index.html'));
});

//object나 array 데이터 보내줄 때 사용.
//리액트에서는 상품데이터가 필요할 때 GET요청 보내야함.
app.get('/read', function(요청, 응답){
    var readData = "";
    conn.query('select content from user ORDER BY ID DESC LIMIT 1;', (error, data) => {
        if (error) throw err;
        console.log(data);
        for(var d of data) {
            //readData.push(d.content);
            readData = d.content;
        }
        console.log(readData);
        응답.json({
            statusCode : 200,
            responseMessage : "성공적으로 불러옴.",
            data : readData
        });
        console.log("저장된 내용 불러오기.");
    });
    
});

var db_config = require(__dirname + '/config/database.js');
var conn = db_config.init();
db_config.connect(conn);

app.post('/save', function(요청, 응답){
    var body = 요청.body.data;
    응답.json({
        statusCode : 200,
        responseMessage : "성공적으로 저장",
        data : body
    });
    console.log("작성한 내용 저장 요청.", 요청.body);
    var sql = 'INSERT INTO user(content, day) VALUES(?, NOW())';
    var params = [body];
    conn.query(sql, params, function(err) {
        if(err) console.log('query is not excuted. insert fail...\n' + err);
        else console.log('내용 저장 성공.');
        //res.redirect('/save');
    });
    
});

app.post('/trash', function(요청, 응답){
    conn.query('delete from user ORDER BY ID DESC LIMIT 1;', (error) => {
        if (error) throw err;
        응답.json({
            statusCode : 200,
            responseMessage : "성공적으로 삭제함.",
        });
        console.log("삭제.");
    });
});

//유저가 작성한 모든 경로에 해당 페이지를 보여주세요.
//리엑트 라우터가 보여질 것임.
app.get('*', function(요청, 응답){
    응답.sendFile(path.join(__dirname, '/trashcan/build/index.html'));
});