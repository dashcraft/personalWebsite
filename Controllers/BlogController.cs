using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using blog.Models;
using System.Globalization;
using System.Text.RegularExpressions;
namespace blog.Controllers
{
    [Route("api/[controller]")]
    public class Blog : Controller
    {
        
        [HttpGet]
        public IEnumerable<Post> Posts()
        {
            
            using(var db = new BloggingContext()){
                try{
                    return db.Posts.ToList();
                }
                catch(Exception e){
                    throw e;
                }

                
            }
        
        }
        [HttpPost]
        public Post PostPosts([FromBody] JObject data)
        {
            dynamic json = data;


            using(var db = new BloggingContext()){
              
                DateTime rightnow = DateTime.Now;
                var post = new Post
                     {
                        Title= json.title,
                        ShortDescription = json.ShortDescription,
                        Description =json.Description,
                        Meta = json.metadata,
                        UrlSlug =  Regex.Replace(json.title, @"[^A-Za-z0-9_\.~]+", "-"),
                        Published = json.isPublished,
                        PostedOn = rightnow
                    };


                
                try{
                    db.Posts.Add(post);
                    db.SaveChanges();
                    return db.Posts.FirstOrDefault();
                }
                catch(Exception e){
                    throw e;
                }
                
            }
        
        }
        
        [HttpPut]
        public Post UpdatePost([FromBody] JObject data)
        {
            dynamic json = data;
            int postid = json.postid;
            DateTime rightnow = DateTime.Now;
            using(var db = new BloggingContext()){
                var post = db.Posts.Single(
                    x => x.PostId == postid
                );
                post.Title= json.title;
                post.ShortDescription = json.ShortDescription;
                post.Description = json.Description;
                post.Meta = json.metadata;
                post.UrlSlug =  Regex.Replace(json.title, @"[^A-Za-z0-9_\.~]+", "-");
                post.Published = json.isPublished;
                post.Modified = rightnow;
                try{
                    db.SaveChanges();
                    return db.Posts.Single(
                        x => x.PostId == postid
                    );
                }
                catch(Exception e){
                    throw e;
                }
                
            }
        
        }
        

    }
}
