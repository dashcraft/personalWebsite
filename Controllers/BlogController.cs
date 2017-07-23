using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using blog.Models;
using System.Globalization;
using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;

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

        [Route("{id:int}")]
        [HttpGet]
        public Post getPost(int id){
            using(var db = new BloggingContext()){
                try{
                    return db.Posts.FirstOrDefault(x=> x.PostId == id);
                }
                catch(Exception e){
                    throw e;
                }

                
            }
        }
        [Route("slug/{slug}")]
        [HttpGet]
        public Post getSlug(String slug){
            using(var db = new BloggingContext()){
                try{
                    return db.Posts.FirstOrDefault(x=> x.UrlSlug == slug);
                }
                catch(Exception e){
                    throw e;
                }

                
            }
        }

        [Route("categories")]
        [HttpGet]
        public IEnumerable<Category> getCats(){
            using(var db = new BloggingContext()){
                try{
                    var response = db.Categories
                    .Include(cat => cat.PostCats)
                    .ThenInclude(postcats => postcats.PostId)
                    .ToList();

                    return response;
                }
                catch(Exception e){
                    throw e;
                }

                
            }
        }

        [HttpPost]
        public async Task<Post> PostPosts([FromBody] JObject data)
        {
            JToken postToken = data;
            String title = (string)postToken.SelectToken("title");
            String ShortDescription = (string)postToken.SelectToken("ShortDescription");
            String description = (string)postToken.SelectToken("Description");
            String meta = (string)postToken.SelectToken("meta");
            Boolean isPublished = (bool)postToken.SelectToken("published");
            List<PostTag> ptags = new List<PostTag>();
            List<PostCats> pcats = new List<PostCats>();
            List<Category> cats = new List<Category>();
            List<Tag> tags = new List<Tag>();
            if(postToken.SelectToken("tags") != null){
                ptags = postToken.SelectToken("tags").Cast<PostTag>().ToList();
                foreach(PostTag tag in ptags){
                    tags.Add(new Tag(){Name =tag.Tag.Name});
                }
            }
            
            if(postToken.SelectToken("categories") != null){
                pcats = postToken.SelectToken("categories").Cast<PostCats>().ToList();
            }
            using(var db = new BloggingContext()){
              
                DateTime rightnow = DateTime.Now;
                var post = new Post
                     {
                        Title= title,
                        ShortDescription = ShortDescription,
                        Description = description,
                        Meta = meta,
                        UrlSlug =  Regex.Replace((string)postToken.SelectToken("title"), @"[^A-Za-z0-9_\.~]+", "-")+rightnow.ToString("yyyy’-‘MM’-‘dd’T’HH’:’mm’:’ss"),
                        Published = isPublished,
                        PostCats = pcats,
                        Tags = ptags,
                        PostedOn = rightnow
                    };


                
                try{
                    db.Posts.Add(post);
                    await db.SaveChangesAsync();
                    return db.Posts.FirstOrDefault();
                }
                catch(Exception e){
                    throw e;
                }
                
            }
        
        }
        
        [Route("{id:int}")]
        [HttpPut]
        public async Task<JsonResult> UpdatePost(int id, [FromBody] JObject data)
        {
            JToken postToken = data;
            int postid = id;
            String title = (string)postToken.SelectToken("title");
            String ShortDescription = (string)postToken.SelectToken("ShortDescription");
            String description = (string)postToken.SelectToken("Description");
            String meta = (string)postToken.SelectToken("meta");
            Boolean isPublished = (bool)postToken.SelectToken("published");
            List<PostTag> ptags = new List<PostTag>();
            List<PostCats> pcats = new List<PostCats>();
            if(postToken.SelectToken("tags") != null){
                ptags = postToken.SelectToken("tags").Cast<PostTag>().ToList();
            }
            
            
            if(postToken.SelectToken("categories") != null){
                pcats = postToken.SelectToken("categories").Cast<PostCats>().ToList();
            }


            DateTime rightnow = DateTime.Now;
            using(var db = new BloggingContext()){
                var post = db.Posts.Single(
                    x => x.PostId == postid
                );
                post.Title= title;
                post.ShortDescription = ShortDescription;
                post.Description = description;
                post.Meta = meta;
                post.UrlSlug =  Regex.Replace((string)postToken.SelectToken("title"), @"[^A-Za-z0-9_\.~]+", "-")+rightnow.ToString("yyyy’-‘MM’-‘dd’T’HH’:’mm’:’ss");
                post.Published = isPublished;
                post.Modified = rightnow;
                try{
                    await db.SaveChangesAsync();
                    return Json(
                        new { 
                            success = true
                    });
                    
                    
                }
                catch(Exception e){
                    throw e;
                }
                
            }
        
        }


        [Route("{id:int}")]
        [HttpDelete]
        public async Task<JsonResult> deletePost(int id)
        {
            using(var db = new BloggingContext()){
                try{
                    var post = db.Posts.FirstOrDefault(x=> x.PostId == id);
                    db.Posts.Remove(post);
                    await db.SaveChangesAsync();
                    return Json(
                        new { 
                            success = true
                            });
                }
                catch(Exception e){
                    throw e;
                }

                
            }
        
        }

    }
}
