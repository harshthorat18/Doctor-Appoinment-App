import React, { useState } from 'react';
import Layout from '../components/Layout';
import { message, Tabs } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function NotificationPage() {
  const { user } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState('unread');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        '/api/v1/user/get-all-notification',
        { userId: user._id },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        dispatch({ type: 'user/setUser', payload: res.data.data });
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  const handleDeleteAllRead = async() => {
    try{
        dispatch(showLoading());
        const res = await axios.post('/api/v1/user/delete-all-notification',
           {userId:user._id},{headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}})
        dispatch(hideLoading());
        if(res.data.success){
            message.success(res.data.message)
        }
        else{
            message.error(res)
        }
    }catch(error){
        console.log(error);
        message.error('somthing went wrong')
    }
    console.log('Delete All Read');
    // Future logic goes here
  };

  if (!user) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }

  const items = [
    {
      key: '1',
      label: 'Unread',
      children: (
        <div>
          <div className="d-flex justify-content-end">
            <h2
              className="p-2"
              onClick={handleMarkAllRead}
              style={{ cursor: 'pointer' }}
            >
              Mark All Read
            </h2>
          </div>
          {(user.notification || []).map((notificationMsg, index) => (
            <div className="card" key={index}>
              <div
                className="card-text"
                onClick={() => navigate(notificationMsg.onClickPath)}
                style={{ cursor: 'pointer' }}
              >
                {notificationMsg.message}
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: '2',
      label: 'Read',
      children: (
        <div>
          <div className="d-flex justify-content-end">
            <h2
              className="p-2"
              onClick={handleDeleteAllRead}
              style={{ cursor: 'pointer' }}
            >
              Delete All Notification
            </h2>
          </div>
          {(user.seennotification || []).map((notificationMsg, index) => (
            <div
              className="card-text"
              key={index}
              onClick={() => navigate(notificationMsg.onClickPath)}
              style={{ cursor: 'pointer' }}
            >
              {notificationMsg.message}
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h4 className="p-3 text-center">Notification Page</h4>
      <Tabs defaultActiveKey="1" items={items} />
    </Layout>
  );
}
