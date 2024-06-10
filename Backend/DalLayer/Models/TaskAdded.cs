using System;
using System.Collections.Generic;

namespace DalLayer.Models
{
    public partial class TaskAdded
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int MessageId { get; set; }
        public int? Status { get; set; }
    }
}
