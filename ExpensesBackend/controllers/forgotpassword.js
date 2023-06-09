const UserData = require('../models/newuser');
const ForgotPass = require('../models/forgotpassword');
const uuid = require('uuid');
const bcrypt = require('bcrypt');





const Sib = require('sib-api-v3-sdk');
const client = Sib.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.SENDERBLUE_API_KAY;
const transaEmailApi = new Sib.TransactionalEmailsApi();



exports.ForgetPassword = async (req, res) => {
    try {
        const Email = req.body.email;
        const user = await UserData.findOne({ where: { Email } })
        // console.log(user);
        // console.log(user.id);
        if (user) {
            const id = uuid.v4();
            const resetpassword = await ForgotPass.create({ id: id, active: true, userId: user.id })
            // console.log(resetpassword);
            const sender = {
                name: 'belal',
                email: 'mohdbelal5266@gmail.com',
            };
            const receivers = [
                {
                    email: Email
                }

            ];

            await transaEmailApi.sendTransacEmail({
                sender,
                to: receivers,
                subject: 'reset password',
                textContent: 'reset your password here',
                htmlContent: `<a href="http://localhost:3000/password/reset_password/${id}">Reset Password</a>`
            });


            res.status(201).json({ message: "Email has send" })
        }
        else {
            res.status(200).json({ message: "this User doesnot exist" })
        }
    }
    catch (err) {
        // console.log(err)
        res.status(403).json({ message: "Email is not Valid", error: err })
    }
}



exports.reset_password = async (req, res) => {
    try {
        const id = req.params.id
        forgtepsssrequest = await ForgotPass.findOne({ where: { id: id } });
        console.log(forgtepsssrequest);
        if (forgtepsssrequest) {
            await forgtepsssrequest.update({ active: false });
            res.status(200).send(`<html>
                                    <script>
                                        function formsubmitted(e){
                                            e.preventDefault();
                                            console.log('called')
                                        }
                                    </script>
                                    <form action="/password/update_password/${id}" method="get">
                                        <label for="newpassword">Enter New password</label>
                                        <input name="newpassword" type="password" required></input>
                                        <button>reset password</button>
                                    </form>
                                </html>`
            )
            res.end()
        }
    } catch (err) {
        // console.log(err)
        res.status(400).json({ error: err })
    }
}


exports.update_password = async (req, res) => {
    try {
        const newpassword = req.query.newpassword;
        const { resetpassid } = req.params;
        // console.log("newpassword>>>>>>>"+ newpassword)
        // console.log("id>>>>>>>"+ resetpassid)
        const updatePass = await ForgotPass.findOne({ where: { id: resetpassid } })
        const passfromUser = await UserData.findOne({ where: { id: updatePass.userId } })
        //   console.log(updatePass);
        //   console.log(passfromUser);

        if (passfromUser) {
            //encrypt the password
            const saltRounds = 10;
            bcrypt.hash(newpassword, saltRounds,  async (err, hash) => {
                if (err) {
                    console.log(err);
                    throw new Error(err);
                }
                await passfromUser.update({ Password: hash })
                res.status(201).json({ message: 'Successfuly update the new password' })
            })
        }
        else {
            throw new Error('User not found')
        }
    } catch (err) {
        console.log(err)
        res.status(404).json({ error: err })
    }
}