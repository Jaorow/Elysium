using Microsoft.EntityFrameworkCore;

namespace API.Models
{
    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions<UserContext> options) : base(options)
        {
        }

        public UserContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Village> Villages { get; set; } = null!;
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure any additional model mappings or constraints here, if needed
            // For example, if you want to set a unique constraint on the username:
            // modelBuilder.Entity<User>().HasIndex(u => u.username).IsUnique();
        }
    }
}