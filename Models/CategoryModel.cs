
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.Design;
using blog.Models;
namespace blog.Models
{
		public class Category
		{
            [Key]
            public int CatId { get; set; }
    
            public string Name
            { get; set; }
    
            public string UrlSlug
            { get; set; }
    
            public string Description
            { get; set; }
    
            public IList<PostCats> PostCats { get; private set; }
     	}
         public class PostCats
		{
            public int PostId { get; set; }
    
            public Post Post
            { get; set; }
    
            public Category Category
            { get; set; }
    
            public int CategoryId
            { get; set; }
    
     	}

}