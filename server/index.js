const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
const { response } = require('express');
const session = require('express-session');
const jwt = require("jsonwebtoken");
/* 사진 업로드를 위한 library */
const multer = require("multer");
var router   = express.Router();
const path = require("path");
const PORT = process.env.port || 5000;

/* const db = mysql.createPool({
    host: "127.0.0.1", //"localhost",
    user: "root",
    password: "1234",
    database: "jobshop",
    port: '3306',
});  */

app.use(
    session({
        secret:'@travelbusanko',
        resave: false,
        saveUninitialized: true,
        cookie: {
            domain: 'localhost',
            path: '/',
            maxAge: 24 * 6 * 60 * 10000,
            sameSite: 'none',
            httpOnly: true,
            secure: false
        }
    })
)

//http://db.travelbusanko.com:3306/
 const db = mysql.createPool({
    host: 'db.travelbusanko.com', 
    user: 'travelok',
    password: 'travel@1302',
    database: 'dbtravelok',
   // port: '3306',
}); 

const id_getter = (t, c) => {
    return new Promise(resolve => {
        const sqlQuery = "SELECT " + c + " FROM " + t + " ORDER BY " + c + " DESC LIMIT 1";
        
        db.query(sqlQuery, (err, result)=>{
            if (result.length == 0){
                resolve("0");
            } else{
                resolve(result[0]);
            }
            
        })
    })
}

const id_generate = (request, id) => {
    
    return new Promise(resolve => {
        var int_id = "";
        if (typeof(id) == "undefined"){
            int_id = "0";
        } else{
            int_id = id.slice(-3);
            
        }
        var cnt_id = parseInt(int_id) + 1;
        var str_id = "";
        
        if (cnt_id < 10){
            str_id = request + '00' + cnt_id.toString();
        } 
        if (cnt_id >= 10) {
            str_id = request + '0' + cnt_id.toString();
        }
        if (cnt_id > 99) {
            str_id = request + cnt_id.toString();
        }
        resolve(str_id);
    })
    
}

  
app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// http://localhost:3306/ 으로 접속 시 응답메시지 출력 
// https://jostorys.tistory.com/12?category=859840
//https://ddeck.tistory.com/27
//https://meetup.toast.com/posts/92 REST API 설계

app.get("/home", (req,res) => {
    res.send('Server Response Success!!!');
}) 


// http://localhost:3306/api/board
app.get('/api/board', (req, res)=>{
    const sqlQuery = "SELECT * FROM board where name='manager'";
    db.query(sqlQuery, (err, result)=>{
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else{
        res.send(result);
        }
    })
})

//https://expressjs.com/en/5x/api.html#req.params
//https://ddeck.tistory.com/30
app.get('/board_test/:id', (req, res)=>{
    const sqlQuery = "SELECT * FROM board_test where id=?"; ///board_test?id=1
    const id = req.params.id;
    console.log(id); //DB console 
    //console.dir(req.path);    
    db.query(sqlQuery, [id], (err, result)=>{
        console.dir(req.path);
        if(err){            
            res.status(500).send('Internal Server Error');
        } else{
        res.send(result);
        }
    })
}) 


app.get('/board_test/g1', (req, res)=>{
    const sqlQuery = "SELECT id, title, body FROM board_test where id=?";
    const id = req.body.id; 
    //console.log('gg', req.params.id);   
    //console.log(id);    
    db.query(sqlQuery, [id], (err, result)=>{
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else{
        console.log(req.body);
        res.send(result);                
        }
    })
})

app.get('/board_test', (req, res)=>{
    const sqlQuery = "SELECT * FROM board_test order by id desc";
    db.query(sqlQuery, (err, result)=>{
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else{
        console.log(req.body);
        res.send(result);        
        //res.json(req.body);
        }       
    })
})

//id generation is needed
app.post("/board_test/:id", (req, res) => {
    const title = req.body.title;
    const body = req.body.body;
    console.log(title);
    console.log(body);
    const sqlQuery = "INSERT INTO board_test(title, body) VALUES (?,?)";
    db.query(sqlQuery, [title, body], (err, result) => {
        res.send('success!');
    });
});

app.delete("/board_test", (req, res) => {    
        const id = req.body.id;        
        const sqlQuery = "DELETE FROM board_test where id=?";
        db.query(sqlQuery, [id], (err, result)=>{
            if(err) throw err;
            console.log(err);
            //res.send(result);
        })
});

app.delete("/board_test/:id", (req, res) => {           
        const id = req.params.id;
        const sqlQuery = "DELETE FROM board_test where id=?";    
        db.query(sqlQuery, [id], (err, result)=>{
            if(err) throw err;
            console.log(err);
            res.send(result);
        })
});


