import { MessagesData } from ".";

 
export default function groupMessagesByUser(messages: MessagesData[]) {
  const groupedMessages = [];
  
  let currentUser = null;
  let currentUserMessages: MessagesData[]  = [];

  for (const message of messages) {
      if (!currentUser || message.user.id !== currentUser.id) {
          if (currentUser) {
              groupedMessages.push({
                  userId: currentUser.id,
                  messages: currentUserMessages
              });
          }
          currentUser = message.user;
          currentUserMessages = [message];
      } else {
          currentUserMessages.push(message);
      }
  }

  if (currentUser) {
      groupedMessages.push({
          userId: currentUser.id,
          messages: currentUserMessages
      });
  }

  return groupedMessages;
}