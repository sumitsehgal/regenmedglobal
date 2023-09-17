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
                <div className="col-lg-12">
                    <div className="mar-15">
                        <p className="Get-p">Get in touch</p>
                        <p className="Get-p-1">Our friendly team would love to hear from you.</p>
                    </div>
                </div>
            </Row>
            <Row>
                <div className="col-lg-6">
                    <div className="mar-15">
                        <label htmlFor="" className="label-contact">First name</label>
                        <input type="text" className="input-contact" placeholder="First Name" required />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="mar-15">
                        <label htmlFor="" className="label-contact">Last name</label>
                        <input type="text" className="input-contact" placeholder="Last Name" required />
                    </div>
                </div>
            </Row>
            <Row>
                <div className="col-lg-12">
                    <div className="mar-15">
                        <label htmlFor="" className="label-contact">Email</label>
                        <input type="text" className="input-contact" placeholder="Email" />
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="mar-15">
                        <label htmlFor="" className="label-contact">Phone Number</label>
                        <input type="text" className="input-contact" placeholder="Phone Number" />
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="mar-15">
                        <label htmlFor="" className="label-contact">Message</label>
                        <textarea className="input-contact input-area"></textarea>
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="mar-15">
                        <div className="flex-input">
                            <input type="checkbox" /> <label htmlFor="">You agree to our friendly privacy policy.</label>
                        </div>
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="mar-no">
                        <button type='submit' className="Send-message">Send message</button>
                    </div>
                </div>
            </Row>
        </Form>
    )
}

export default ContactForm