

using DalLayer;
using DalLayer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using ServiceLAyer.Controllers;
using ServiceLAyer.Models;

namespace ServiceLAyer.ChatHub
{


    // public class Message
    //{
    //    public String Msg { get; set; } 
    //    public String Sender { get; set; } 
    //    public String GroupId { get; set; }

    //    public Message(String msg,String id,String grpId) {
    //    this.Sender = id;   
    //        this.Msg = msg;
    //        this.GroupId = grpId;
          
    //    }    
    //}

    //[Authorize]
    public class ChatHubR : Hub
    {

        public DALRepository _dalRepo=new();
        public MessagesController _msgCotroller=new MessagesController();   




        public override async Task OnConnectedAsync()
        {
            //try
            //{
            //    var temp = Context.User.Identities.FirstOrDefault().Claims.FirstOrDefault().Value;

            //    if (temp != null)
            //    {
            //        var user = _dalRepo.GetUser(temp);
            //        if (user != null)
            //        {
            //            await OnConnectedAddToGroups(user.Id);
            //        }
            //    }



            //}
            //catch (Exception)
            //{
            //    Console.WriteLine("something went wrong in OnConnectedAsync");

            //}
            Console.WriteLine("connected");

            await base.OnConnectedAsync();
        }

        // this fucntion is used to make user join all the groups as soon he connects.
        public async Task OnConnectedAddToGroups(String user)
        {
            int senderId = Convert.ToInt16(user);
            try
            { // find groups through which it is already joined and add this user into that group.
                var groups = _dalRepo.GetAllGroupsJoined(senderId);

                foreach (var item in groups)
                {
                    await Groups.AddToGroupAsync(Context.ConnectionId, item.GroupId.ToString());
                  
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("something went wrong");

            }


        
        }

        public async Task SendMessageInGroup(String grpName,String message,String senderId)
        {
            try
            {
                
               //String  newsenderId = senderId.ToString();

               // Console.WriteLine("hey" + grpName);
               // //var msg = new Message(message, newsenderId,grpName);


                Message msg = new Message(message,Convert.ToInt32(senderId), Convert.ToInt32(grpName));

               var result= _msgCotroller.SendMessage(msg);

                //await Clients.All.SendAsync("messageReceived", msg);
               if(result!=null) await Clients.Groups(grpName).SendAsync("messageReceived", result);

            }
            catch (Exception ex)
            {
                Console.WriteLine("something went wrong");
               
            }
        }


        public async Task TestFunc(String id)
        {
            Console.WriteLine("test"+id);
        }


    }
}
