import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { Table } from 'antd'


export const Users = () => {
  const [users, setUsers] = useState([]);
  const getUsers = async (req,res) => {
    try {
      
      const res = await axios.get('/api/v1/admin/getAllUsers', 
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` 
      }
      });
      console.log(res.data);
      if (res.data.success) {
        
        console.log('Full response:', res.data);
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
      
    }
  };
  useEffect(() => {
    getUsers();
  }, []);


  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
    },
    {
      title: 'email',
      dataIndex: 'email',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div className='d-flex'>
          <button className='btn btn-danger'>Block</button>
        </div>
      ),
    },
  ];



  return (
    <Layout>
      <div>All Users list</div>
      <Table columns={columns} dataSource={users} rowKey="_id" />
    </Layout>
  );
};

export default Users;
