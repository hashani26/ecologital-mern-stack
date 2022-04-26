import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../HOC/Global";
import { useParams } from "react-router-dom";
import { SendRequest } from "../helper/HandleRequest";
import { Form, Input, Button } from 'antd';
import { ToastContainer, toast } from 'react-toastify';


function SecuredPage() {
  const { userState } = useContext(GlobalContext);
  const params = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params.userId) {
      const route = 'http://localhost:8000/api/users/user'
      SendRequest(route, { _id: params.userId }, {}, 'get').then(respData => {
        const { returnedValue, success } = respData
        if (success) {
          setUser(returnedValue)
        } else {
          setUser({})
        }
      })
    }
  }, [])

  const onFinish = (values) => {
    setLoading(true)
    const route = 'http://localhost:8000/api/users/updateUser'
    SendRequest(route, { _id: user._id || userState.user._id, ...values }, {}, 'post').then(respData => {
      const { success } = respData
      if (success) {
        toast.success("Update successful")
        setLoading(false)
      } else {
        toast.error("Update failed")
        setLoading(false)
      }
    })
  };

  const onFinishFailed = (errorInfo) => {
    toast.error("Update failed")
  };

  function renderUserComp(user) {
    return <div className="container">
      <h1>Profile</h1>
      {user.mail && <Form
        layout="vertical"
        initialValues={{ mail: user.mail }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Email"
          name="mail"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item >
          <Button loading={loading} type="primary" htmlType="submit">
            Update
        </Button>
        </Form.Item>
      </Form>}
    </div>
  }

  return (
    <div>
      <ToastContainer />
      {
        params.userId ?
          renderUserComp(user) :
          userState.user &&
          renderUserComp(userState.user)
      }
    </div>
  );
}

export default SecuredPage;
