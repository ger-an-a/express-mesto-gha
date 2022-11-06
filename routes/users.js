const router = require('express').Router();
const {
  getUsers, getUser, getMyInfo, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getMyInfo);

router.get('/:userId', getUser);

router.patch('/me', updateUser);

router.patch('/me/avatar', updateAvatar);

module.exports = router;
