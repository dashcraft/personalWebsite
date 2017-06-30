using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using blog.Models;
using blog.Config;

namespace blog.Models
{
    public class BloggingContext : DbContext
    {
        public DbSet<Category> Categories { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<Post> Posts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<PostTag>()
            .HasKey(t => new { t.PostId, t.TagId });

        modelBuilder.Entity<PostTag>()
            .HasOne(pt => pt.Post)
            .WithMany(p => p.Tags)
            .HasForeignKey(pt => pt.PostId);

        modelBuilder.Entity<PostTag>()
            .HasOne(pt => pt.Tag)
            .WithMany(t => t.PostTags)
            .HasForeignKey(pt => pt.TagId);

        modelBuilder.Entity<PostCats>()
            .HasKey(c => new { c.PostId, c.CategoryId });

        modelBuilder.Entity<PostCats>()
            .HasOne(pc => pc.Post)
            .WithMany(p => p.PostCats)
            .HasForeignKey(pt => pt.PostId);

        modelBuilder.Entity<PostCats>()
            .HasOne(pc => pc.Category)
            .WithMany(c => c.PostCats)
            .HasForeignKey(pc => pc.CategoryId);
    }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            TestConfigs config = new TestConfigs();
            optionsBuilder.UseSqlServer(@config.testDBUrl);
        }
    }

}