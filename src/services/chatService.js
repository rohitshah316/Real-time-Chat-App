import { db } from "./firebase";
import { collection,
         addDoc,
         query,
         orderBy,
         onSnapshot,
         serverTimestamp
 } from "firebase/firestore";


const messageRef=collection(db,'messages');

export const sendMessage=async(text,user)=>{
    return addDoc(messageRef,{
        text,
        senderId:user.uid,
        createdAt: serverTimestamp(),
    });
};

export const listenMessages=(callback)=>{
    const q=query(messageRef,orderBy("createdAt"));
    return onSnapshot(q,(snapshot)=>{
        const messages=snapshot.docs.map(doc=>({
            id: doc.id,
            ...doc.data(),
        }));
        callback(messages);
    });
}
