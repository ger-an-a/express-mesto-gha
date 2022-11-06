const router = require('express').Router();
const {
  getUsers, getMyInfo, getUser, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/:userId', getUser);

router.get('/me', getMyInfo);

router.patch('/me', updateUser);

router.patch('/me/avatar', updateAvatar);

module.exports = router;
