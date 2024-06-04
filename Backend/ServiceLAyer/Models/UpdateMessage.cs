using System.ComponentModel.DataAnnotations;

namespace ServiceLAyer.Models
{
    public class UpdateMessage
    {
        [Required]
        public  int Id { get; set; }

        [Required]
        public string Msg { get; set;}

        public UpdateMessage(int id,string msg)
        {
            Id = id;    
            Msg = msg;
        }
    }
}