app.put("/board_test/:id", (req, res) => {
    const title = req.body.title;
    const body = req.body.body;
    const id = req.params.id;    
    const sqlQuery = "UPDATE board_test SET title=?, body=? where id=?";   
    db.query(sqlQuery, [title, body, id], (err, result)=>{
        if(err) throw err;
        console.log(err); //changedRows
        res.send(result);
    })
});

/* 로그인 */
app.post("/api/login", (req, res) => {
    
    const user_id = req.body.userId;
    const user_pw = req.body.userPw;
    const user_info = new String(user_id);

    const accessToken = jwt.sign({
        travelbusanko: "travelbusanko"
    },
    "secretkey",
    {
        subject: "logintoken",
        expiresIn: "60m",
        issuer: user_info.toString()
    });
    
    //입력된 id 와 동일한 id DB에서 확인
    const sqlQuery1 = "SELECT COUNT(*) AS result FROM users where id=?";
    db.query(sqlQuery1, user_id, (err, data) => {
        if(!err) {
            if(data[0].result < 1) {    //동일한 아이디가 없다면
                res.send({'msg':'입력하신 ID는 유효하지 않습니다.'})
            }else{                      //동일한 아이디가 있다면 >> 비밀번호 확인
                const sqlQuery2 = `
                    SELECT 
                        case (SELECT COUNT(*) FROM users WHERE id=? AND password=?)
                            when '0' then NULL ELSE
                            (SELECT id FROM users WHERE id=? AND password=?)
                        END AS userId,
                        case (SELECT COUNT(*) FROM users WHERE id=? AND password=?)
                            when '0' then NULL ELSE
                            (SELECT password FROM users WHERE id=? AND password=?)
                        END AS userPw`;

                //SQL 파라메타 나열
                const params = [user_id, user_pw, user_id, user_pw, user_id, user_pw, user_id, user_pw];
                db.query(sqlQuery2, params, (err, data) => {
                    if(!err) {
                        req.session.user_id = user_id;
                        req.session.save();
                        data[0]['token'] = accessToken;
                        res.send(data[0]);
                        
                    } else {
                        res.send(err);
                    }
                })
            }
        } else {
            res.send(err);
        }
    })
    
})

/* 로그아웃 */
app.post("/api/logout", (req, res) => {
    req.session.destroy();      // 세션 삭제
    res.json({ data: null, message: 'ok' });
});

/* 회원가입 */
app.post("/api/signup", (req, res) => {
    
    const id = req.query.user_id;
    const password = req.query.user_pwd;
    const email = req.query.user_email;
    const name = req.query.user_name;
    const phone_number = req.query.user_phone;
    const birthday = req.query.user_birth;
    const auth = 'auth_3';

    const sqlQuery = "INSERT INTO users(id, email, password, name, phone_number, birthday, auth_category) VALUES (?,?,?,?,?,?,?)";
    db.query(sqlQuery, [id, email, password, name, phone_number, birthday, auth], (err, result) => {
        res.send('success!');
    });
});

/* 아이디 중복 확인 */
app.post('/api/checkid', (req, res)=>{

    const id = req.query.user_id;
    const sqlQuery = "SELECT id FROM users where id=?";
    db.query(sqlQuery, [id], (err, result)=>{
        if(result.length==0){
            res.json({message: 'OK'})
        } else{
            res.json({message:'No'})
        }      
    })
})

app.get('/api/user/info/:id', (req, res)=>{
    const id = req.params.id;
    
    const sqlQuery = "SELECT * FROM users WHERE id=?";
    db.query(sqlQuery, [id], (err, result)=>{
        res.json(result)   
    })  
})

app.post('/api/user/info/update', (req, res)=>{
    const id = req.query.user_id;
    const password = req.query.user_pwd;
    const email = req.query.user_email;
    const name = req.query.user_name;
    const phone_number = req.query.user_phone;
    const birthday = req.query.user_birth;
    
    const sqlQuery = "UPDATE users SET email=?, password=?, name=?, phone_number=?, birthday=? WHERE id=?";
    db.query(sqlQuery, [email, password, name, phone_number, birthday, id], (err, result) => {
        res.send('success!');
    });
})

/* 위치 타입 조회 */
app.get('/api/location/types', async (req, res)=>{
    const sqlQuery = "SELECT * FROM loc_type";
    db.query(sqlQuery, (err, result)=>{
        res.json(result)   
    })       
})

app.get('/api/location/types/main', async (req, res)=>{
    const sqlQuery = "SELECT * FROM main_locations";
    db.query(sqlQuery, (err, result)=>{
        res.json(result)   
    })       
})

app.get('/api/location/types/main/:id', async (req, res)=>{
    const id = req.params.id;
    const sqlQuery = "SELECT * FROM sub_locations WHERE mloc_id=?";
    db.query(sqlQuery, [id], (err, result)=>{
        res.json(result)   
    })       
})

