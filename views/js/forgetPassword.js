

const my_form = document.getElementById('my_form');

my_form.addEventListener('submit', onsubmit);

async function onsubmit(eve) {
    try {
        eve.preventDefault();
        const EmailId = document.getElementById('useremail');

        let obj = { email: EmailId.value };

        let UseremaiIdPost = await axios.post("http://localhost:3000/password/forgotpassword", obj);
        
        console.log(UseremaiIdPost);

    } catch (err) {
        console.log(err)
    }
}