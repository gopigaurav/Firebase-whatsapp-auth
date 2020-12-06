import React, {useState, useEffect} from 'react';
import {Avatar} from "@material-ui/core";
import {IconButton} from "@material-ui/core";
import {MoreVert} from '@material-ui/icons';
import './Chat.css';
import { AttachFile, SearchOutlined } from '@material-ui/icons';
import InsertEmotionIcon from "@material-ui/icons/InsertEmoticon"
import MicIcon from "@material-ui/icons/Mic"
import {useParams} from "react-router-dom";
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase'

 {/*  
    const [input,setInput] = useState([])

    const sendMessage = async (e) => {
        e.preventDefault();

        await axios.post('/messages/new', {
            message:input,
            name: "gopi",
            timestamp   : "Real Time | Thanks CP",
            received : true
        })

        setInput('');
    }
*/}



//(message.timestamp?.toDate())
function Chat() { 

    const [input ,setInput] = useState([]);
    const {roomId} = useParams();
    const[roomName,setRoomName] = useState("");
    const[messages, setMessages] = useState([]);
    const [{user} ,dispatch] = useStateValue();
    

    useEffect(() => {
      if (roomId){
          db.collection('rooms').doc(roomId)
          .onSnapshot((snapshot) => 
              setRoomName(snapshot.data().name)
          )
          db.collection('rooms').doc(roomId)
          .collection('messages').orderBy('timestamp','asc')
          .onSnapshot((snapshot)=>
          setMessages(snapshot.docs.map((doc)=>
          doc.data()))
          )
      }
    }, [roomId]);


 
    const sendMessage = async(e) =>{
        e.preventDefault();
        
        db.collection('rooms').doc(roomId).collection('messages').add({
            message:input,
            name:user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        console.log(setInput);
        setInput('');
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src="https://c4.wallpaperflare.com/wallpaper/756/185/281/women-model-long-hair-brunette-wallpaper-preview.jpg" />
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>last seen{" "} 
                        {
                        new Date(
                            messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()
                        
                        }</p>
                </div>
                <div className="chat__headerRight"> 
                <IconButton>
                    <SearchOutlined/>
                </IconButton>
                <IconButton>
                    <AttachFile/>
                </IconButton>
                <IconButton>
                     <MoreVert/>
                </IconButton>
                </div>
            </div>
            <div className="chat__body">
            <p className="chat__message">
                <span className="chat__name">
                    gopi
                </span>
                Fullstack whatsapp-Clone with Firestore | Yesss

                <span className="chat__timestamp">
                    {new Date().toUTCString()}
                </span>
                </p>


                {messages.map((message) => (
                    <p className={`chat__message ${true && "chat__receiver"}`}>
                    <span className="chat__name">
                        {message.name}
                    </span>
                    {message.message}
                    <span className="chat__timestamp">
                        {new Date(message.timestamp?.toDate()).toUTCString()}
                    </span>
                    </p>
                ))}


             
            </div>
            <div className ="chat__footer">
                <InsertEmotionIcon/>
                <form>
                    <input value = {input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message"
                    type="text"/>
                    <button  onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <MicIcon/>
            </div>
        </div>
    )
}

export default Chat
