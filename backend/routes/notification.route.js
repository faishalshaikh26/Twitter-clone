import express from 'express'
import { protectRoute } from '../middleware/protectRoute.js';
import { deleteOneNotification , deleteNotification, getNotifications } from '../controller/notification.controller.js';

const router = express.Router();

// Get all notifications
router.get('/', protectRoute , getNotifications);

// Delete all notification
router.delete('/',protectRoute , deleteNotification);

// Delete one notification by id
router.delete('/:id',protectRoute , deleteOneNotification);

export default router