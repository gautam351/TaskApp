﻿using System;
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
        public virtual DbSet<GroupMessage> GroupMessages { get; set; } = null!;
        public virtual DbSet<TaskAdded> TaskAddeds { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;
        public virtual DbSet<UserMessage> UserMessages { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=BLRKEC334053L\\SQLEXPRESS;Database=TaskApp;User Id=sa;Password=PraveenGautam@123; MultipleActiveResultSets=False;Encrypt=False;TrustServerCertificate=False;Connection Timeout=30;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Group>(entity =>
            {
                entity.Property(e => e.GroupId).HasColumnName("group_id");

                entity.Property(e => e.DateCreated)
                    .HasColumnType("datetime")
                    .HasColumnName("date_created")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Description)
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasColumnName("description");

                entity.Property(e => e.GroupAdmin).HasColumnName("group_admin");

                entity.Property(e => e.GroupName)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("group_name");

                entity.Property(e => e.MemberCount)
                    .HasColumnName("member_count")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.ProfileUrl)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("profile_url");

                entity.Property(e => e.ViceAdmin).HasColumnName("vice_admin");

                entity.Property(e => e.Visibility)
                    .HasColumnName("visibility")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.WriteAccess)
                    .HasColumnName("write_access")
                    .HasDefaultValueSql("((1))");
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

            modelBuilder.Entity<GroupMessage>(entity =>
            {
                entity.Property(e => e.GroupId).HasColumnName("groupId");

                entity.Property(e => e.Msg)
                    .IsUnicode(false)
                    .HasColumnName("msg");

                entity.Property(e => e.SendersId).HasColumnName("sendersId");

                entity.Property(e => e.Time)
                    .HasColumnType("datetime")
                    .HasColumnName("time")
                    .HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.Group)
                    .WithMany(p => p.GroupMessages)
                    .HasForeignKey(d => d.GroupId)
                    .HasConstraintName("fk_groupid");

                entity.HasOne(d => d.Senders)
                    .WithMany(p => p.GroupMessages)
                    .HasForeignKey(d => d.SendersId)
                    .HasConstraintName("fk_sendersId");
            });

            modelBuilder.Entity<TaskAdded>(entity =>
            {
                entity.ToTable("TaskAdded");

                entity.Property(e => e.MessageId).HasColumnName("messageID");

                entity.Property(e => e.Status)
                    .HasColumnName("status")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.UserId).HasColumnName("userID");
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

            modelBuilder.Entity<UserMessage>(entity =>
            {
                entity.Property(e => e.Msg)
                    .IsUnicode(false)
                    .HasColumnName("msg");

                entity.Property(e => e.RecieversId).HasColumnName("recieversId");

                entity.Property(e => e.SendersId).HasColumnName("sendersId");

                entity.Property(e => e.Time)
                    .HasColumnType("datetime")
                    .HasColumnName("time")
                    .HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.Recievers)
                    .WithMany(p => p.UserMessageRecievers)
                    .HasForeignKey(d => d.RecieversId)
                    .HasConstraintName("fk_recieversId");

                entity.HasOne(d => d.Senders)
                    .WithMany(p => p.UserMessageSenders)
                    .HasForeignKey(d => d.SendersId)
                    .HasConstraintName("fk_sendersIdUser");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
