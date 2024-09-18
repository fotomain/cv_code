import React, {Component} from 'react';

import emailjs from "@emailjs/browser";

const YOUR_SERVICE_ID = 'service_v9c8tpf'
const YOUR_TEMPLATE_ID = 'template_f5dtomc'
const YOUR_PUBLIC_KEY = '6lXsJynSUxcKnHKtp'


class SendEmail extends Component {
    constructor(props) {

        super(props);

        emailjs.init(YOUR_PUBLIC_KEY)

        console.log("=== SendEmail callAPI start")

        this.Url = props.p_url;
        this.Api_key = props.p_api_key;
        this.Email_from = props.p_email_from;
        this.Email_to = props.p_email_to;

        this.Subject = props.p_subject;
        this.Message  = props.p_message;
        this.Signature  = props.p_signature;
        this.Footer  = props.p_footer;
        this.CallBack  = props.p_call_back;

        this.Body = {

            "api_key": this.Api_key,
            "email_from": this.Email_from,
            "email_to":this.Email_to,
            "subject":this.Subject,
            "message":this.Message,
            "signature":this.Signature,
            "footer":this.Footer,
        }


    }

    async componentDidMount() {

        try {

            await emailjs.send( YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, {
                    to_name: 'James',
                    from_name: 'Steven'
                });
                alert("=== email successfully sent check inbox");
            } catch (error) {
                console.log(error);
                alert("=== error 489asdf");
            } finally {
                alert("=== finally 489asdf");
            }


    }


    render() {
        return (
            <div>

            </div>
        );
    }
}

export default SendEmail;

