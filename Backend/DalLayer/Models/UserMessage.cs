using System;
using System.Collections.Generic;

namespace DalLayer.Models
{
    public partial class UserMessage
    {
        public int Id { get; set; }
        public string Msg { get; set; } = null!;
        public int? RecieversId { get; set; }
        public int? SendersId { get; set; }
        public DateTime? Time { get; set; }

        public virtual User? Recievers { get; set; }
        public virtual User? Senders { get; set; }
    }
}
