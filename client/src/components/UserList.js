import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../HOC/Global";
import { Table, Button } from 'antd';
import { SendRequest } from "../helper/HandleRequest";
import { readUsers } from '../store/actions/user';

function Users() {
    const { userState, userDispatch } = useContext(GlobalContext);
    const columns = [
        {
            title: 'Email',
            dataIndex: 'mail',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Action',
            render: (data) => (
                <Button>
                    <a href={`/SecuredPage/${data.key}`}>Edit</a>
                </Button>
            ),
        },
    ];

    useEffect(() => {
        const route = 'http://localhost:8000/api/users/users'
        SendRequest(route, {}, {}, 'get').then(respData => {
            const { returnedValue, success } = respData
            if (success) {
                userDispatch(readUsers(returnedValue))
            } else {
                userDispatch(readUsers([]))
            }
        })
    }, [userDispatch])

    return (
        <>{
            userState.user && userState.user.userLevel === 1 ?

                (userState.user &&
                    <Table columns={columns} dataSource={userState.users} pagination={false} />)
                :
                <div>You dont have access</div>

        }

        </>)
}
export default Users