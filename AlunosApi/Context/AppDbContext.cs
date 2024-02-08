using AlunosApi.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AlunosApi.Context
{
    public class AppDbContext : IdentityDbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Aluno> Alunos { get; set; }

        //Verificar das na tabela, caso não tenha vai popular a tabela Aluno
        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<Aluno>().HasData(
        //            new Aluno
        //            {
        //                Id = 1,
        //                Nome = "Maria da Penha",
        //                Email = "mariapenha@yahoo.com",
        //                Idade = 23
        //            },
        //            new Aluno
        //            {
        //                Id = 2,
        //                Nome = "Manuel Bueno",
        //                Email = "manuelbueno@yahoo.com",
        //                Idade = 22
        //            }
        //        );
        //}
    }
}
