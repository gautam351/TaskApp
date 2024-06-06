using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DalLayer.HelperClassesModel
{
    public  class GroupMessagesAdditional
    {
        public int Id { get; set; }
        public string Msg { get; set; } = null!;
        public int? GroupId { get; set; }
        public int? SendersId { get; set; }
        public DateTime? Time { get; set; }

        public bool isAdded { get; set; } = false;
        public bool isLiked { get; set; } = false;
       


    }
}
