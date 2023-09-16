import React from 'react';
import { Row, Form, message } from 'antd';

const ContactForm = () => {
    const onFinish = (values) => {
        console.log(values);
        message.success('Thank you for contacting us!');
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    return (
        <Form 
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Row>
                <div class="col-lg-12">
                    <div class="mar-15">
                        <p class="Get-p">Get in touch</p>
                        <p class="Get-p-1">Our friendly team would love to hear from you.</p>
                    </div>
                </div>
            </Row>
            <Row>
                <div class="col-lg-6">
                    <div class="mar-15">
                        <label for="" class="label-contact">First name</label>
                        <input type="text" class="input-contact" placeholder="First Name" required />
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="mar-15">
                        <label for="" class="label-contact">Last name</label>
                        <input type="text" class="input-contact" placeholder="Last Name" required />
                    </div>
                </div>
            </Row>
            <Row>
                <div class="col-lg-12">
                    <div class="mar-15">
                        <label for="" class="label-contact">Email</label>
                        <input type="text" class="input-contact" placeholder="Email" />
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="mar-15">
                        <label for="" class="label-contact">Phone Number</label>
                        <input type="text" class="input-contact" placeholder="Phone Number" />
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="mar-15">
                        <label for="" class="label-contact">Message</label>
                        <textarea class="input-contact input-area"></textarea>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="mar-15">
                        <div class="flex-input">
                            <input type="checkbox" /> <label for="">You agree to our friendly privacy policy.</label>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="mar-no">
                        <button type='submit' class="Send-message">Send message</button>
                    </div>
                </div>
            </Row>
        </Form>
    )
}

export default ContactForm