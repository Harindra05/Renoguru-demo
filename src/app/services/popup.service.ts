// import { Injectable } from "@angular/core";
// import { AngularFireDatabase } from "@angular/fire/compat/database";

// @Injectable()
// export class PopupService {
//     async fetchUserConversations() {
//         this.angularFireDatabase.database
//           .ref("chat/one-to-one/")
//           .child(this.loggedInUser.id)
//           .on("value", (res: any) => {
//             if (res.val()) {
//               let conversation_ids = Object.values(res.val());
//               let conversations: any = [];
//               let promises = [];
//               for (let i = 0; i < conversation_ids.length; i++) {
//                 let promise = new Promise((resolve, reject) => {
//                   this.angularFireDatabase.database
//                     .ref(`chat/conversation/${conversation_ids[i]}`)
//                     .once("value", (res1: any) => {
//                       let conversation = res1.val();
//                       console.log(conversation);
    
//                       if (conversation) {
//                         let userIds = Object.keys(conversation.users);
//                         let displayUser =
//                           userIds[0] == this.loggedInUser.id
//                             ? conversation.users["" + userIds[1]]
//                             : conversation.users["" + userIds[0]];
    
//                         Object.assign(conversation, {
//                           key: conversation_ids[i],
//                           displayUser: displayUser,
//                         });
//                         conversations.push(conversation);
//                         //mak
//                       }
    
//                       resolve(true);
//                     });
//                 });
//                 promises.push(promise);
//               }
//               Promise.all(promises).then(async (res) => {
//                 conversations = conversations.filter(
//                   (v: any, i: any, a: any) =>
//                     a.findIndex((t: any) => t.key === v.key) === i
//                 );
//                 this.conversations = conversations.sort((a: any, b: any) => {
//                   return (
//                     a.lastMessage &&
//                     b.lastMessage &&
//                     b.lastMessage.date - a.lastMessage.date
//                   );
//                 });
    
//                 this.temparr = conversations;
    
//                 await this.fetchConversationMessage();
//                 this.changeDetectorRef.detectChanges();
//               });
//             } else {
//               this.conversations = [];
//             }
//           });
//       }
    
//       fetchConvo(conversation: any) {
//         if (conversation.key != this.selectedConversation.key) {
//           this.selectedConversation = conversation;
//           this.conversation_id = this.selectedConversation.key;
//           this.fetchConversationMessage();
//         }
//       }
    
//       async fetchConversationMessage() {
//         if (this.conversation_id) {
//           let conversation = this.conversations.find(
//             (res: any) => res.key == this.conversation_id
//           );
//           if (conversation) {
//             this.selectedConversation = conversation;
//             this.conversation_id = undefined;
//           }
//         }
//         this.selectedConversation = this.selectedConversation
//           ? this.selectedConversation
//           : this.conversations[0];
//         this.changeDetectorRef.detectChanges();
//         this.angularFireDatabase.database
//           .ref(`chat/messages/${this.selectedConversation.key}`)
//           .orderByChild("date")
//           .on("value", (res: any) => {
//             this.conversationMessages = res.val() ? Object.values(res.val()) : [];
//             var objDiv: any = document.getElementById("messages");
//             if (objDiv) {
//               objDiv.scrollTop = objDiv.scrollHeight;
//               this.changeDetectorRef.detectChanges();
//             }
//             this.changeDetectorRef.detectChanges();
//           });
//       }
    
//       async sendMessage() {
//         if (this.message.trim() == "") {
//           return;
//         }
//         let obj = {
//           user_id: this.loggedInUser.id,
//           date: new Date().getTime(),
//           fullName: this.loggedInUser.fullName,
//           text: this.message,
//           imageUrl: this.loggedInUser.imageUrl,
//         };
    
//         this.angularFireDatabase.database
//           .ref(`chat/messages/${this.selectedConversation.key}`)
//           .push(obj)
//           .then((res: any) => {
//             this.angularFireDatabase
//               .object(
//                 `chat/conversation/${this.selectedConversation.key}/lastMessage`
//               )
//               .set(obj);
//             this.message = "";
//           });
    
//         await this.fetchUserConversations();
//       }
//       searchtask(val: any) {
//         let temp: any[] = [];
//         console.log(this.conversations);
//         let valu: String = val.target.value;
//         for (let i = 0; i < this.conversations.length; i++) {
//           if (
//             this.conversations[i].displayUser.fullName.indexOf(
//               valu.toUpperCase() && valu.toLowerCase()
//             ) > -1
//           ) {
//             console.log(this.conversations[i].displayUser.fullName);
//             console.log(valu.toLowerCase());
//             console.log(valu.toUpperCase());
//             temp.push(this.conversations[i]);
//           } else {
//           }
//           this.temparr = temp;
//         }
//       }
// }