using System;
using System.Collections.Generic;

namespace DalLayer.Models
{
    public partial class GroupMessage
    {
        public int Id { get; set; }
        public string Msg { get; set; } = null!;
        public int? GroupId { get; set; }
        public int? SendersId { get; set; }
        public DateTime? Time { get; set; }

        public virtual Group? Group { get; set; }
        public virtual User? Senders { get; set; }
    }
}
