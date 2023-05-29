
const Sib = require('sib-api-v3-sdk');

const client = Sib.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.SENDERBLUE_API_KAY;
const transaEmailApi = new Sib.TransactionalEmailsApi();

exports.forgetpassword = async (req, res) => {
    try {
        const Email = req.body.email;
        // console.log(Email);
        const sender = {
            name: 'belal',
            email: 'mohdbelal5266@gmail.com',
        }

        const receivers = [
            {
                email: Email
            }

        ]
        await transaEmailApi.sendTransacEmail({
            sender,
            to: receivers,
            subject: 'To check the send Email',
            htmlContent: `<h2> Congratulations! </h2>`
        })
        res.status(201).json({ message: "Email has send" })
    } catch (err) {
        console.log(err)
        res.status(403).json({ message: "Email is not Valid", error: err })
    }
}