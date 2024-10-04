import {page, i18n} from "@params"
console.debug(`page: ${page}`);

const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = i18n['form_msg_please_wait']

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                if (page == "about") {
                    result.innerHTML = i18n['form_msg_success_contact'];
                }
                else if (page == "contact") {
                    result.innerHTML = i18n['form_msg_success_quote'];
                }
                else {
                    result.innerHTML = i18n['form_msg_success_contact'];
                }
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
});