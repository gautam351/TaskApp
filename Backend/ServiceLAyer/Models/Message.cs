using System.ComponentModel.DataAnnotations;

namespace ServiceLAyer.Models
{
    public class Message
    {
        [Required]
        public string Msg { get; set; }

        [Required]
        public int SenderId { get; set; }
       
        [Required]
        public int RecieverId { get; set; }


        public Message(string msg,int senderId,int RecieverId)
        {
            this.Msg = msg;
            this.RecieverId = RecieverId;   
            this.SenderId = senderId;   
        }

       
    }
}
