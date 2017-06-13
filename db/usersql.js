var UserSQL = {
	insert: 'INSERT INTO User(uid,userName) VALUES(?,?)',
	queryAll: 'SELECT * FROM User',
	getUserById: 'SELECT * FROM User WHERE uid = ?',
	deleteUserById: 'DELETE FROM User WHERE uid = ?',
	modifyUser: 'UPDATE User SET name = ? WHERE uid= ?'
}
module.exports = UserSQL;