const mysql = require('mysql'); //mysql 모듈 코드
const db_info = {
    host : 'localhost',
    port : '3306',
    user : 'root',
    password : 'codeypaper0118',
    database : 'trashcan'
};

/*var connection = mysql.createConnection(db_info); // DB 커넥션 생성
connection.connect();   // DB 접속 */

module.exports = {
    init: function() {
        return mysql.createConnection(db_info);
    },
    connect : function(conn) {
        conn.connect(function(err){
            if(err){console.error('mysql connection error : ' + err);
            } else {console.info('mysql is connected successfully!');
            }
        });
    }
}