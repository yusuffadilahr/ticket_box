import express, { Router } from 'express';
import authRouter from './auth.router';
import categoryRouter from './category.router';
import eventRouter from './event.router';
import userRouter from './user.router';
import eventOrganizerRouter from './event.organizer.router';
import transactionRouter from './transaction.router';
import reviewRouter from './review.router';
import midtransRouter from './midtrans.router';

const router = Router();
router.use('*/images', express.static('src/public/images'))

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/event-organizer', eventOrganizerRouter)
router.use('/category', categoryRouter)
router.use('/event', eventRouter)
router.use('/transaction', transactionRouter)
router.use('/review', reviewRouter)
router.use('/webhook', midtransRouter)

export default router