/* 사진 저장 루틴 */
var storage  = multer.diskStorage({ // 2
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      cb(null, `${Date.now()}__${file.originalname}`);
    },
});
var upload = multer({ dest: 'uploads/' }); // 3-1
var uploadWithOriginalFilename = multer({ storage: storage }); // 3-2

app.post('/api/upload/images', upload.array("uploadfile"), async (req, res)=>{
    
    const path_ids = [];
    /* 게시글 별 이미지 추가 루틴*/
    for(var i=0; i<req.files.length; i++){
        const get_path_id = await id_getter("image_path", "path_id");
        const path_id = await id_generate('PATH', get_path_id.path_id);
        path_ids.push(path_id);
        const saved_path = req.files[i].path;
        const file_name = req.files[i].originalname;
        const sqlQuery = "INSERT INTO image_path(path_id, saved_path, file_name) VALUES (?,?,?)";
        db.query(sqlQuery, [path_id, saved_path, file_name], (err, result) => {
            
        });
        
    }
    
})


/* 사진 저장 루틴 */

const addmloc_db_insert = (e,p) => {
    
    const sqlQuery = "INSERT INTO main_locations(mloc_id, loc_name, loc_lat, loc_lng, loctype_id) VALUES (?,?,?,?,?)";
    db.query(sqlQuery, e, (err, result) => {
        console.log(err);
        console.log("insert success"); //changedRows
    });
    for (var i=0; i<p.length; i++){
        const sqlQuery2 = "UPDATE image_path SET loc_id=? where path_id=?";
        db.query(sqlQuery2, [e[0], p[i]], (err, result)=>{
            console.log("update success"); //changedRows
        })
    }
}   

const addsloc_db_insert = (e,p) => {
    
    const sqlQuery = "INSERT INTO sub_locations(mloc_id, sloc_id, loc_name, loc_lat, loc_lng, loctype_id) VALUES (?,?,?,?,?,?)";
    db.query(sqlQuery, e, (err, result) => {
        console.log(err);
        console.log("insert success"); //changedRows
    });
    for (var i=0; i<p.length; i++){
        const sqlQuery2 = "UPDATE image_path SET loc_id=? where path_id=?";
        db.query(sqlQuery2, [e[0], p[i]], (err, result)=>{
            console.log("update success"); //changedRows
        })
    }
}   



app.post('/api/add/location', upload.array("uploadfile"), async (req, res)=>{
    
    const post_type = req.body.post_type;
    const columns = [];
    const path_ids = [];
    if(post_type == "LOC"){
        const get_id = "";
        const loc_id = "";
        if(req.body.loctype_id == "loct_001"){
            const get_id = await id_getter("main_locations", "mloc_id");
            const loc_id = await id_generate('MLOC', get_id.mloc_id);
            columns.push(loc_id);
        } else {
            const get_id = await id_getter("sub_locations", "sloc_id");
            const loc_id = await id_generate('SLOC', get_id.sloc_id);
            const mloc_id = req.body.main_loctype_id;
            console.log(req.body);
            columns.push(mloc_id);
            columns.push(loc_id);
        }
        const loc_name = req.body.loc_name;
        const loc_lat = req.body.loc_lat;
        const loc_lng = req.body.loc_lng;
        const loctype_id = req.body.loctype_id;
        
        
        columns.push(loc_name);
        columns.push(loc_lat);
        columns.push(loc_lng);
        columns.push(loctype_id);
        
        
        /* 게시글 별 이미지 추가 루틴*/
        for(var i=0; i<req.files.length; i++){
            const get_path_id = await id_getter("image_path", "path_id");
            const path_id = await id_generate('PATH', get_path_id.path_id);
            path_ids.push(path_id);
            console.log(path_id);
            const saved_path = req.files[i].path;
            const file_name = req.files[i].originalname;
            const sqlQuery = "INSERT INTO image_path(path_id, saved_path, file_name, latitude, longitude) VALUES (?,?,?,?,?)";
            db.query(sqlQuery, [path_id, saved_path, file_name, loc_lat, loc_lng], (err, result) => {
                
            });
            
            if(i==req.files.length-1){
                if(req.body.loctype_id == "loct_001"){
                    addmloc_db_insert(columns, path_ids);
                    res.redirect('http://travelbusanko.com/home');
                } else{
                    addsloc_db_insert(columns, path_ids);
                    res.redirect('http://travelbusanko.com/home');
                }
                
            }
        }
    
    }
    
    
})

/* 사진 조회 */
app.get('/api/view/image/:loc_id', async (req, res)=>{
    const loc_id = req.params.loc_id;
    const sqlQuery = "SELECT * FROM image_path WHERE loc_id=?";
    
    db.query(sqlQuery, [loc_id], (err, result)=>{
        res.json(result);   
    })   
})



app.listen(5000, () => {
    console.log(`running on port ${PORT}`);
});


