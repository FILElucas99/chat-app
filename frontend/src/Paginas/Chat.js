import React, { useEffect, useState } from 'react'
import axios from "axios"

const Chat = () => {

    const [chats, setState] = useState([]);

    const fetchCharts = async () => {
        const {data} = await axios.get('/api/chat');
        setState(data);
    }
    useEffect(() => {
       fetchCharts();
    }, []);

  return <div>
    {chats.map(chat => <div key={chat._id}>
        {chat.chatName}
    </div>)}
  </div>;
}

export default Chat