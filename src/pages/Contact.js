import React from 'react';
import { Row, Col, Form, Input, Button, message } from 'antd';
import YouTube from 'react-youtube';

const Contact = () => {
  const onFinish = (values) => {
    console.log(values);
    message.success('Thank you for contacting us!');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // YouTube video options
  const videoOptions = {
    height: '360',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <section className="contact-section">
      <Row gutter={24}>
        <Col span={12}>
          <div style={{ padding: '2rem' }}>
            <h2>Contact Us</h2>
            <Form
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout="vertical"
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your name!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                  {
                    type: 'email',
                    message: 'Please enter a valid email address',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Message"
                name="message"
                rules={[
                  {
                    required: true,
                    message: 'Please input your message!',
                  },
                ]}
              >
                <Input.TextArea />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmltype="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
        {/* <Col span={12}>
          <div style={{ padding: '2rem', marginTop: '10rem' }}>
            <YouTube videoId="tEncDAF5KEA" opts={videoOptions} />
          </div>
        </Col> */}
      </Row>
    </section>
  );
};

export default Contact;
