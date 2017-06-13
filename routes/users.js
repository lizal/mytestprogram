var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var userSQL = require('../db/usersql');
var debug = require('debug')

/* GET users listing. */
router.get('/', function (req, res, next) {
	res.send('respond with a resource');
});
var pool = mysql.createPool(dbConfig.mysql);
var responseJSON = function (res, ret) {
	if (typeof ret === 'undefined') {
		res.json({ code: '-200', msg: '操作失败' })
	} else {
		res.json(ret)
	}
}
router.get('/addUser', function (req, res, next) {
	pool.getConnection(function (err, connection) {
		var param = req.query || req.params;
		connection.query(userSQL.insert, [param.uid, param.name], function (err, result) {
			if (result) {
				result = {
					code: 200,
					msg: '增加成功'
				}
			}
			responseJSON(res, result);
			connection.release();
		})
	})
})
router.get('/getAll', function (req, res, next) {
	debug(req.originalUrl)
	pool.getConnection(function (err, connection) {
		var param = req.query || req.params;
		connection.query(userSQL.queryAll, function (err, result) {
			if (result) {
				result = {
					code: 200,
					msg: '查询成功',
					data: result
				}
			}
			responseJSON(res, result);
			connection.release();
		})
	})
})
router.get('/getUserById', function (req, res, next) {
	pool.getConnection(function (err, connection) {
		var param = req.query || req.params;
		connection.query(userSQL.getUserById, param.uid, function (err, result) {
			if (result) {
				result = {
					code: 200,
					msg: '查询成功',
					data: result
				}
			}
			responseJSON(res, result);
			connection.release();
		})
	})
})
router.get('/deleteUserById', function (req, res, next) {
	pool.getConnection(function (err, connection) {
		var param = req.query || req.params;
		connection.query(userSQL.deleteUserById, param.uid, function (err, result) {
			if (result) {
				result = {
					code: 200,
					msg: '删除成功',
					data: result
				}
			}
			responseJSON(res, result);
			connection.release();
		})
	})
})
router.get('/modifyUser', function (req, res, next) {
	debug(req.originalUrl)
	pool.getConnection(function (err, connection) {
		var param = req.query || req.params;
		connection.query(userSQL.modifyUser, [param.name, param.uid], function (err, result) {
			if (result) {
				result = {
					code: 200,
					msg: '修改成功',
					data: result
				}
			}
			responseJSON(res, result);
			connection.release();
		})
	})
})
// router.post('/modifyUser', function (req, res, next) {
// 	pool.getConnection(function (err, connection) {
// 		var param = req.body || req.params;
// 		connection.query(userSQL.modifyUser, [param.name, param.uid], function (err, result) {
// 			if (result) {
// 				result = {
// 					code: 200,
// 					msg: '修改成功',
// 					data: result
// 				}
// 			}
// 			responseJSON(res, result);
// 			connection.release();
// 		})
// 	})
// })
module.exports = router;
