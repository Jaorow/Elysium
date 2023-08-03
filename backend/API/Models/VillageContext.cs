using Microsoft.EntityFrameworkCore;

namespace API.Models
{
    public class VillageContext : DbContext
    {
        public VillageContext(DbContextOptions<VillageContext> options) : base(options)
        {
        }

//      TODO: these question marks before could break things...
        public DbSet<Village> Villages { get; set; } = null!;
        public DbSet<Amenities> Amenities { get; set; } = null!;
        

 
           protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Village>()
                .HasMany(t => t.Amenities)
                .WithOne(l => l.Village)
                .HasForeignKey(l => l.villageId);
        }
        
    }
}