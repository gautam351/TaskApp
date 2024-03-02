using System;
using System.Collections.Generic;

namespace DalLayer.Models
{
    public partial class GroupJoined
    {
        public int Id { get; set; }
        public int GroupId { get; set; }
        public int UserId { get; set; }
        public DateTime DateJoined { get; set; }
    }
}
