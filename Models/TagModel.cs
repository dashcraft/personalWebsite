using System;
using System.Collections.Generic;
using blog.Models;
namespace blog.Models
{
		public class Tag
		{
            public int TagId { get; set; }
    
            public string Name
            { get; set; }
    
            public string UrlSlug
            { get; set; }
    
            public string Description
            { get; set; }

            public List<PostTag> PostTags { get; set; }
     	}

         public class PostTag
		{
            public int PostId { get; set; }
            public Post Post { get; set; }

            public int TagId { get; set; }
            public Tag Tag { get; set; }
     	}
}