using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace DalLayer.Models
{
    public partial class TaskAppContext : DbContext
    {
        public TaskAppContext()
        {
        }

        public TaskAppContext(DbContextOptions<TaskAppContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Group> Groups { get; set; } = null!;
        public virtual DbSet<GroupJoined> GroupJoineds { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=BLRKEC334053L\\SQLEXPRESS;Database=TaskApp;User Id=sa;Password=PraveenGautam@123");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Group>(entity =>
            {
                entity.ToTable("Group");

                entity.HasIndex(e => e.GroupName, "UQ__Group__E8F4F58DF6AC5B37")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.AccessRead)
                    .HasColumnName("access_read")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.AccessWrite)
                    .HasColumnName("access_write")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.AdminUserId).HasColumnName("admin_user_id");

                entity.Property(e => e.GroupName)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .HasColumnName("group_name");

                entity.Property(e => e.LastUpdatedTime).HasColumnType("datetime");

                entity.Property(e => e.MemberCount)
                    .HasColumnName("member_count")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Rating)
                    .HasColumnName("rating")
                    .HasDefaultValueSql("((0))");
            });

            modelBuilder.Entity<GroupJoined>(entity =>
            {
                entity.ToTable("GroupJoined");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.DateJoined)
                    .HasColumnType("datetime")
                    .HasColumnName("date_joined");

                entity.Property(e => e.GroupId).HasColumnName("group_id");

                entity.Property(e => e.UserId).HasColumnName("user_id");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(e => e.UserName, "UQ__Users__7C9273C437868ACC")
                    .IsUnique();

                entity.HasIndex(e => e.EmailId, "UQ__Users__87355E73F2DE7B99")
                    .IsUnique();

                entity.Property(e => e.Dob)
                    .HasColumnType("date")
                    .HasColumnName("dob");

                entity.Property(e => e.EmailId)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("emailId");

                entity.Property(e => e.FollowersCount)
                    .HasColumnName("followers_count")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Password)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("password");

                entity.Property(e => e.Role)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("role")
                    .HasDefaultValueSql("('user')");

                entity.Property(e => e.UserName)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("user_name");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
