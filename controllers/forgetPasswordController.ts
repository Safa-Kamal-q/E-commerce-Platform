import { sendEmail } from "../Utils/email.js";
import { User } from "../db/entities/User.js";
import crypto from 'crypto'
import express from 'express'
import bcrypt from 'bcrypt'
import { login } from '../controllers/authController.js'

const forgetPassword = async (user: User, req: express.Request) => {
    //1-generate reset token 
    const resetToken = crypto.randomBytes(32).toString('hex')

    const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    const passwordResetTokenExpires = new Date(Date.now() + 10 * 60 * 1000)

    user.passwordResetToken = passwordResetToken
    user.passwordResetTokenExpires = passwordResetTokenExpires

    await User.save(user);

    //2-send token for user email
    const resetUrl = `${req.protocol}://${req.get('host')}/users/resetPassword/${resetToken}`
    const msg = `We have received a password reset request. Please use this below link to reset your password\n\n${resetUrl}\n
    This link will be valid only for 10 minutes`

    console.log(resetToken)
    try {
        await sendEmail({
            email: user.email,
            subject: "Password change request received",
            message: msg
        })

        return ('Password reset link send to the user email')
    } catch (err) {
        user.passwordResetToken = ''
        user.passwordResetTokenExpires = new Date(Date.now() - 1000 * 1000)
        await User.save(user);

        throw ('There was an error sending password reset email.Please try again later')
    }

}

const resetPassword = async (req: express.Request, password: string, email: string) => {
    const resetToken = req.params.resetToken as string
    const token = crypto.createHash('sha256').update(resetToken).digest('hex')
    const currentTime = Date.now()

    const user = await User
        .createQueryBuilder('user')
        .where('user.passwordResetToken = :token', { token })
        .andWhere('user.passwordResetTokenExpires > :currentTime', { currentTime })
        .getOne();

    if (!user) {
        return ('Token is invalid, or has expired')
    }

    user.password = await bcrypt.hash(password, 10)
    user.passwordResetToken = ''
    user.passwordResetTokenExpires = new Date(Date.now() - 1000 * 1000)

    await User.save(user);

    try {
        const loginToken = await login(email, password).then(data => {
            return data
        }).catch(err => {
            throw (err)
        })
        return loginToken
    } catch (err) {
        console.log(err)
        throw (err)
    }
}


export {
    forgetPassword,
    resetPassword
}