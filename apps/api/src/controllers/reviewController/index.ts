import { Request, Response, NextFunction } from 'express'

import { createReviewUserService, getReviewUserEventService, getReviewUserService } from './../../services/review.service'

export const createReviewUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { reviewComments, feedback, rating, userId, eventId } = req.body

        await createReviewUserService({
            feedback,
            rating,
            userId,
            eventId,
            reviewComments
        })


        res.status(201).json({
            error: false,
            message: 'Berhasil memberikan review!',
            data: {}
        })

    } catch (error) {
        next(error)
    }
}


export const getReviewUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.body
        const data = await getReviewUserService({ userId })

        res.status(201).json({
            error: false,
            message: 'Berhasil Mendapatkan Data Review',
            data: {
                dataReview: data?.dataReview,
            }
        })

    } catch (error) {
        next(error)
    }
}

export const getReviewUserEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const data = await getReviewUserEventService({ id })

        res.status(201).json({
            error: false,
            message: 'Berhasil Mendapatkan Data Review',
            data: {
                dataReview: data?.dataReview,
            }
        })

    } catch (error) {
        next(error)
    }
}