using System;
using System.Collections.Generic;

namespace DalLayer.Models
{
    public partial class Group
    {
        public int Id { get; set; }
        public int AdminUserId { get; set; }
        public int? Rating { get; set; }
        public int? MemberCount { get; set; }
        public int? AccessRead { get; set; }
        public int? AccessWrite { get; set; }
        public DateTime LastUpdatedTime { get; set; }
        public string GroupName { get; set; } = null!;
    }
}
